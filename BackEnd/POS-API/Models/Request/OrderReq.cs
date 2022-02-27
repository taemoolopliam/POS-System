using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace POS_API.Models.Request
{
    public class OrderReq
    {
        [Required]
        [Display(Name = "Total")]
        public decimal Total { get; set; }
        [Required]
        [Display(Name = "Cash")]
        public decimal Cash { get; set; }
        [Required]
        [Display(Name = "ReturnTheChange")]
        public decimal ReturnTheChange { get; set; }
        [Required]
        [Display(Name = "orderDetails")]
        public List<OrderDetail> OrderDetails { get; set; }
    }
    
    public class OrderDetail
    {
        [Required]
        [Display(Name = "ProductID")]
        public string ProductID { get; set; }
        [Required]
        [Display(Name = "ProductName")]
        public string ProductName { get; set; }
        [Required]
        [Display(Name = "Price")]
        public decimal Price { get; set; }
        [Required]
        [Display(Name = "Amount")]
        public decimal Amount { get; set; }
        [Required]
        [Display(Name = "Total")]
        public decimal Total { get; set; }
    }
}
