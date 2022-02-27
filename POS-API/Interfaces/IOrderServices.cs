using POS_API.Models.Request;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace POS_API.Interfaces
{
    public interface IOrderServices
    {
        public Task<object> SaveOrder(OrderReq data);
    }
}
