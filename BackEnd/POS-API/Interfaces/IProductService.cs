using System.Threading.Tasks;

namespace POS_API.Interfaces
{
    public interface IProductService
    {
        public Task<object> ProductsItem(int? currentPage = 1, int pageSize = 10, string search = "");
    }
}
