using Microsoft.AspNetCore.Mvc;
using POS_API.Interfaces;
using POS_API.Models;
using POS_API.Models.Request;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace POS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderServices OrderServices;
        public OrdersController(IOrderServices orderServices)
        {
            OrderServices = orderServices;
        }

        [HttpPost("Save")]
        public async Task<IActionResult> SaveOrder(OrderReq data)
        {
            try
            {
                return Ok(await OrderServices.SaveOrder(data));
            }
            catch (Exception e)
            {
                return StatusCode(500, new MessagsModel()
                {
                    StatusCode = 500,
                    Message = e.Message,
                });
            }
        }

    }
}
