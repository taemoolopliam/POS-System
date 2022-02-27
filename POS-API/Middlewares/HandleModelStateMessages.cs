using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using POS_API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POS_API.Middlewares
{
    public class HandleModelStateMessages : ActionFilterAttribute
    {
        public override async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
        {
            if (!context.ModelState.IsValid)
            {
                var errorInModelState = context.ModelState.Where(a => a.Value.Errors.Count > 0)
                    .ToDictionary(k => k.Key, k => k.Value.Errors.Select(a => a.ErrorMessage)).ToArray();
                var errorResponse = new List<FieldError>();
                foreach (var error in errorInModelState)
                    foreach (var subError in error.Value)
                        errorResponse.Add(new FieldError
                        {
                            FieldName = error.Key,
                            Message = subError
                        });
                context.Result = new BadRequestObjectResult(new MessagsFieldModel
                { StatusCode = 400, Message = "ModelState Invalid", FieldError = errorResponse.ToArray(), TaskStatus = false });
            }
            await next();
        }
    }
}
