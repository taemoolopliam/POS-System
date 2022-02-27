using Microsoft.Extensions.DependencyInjection;
using POS_API.Interfaces;
using POS_API.Services;

namespace POS_API.Extensions
{
    public static class ServicesConfiguration
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IOrderServices, OrderServices>();

            
        }
    }
}
