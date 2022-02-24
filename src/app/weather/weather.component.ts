import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Weather } from '../forecast/forecast.component';
import { WeatherService } from '../sharedService/weather.service';

export interface CurrentWeather {
  coord: { lon: number; lat: number };
  weather: Array<Weather>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  },
  visibility: number,
  wind: {
    speed: number;
    deg: number;
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  },
  timezone: number;
  id: number;
  name: string;
  cod: number;
  zipcode: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  currentWeatherData!: CurrentWeather[];
  zipCode: string = '';

  constructor(private weatherService: WeatherService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getCurrentWeatherData();
  }

  getCurrentWeatherData() {
    const data = JSON.parse(localStorage.getItem('currentWeatherReport')!);
    if (data) this.currentWeatherData = data;
  }

  getCurrentWeatherZipCode(zipCode: string) {
    if (zipCode && zipCode !== '') {
      let ifExists = false;
      this.currentWeatherData.forEach((resp) => {
        if (resp.zipcode === zipCode) ifExists = true;
      });
      if (!ifExists) {
        this.weatherService.getCurrentWeather(zipCode).subscribe(
          (data) => {
            if (data) {
              data = { ...data, zipcode: zipCode };
              this.currentWeatherData.push(data);
              localStorage.setItem(
                'currentWeatherReport',
                JSON.stringify(this.currentWeatherData)
              );
            }
            this.zipCode = '';
            this.toast.success("zipcode added successfully");
          },
          () => {
            this.toast.warning(
              'invalid zipcode: ' +
              zipCode +
              ', or data not availble for this zipcode.'
            );
            this.zipCode = '';
          }
        );
      } else {
        this.zipCode = '';
        this.toast.warning("zipcode already exists.");
      }
    } else {
      this.toast.warning("Please enter zipcode.");
    }
  }

  remove(zipcode: string) {
    if (this.currentWeatherData && this.currentWeatherData.length > 0) {
      this.currentWeatherData = this.currentWeatherData.filter(
        (data) => data.zipcode !== zipcode
      );
      localStorage.setItem(
        'currentWeatherReport',
        JSON.stringify(this.currentWeatherData)
      );
    }
  }

}
