import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRequest } from '../model/chart-input.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  // getDashbaordData(reqObj:DashboardRequest): Observable<any>{
  //   return this.http.post(`https://staging.maqta.ae/ApiAppointment/api/ATLPPCSDashboard/GetCargoVolumeData`,reqObj)
  // }

  getDashbaordData(reqObj:DashboardRequest): Observable<any>{
    return this.http.post(` http://10.0.131.21/MamarPh2/InternetServices/api/\ATLPPCSDashboard/GetCargoVolumeData`,reqObj)
  }
 
}
