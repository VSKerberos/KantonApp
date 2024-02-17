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


public class GeneralCurrencyDto{

     public string askUSD { get; set; }
     public string bidUSD { get; set; }

     public string askEUR { get; set; }
     public string bidEUR { get; set; }

     public string askJPY { get; set; }
     public string bidJPY { get; set; }
}
