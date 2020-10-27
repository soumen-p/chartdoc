import { Injectable } from '@angular/core';
import { DoctorInformation } from '../models/doctor-information';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  html: string = '';
  encryptSecretKey="9432227709"
  constructor() { }

  setLocalItem(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(this.encryptData(value)));
  }

  getLocalItem(key: string){
    let data=JSON.parse(localStorage.getItem(key));
    let data1=this.decryptData(data);
    return data1
  }
  
  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }
  decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data,  this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
  getBookingInfo(bookinginfo: string){
    return this.getLocalItem(bookinginfo);
  }

  clearLocalItem(){
    localStorage.clear();
  }

  getDynamicHtml(details: any[]){
    

    details.forEach(item => {
      this.html += '<div class="accordion-group" >' +
                  '<div class="card">' +
                    '<div class="card-header">'+
                      '<div class="row">' +
                        '<div class="col-12">' +
                          '<div class="form-row">';

      this.html +=  '<div class="col-5">' + item.Code + '</div>' +
                    '<div class="col-6">' + item.Desc + '</div>' +
                    '<div class="col-1">' + 
                      '<span class="showSingle addbutton" (click)="AddIcdDetails('+item.ID+', '+item.Code+', '+item.Desc+')" target="3">+</span>' +
                    '</div>';

      this.html +=  '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    });

    
    return this.html;
  }

  removeLocalStorage(key: string){
    localStorage.removeItem(key);
  }
}
