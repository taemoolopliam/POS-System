using Microsoft.AspNetCore.Mvc;
using POS_API.Interfaces;
using POS_API.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace POS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService ProductService;
        public ProductsController(IProductService productService)
        {
            ProductService = productService;
        }

        [HttpGet("ProductsItem")]
        public async Task<IActionResult> ProductsItem([Required] int? currentPage = 1, [Required] int pageSize = 10, string search = "")
        {
            try
            {
                return Ok(await ProductService.ProductsItem(currentPage, pageSize, search));
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
