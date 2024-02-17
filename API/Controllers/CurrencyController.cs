using System.Xml;
using Microsoft.AspNetCore.Mvc;

namespace API;

[ApiController]
[Route("api/[controller]")] // /api/account
public class CurrencyController : ControllerBase
{

 private readonly IConfiguration iConfig;


 public CurrencyController(IConfiguration iConfig)
 {
        this.iConfig = iConfig;
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

[HttpGet("Weather")]
public async Task<ActionResult<string>> Weather()
{
var client = new HttpClient();
var request = new HttpRequestMessage
{
	Method = HttpMethod.Get,
	RequestUri = new Uri("http://api.weatherapi.com/v1/current.json?key=876fd3d7689b415ea5310841231803&q=aydin&aqi=yes")
};
using (var response = await client.SendAsync(request))
{
	response.EnsureSuccessStatusCode();
	var body = await response.Content.ReadAsStringAsync();
	Console.WriteLine(body);
}

return string.Empty;
}


}
