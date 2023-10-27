

namespace API;
public class ExceptionMiddleware 
{
  
        private readonly RequestDelegate _next;
    

    public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        
    }

        public async Task InvokeAsync(HttpContext httpContext)
        {

            try
            {

    
        
                await _next(httpContext);

            }
            catch (Exception ex)
            {

                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
        
            var dbContext = context.RequestServices.GetRequiredService<DataContext>();
            dbContext.AddAsync(LogToDb(ex));
            dbContext.SaveChangesAsync();

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
            return context.Response.WriteAsync(new ErrorDetailsDto()
            {
                StatusCode = context.Response.StatusCode,
                Message = "Internal Server Error from the custom middleware."
            }.ToString());
        }

        private  Log LogToDb(Exception ex)
        {

        var err = new Log
        {
            HelpLink = ex.HelpLink,
            HResult = Convert.ToString(ex.HResult),
            Message = ex.Message,
            Source = ex.Source,
            StackTrace = ex.StackTrace,
            TargetSite= ex.TargetSite.ToString(),
            TimeStamp = DateTime.Now,
            InnerException = ex.InnerException.ToString()

        };
        return err;

        }
    
}
