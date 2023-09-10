import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartInput } from '../model/chart-input.model';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) { }

  getPredictiondData(reqObj:ChartInput): Observable<any>{
    return this.http.get(`http://127.0.0.1:8500/GetCTForecast/${reqObj.StartDate}/${reqObj.EndDate}/${reqObj.CargoType}`)
  }
}
