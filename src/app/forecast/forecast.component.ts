import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../sharedService/weather.service';

export interface ForecastData {
  city: City;
  cod: number;
  message: number;
  cnt: number;
  list: Array<WeatherForecast>;
}

export interface City {
  id: number;
  name: string;
  coord: {lon: number; lat: number};
  country: string;
  population: number;
  timezone: number;
}

export interface WeatherForecast {
  dt: number;
  dt_txt: Date;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  },
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  },
  pressure: number;
  humidity: number;
  weather: Array<Weather>;
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  zipCode!: string;
  forecastData!: ForecastData;
  constructor(
    private activatedroute: ActivatedRoute,
    private weatherService: WeatherService,
  ) {
    this.activatedroute.params.subscribe((data) => {
      this.zipCode = data['zipcode'];
    });
  }

  ngOnInit() {
    this.weatherService
      .getForecastWeather(this.zipCode)
      .subscribe((data: ForecastData) => {
        if (data) {
          this.forecastData = data;
          this.forecastData.list.forEach((data: WeatherForecast, i: number) => {
            this.forecastData.list[i] = {
              ...this.forecastData.list[i],
              dt_txt: new Date(data.dt * 1000),
            };
          });
        }
      });
  }

}
