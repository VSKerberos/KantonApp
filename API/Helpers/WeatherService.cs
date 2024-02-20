using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API;
public class WeatherService
{



public async Task<ActionResult<MainDto>> GetWeather(string city)
{
var client = new HttpClient();
var request = new HttpRequestMessage
{
	Method = HttpMethod.Get,
	RequestUri = new Uri($"http://api.weatherapi.com/v1/current.json?key=876fd3d7689b415ea5310841231803&q={city}&aqi=yes")
};
using (var response = await client.SendAsync(request))
{
	response.EnsureSuccessStatusCode();
	var body = await response.Content.ReadAsStringAsync();
    return getJsonWeather(body);
}

}


private MainDto getJsonWeather(string jsonData)
{
    MainDto weather = JsonConvert.DeserializeObject<MainDto>(jsonData);
    return weather;
}

}
