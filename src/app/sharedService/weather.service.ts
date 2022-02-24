import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForecastData } from '../forecast/forecast.component';
import { CurrentWeather } from '../weather/weather.component';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiWeatherMap = 'http://api.openweathermap.org/data/2.5/';
  token = '5a4b2d457ecbef9eb2a71e480b947604';

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(zipCode:string): Observable<CurrentWeather> {
    return this.httpClient.get<CurrentWeather>(this.apiWeatherMap + 'weather?zip='+zipCode+',in&appid='+this.token);
  }
  
  getForecastWeather(zipCode:string): Observable<ForecastData> {
    return this.httpClient.get<ForecastData>(this.apiWeatherMap + 'forecast/daily?zip='+zipCode+',in&appid='+this.token);
  }
}
