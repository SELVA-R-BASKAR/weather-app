import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from '../sharedService/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  currentWeatherData: any = new Array();
  zipCode: any;

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
      this.currentWeatherData.forEach((resp: any) => {
        if (resp.zipcode === zipCode) ifExists = true;
      });
      if (!ifExists) {
        this.weatherService.getCurrentWeather(zipCode).subscribe(
          (data: any) => {
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
        (data: any) => data.zipcode !== zipcode
      );
      localStorage.setItem(
        'currentWeatherReport',
        JSON.stringify(this.currentWeatherData)
      );
    }
  }

}
