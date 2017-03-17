import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { CityService }    from '../location/city.service';
import { contentHeaders } from '../headers';
import { Observable }     from 'rxjs/Rx';

@Injectable()
export class WeatherService {
  private cityList: any;
  
  constructor(private _http: Http,
              private _cityService: CityService) {
    this.cityList = this._cityService.getCityList();
  }
              
  getCurrentWeather(cityName: string): Observable<Object> {
    let cityId = this.cityList.filter(city => city.name == cityName)[0].id;
    let request = 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&units=metric&appid=e636e10c15ac5158ecfe75a7198280bc';
    
    return this._http.get(request, { headers: contentHeaders })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}