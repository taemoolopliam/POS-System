using Dapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using POS_API.Interfaces;
using POS_API.Models.Request;
using POS_API.Models.Response;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace POS_API.Services
{
    public class OrderServices : IOrderServices
    {
        private const string SPOrder = "[SP.Orders]";
        private readonly string ConnectionString;
        public OrderServices(IConfiguration iconfiguration)
        {
            ConnectionString = iconfiguration.GetConnectionString("DefaultConnection");
        }

        public async  Task<object> SaveOrder(OrderReq data)
        {
            await using var sqlConnection = new SqlConnection(ConnectionString);
            await sqlConnection.OpenAsync();
            var dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@Action", "INSERT");
            dynamicParameters.Add("@Total", data.Total);
            dynamicParameters.Add("@Cash", data.Cash);
            dynamicParameters.Add("@ReturnTheChange", data.ReturnTheChange);
            dynamicParameters.Add("@Json_Insert", JsonConvert.SerializeObject(data.OrderDetails));

            var result = await sqlConnection.QuerySingleOrDefaultAsync<ResponseStatus>(
                 SPOrder,
                 dynamicParameters,
                 commandType: CommandType.StoredProcedure);
            await sqlConnection.CloseAsync();

            return result;
        }
    }
}
