using Newtonsoft.Json;

namespace API;
public class ErrorDetailsDto
{
     public int StatusCode { get; set; }
        public string Message { get; set; }
        public override string ToString()
        {
            // //return JsonConverter.(this);



            // string json = Newtonsoft.Json.JsonConvert.SerializeObject(new
            // {
            //     jlpt = "5"
            // });


             return JsonConvert.SerializeObject(this);
        }

}
