using Dapper;
using Microsoft.Extensions.Configuration;
using POS_API.Interfaces;
using POS_API.Models;
using POS_API.Models.Response;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace POS_API.Services
{
    public class ProductService: IProductService
    {
        private const string SPProducts = "[SP.Products]";
        private readonly string ConnectionString;
        public ProductService(IConfiguration iconfiguration)
        {
            ConnectionString = iconfiguration.GetConnectionString("DefaultConnection");
        }

        public async Task<object> ProductsItem(int? currentPage = 1, int pageSize = 10, string search = "")
        {
            await using var sqlConnection = new SqlConnection(ConnectionString);
            await sqlConnection.OpenAsync();
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@Action", "SELECT");
            dynamicParameters.Add("@Search", string.IsNullOrEmpty(search)?"": search);
            dynamicParameters.Add("@PageSize", pageSize);
            dynamicParameters.Add("@CurrentPage", currentPage);

            var result = await sqlConnection.QueryMultipleAsync(SPProducts, dynamicParameters, commandType: CommandType.StoredProcedure);
            var pagination = await result.ReadFirstOrDefaultAsync<Pagination>();
            var data = await result.ReadAsync<ProductRes>();
            await sqlConnection.CloseAsync();

            return new MessagsPaginModel { StatusCode = 200, Message = "สำเร็จ", pagin = pagination, Data = data, TaskStatus = true };
        }
    }
}
