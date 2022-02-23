import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../sharedService/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  zipCode!: string;
  forecastData: any;
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
      .subscribe((data: any) => {
        if (data) {
          this.forecastData = data;
          this.forecastData.list.forEach((data: any, i: number) => {
            this.forecastData.list[i] = {
              ...this.forecastData.list[i],
              dt_txt: new Date(data.dt * 1000),
            };
          });
        }
      });
  }

}
