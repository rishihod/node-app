import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
const httpOptions = {  headers: new HttpHeaders({'Content-Type':  'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Api_Url = 'http://0.0.0.0:8081/'
  Api_url = 'http://0.0.0.0:8081/'
  constructor(private httpClient: HttpClient) { }
  getCitiesBycompany() : Observable<any> {
    return this.httpClient.post(this.Api_Url+ "getCitiesByCompany?company=infosys", httpOptions);
  }
  getBuildings(area: string, city_id: string) : Observable<any> {
    return this.httpClient.post(this.Api_url + "getBuildingsByCampus?campus=" + area + "&city_id=" + city_id, httpOptions);
  }
  getStationsFromBuildings = function (building_id : number) : Observable<any> {
    return this.httpClient.post(this.Api_url + "getHodsByBuilding?building_id=" + building_id, httpOptions);
};
getSlotsForBuildings = function (date, building_id) : Observable<any> {
    return this.httpClient.post(this.Api_Url + "getTimeSlotsBybuilding?month_no=" + date + "&building_id=" + building_id, httpOptions);
};
getAvailableSlots = function (date, building_id) {
  return this.httpClient.post(this.Api_url + "getSlotAvaliability_web1?&date=" + date + "&type=H&building_id=" + building_id);
};
bookHomeAppointment = function (request ,url) {
  return this.httpClient.post(this.Api_url + url, request, httpOptions
);
};
sendOTP = function (phone_no) {
    return this.httpClient.post(this.Api_Url + "otpToUser?mobile_no=" + phone_no)
};
validateOTP = function (otp, phone_no){
  return this.httpClient.post(this.Api_url + "verifyReportsOtp?mobile_no=" + phone_no + "&pin=" + otp);
};
getUserDocuments = function (id, session_id) {
  return this.httpClient.get(this.Api_Url + "user/get_user_documents?user_id=" + id + "&session_id=" + session_id);
};
}

