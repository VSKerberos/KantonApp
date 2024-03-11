using System.Xml;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace API;

[ApiController]
[Route("api/[controller]")] // /api/account
public class CurrencyController : ControllerBase
{

 private readonly IConfiguration iConfig;
    private readonly WeatherService service;
    private readonly IMemoryCache memoryCache;

     private const string WeatherCacheKey = "Weathers";

    public CurrencyController(IConfiguration iConfig, WeatherService service, IMemoryCache memoryCache)
 {
        this.iConfig = iConfig;
        this.service = service;
        this.memoryCache = memoryCache;
    }


    [HttpGet("currency")]
public async Task<ActionResult<GeneralCurrencyDto>> Currency()
{
     var currency = new GeneralCurrencyDto();


try
{
    
        await Task.Run(() => 
{
             var currenySectionLink = Convert.ToString(iConfig.GetSection("CurrencyLink").Value);
           var xmlDoc = new XmlDocument();
           xmlDoc.Load(currenySectionLink);
           var askUSD = xmlDoc.SelectSingleNode("Tarih_Date/Currency[@Kod='USD']/ForexBuying").InnerXml;
           var bidUSD = xmlDoc.SelectSingleNode("Tarih_Date/Currency[@Kod='USD']/ForexSelling").InnerXml;

            var askEUR = xmlDoc.SelectSingleNode("Tarih_Date/Currency[@Kod='EUR']/ForexBuying").InnerXml;
           var bidEUR = xmlDoc.SelectSingleNode("Tarih_Date/Currency[@Kod='EUR']/ForexSelling").InnerXml;

            var askYEN = xmlDoc.SelectSingleNode("Tarih_Date/Currency[@Kod='JPY']/ForexBuying").InnerXml;
           var bidYEN = xmlDoc.SelectSingleNode("Tarih_Date/Currency[@Kod='JPY']/ForexSelling").InnerXml;

           
           currency.askUSD = askUSD;
           currency.askEUR = askEUR;
           currency.askJPY = askYEN;
           currency.bidUSD = bidUSD;
           currency.bidEUR = bidEUR;
           currency.bidJPY = bidYEN;
           

        
});

}
catch (System.Exception ex)
{
    
    currency.askEUR = ex.Message;
}

  
    return currency;
}


// Task<ActionResult<IEnumerable<GetLinkDto>>> GetLinks(){
[HttpGet("Weather")]
public async Task<ActionResult<IEnumerable<MainDto>>> Weather()
{
// var client = new HttpClient();
// var request = new HttpRequestMessage
// {
// 	Method = HttpMethod.Get,
// 	RequestUri = new Uri("http://api.weatherapi.com/v1/current.json?key=876fd3d7689b415ea5310841231803&q=aydin&aqi=yes")
// };
// using (var response = await client.SendAsync(request))
// {
// 	response.EnsureSuccessStatusCode();
// 	var body = await response.Content.ReadAsStringAsync();
// 	//Console.WriteLine(body);
//     getJsonWeather(body);
// }

var cachedResult = memoryCache.Get<List<MainDto>>(WeatherCacheKey);

if(cachedResult == null){
    var local = new List<MainDto>();

var weather =  await (service.GetWeather("aydin"),service.GetWeather("izmir"));

if(weather.Length>0){
    local.Add(weather[0].Value);
    local.Add(weather[1].Value);
}

memoryCache.Set(WeatherCacheKey,local,   TimeSpan.FromMinutes(15));

return local;

}


return cachedResult;
}


private void getJsonWeather(string jsonData)
{
  //  var jsonPath = Path.Combine(Directory.GetCurrentDirectory(),"Upload\\Files\\weather.json");

       // string jsonData = System.IO.File.ReadAllText(jsonPath);
    MainDto weather = JsonConvert.DeserializeObject<MainDto>(jsonData);

}


}
