import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiWeatherMap = 'http://api.openweathermap.org/data/2.5/';
  token = '5a4b2d457ecbef9eb2a71e480b947604';

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(zipCode:string){
    return this.httpClient.get(this.apiWeatherMap + 'weather?zip='+zipCode+',in&appid='+this.token);
  }
  
  getForecastWeather(zipCode:string) {
    return this.httpClient.get(this.apiWeatherMap + 'forecast/daily?zip='+zipCode+',in&appid='+this.token);
  }
}
