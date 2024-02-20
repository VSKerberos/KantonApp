using System.Text.Json.Serialization;
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

public class MainDto{
     public Location location { get; set; }
          public Current current { get; set; }

}

public class Location{
     [JsonPropertyName("name")]
     public string Name { get; set; }
     [JsonPropertyName("lat")]
     public decimal Lat { get; set; }
     [JsonPropertyName("lon")]
     public decimal Lon { get; set; }

}

public class Current{
     /// <summary>
     /// Temperature in celsius
     /// </summary>
     [JsonPropertyName("temp_c")]
     public string Temp_C { get; set; }
     [JsonPropertyName("wind_kph")]
     public string Wind_Kph { get; set; }
     [JsonPropertyName("wind_dir")]
     public string Wind_Dir { get; set; }
     [JsonPropertyName("humidity")]
     public int Humidity { get; set; }
}
