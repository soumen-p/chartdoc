import { Injectable } from '@angular/core';
import { DoctorInformation } from '../models/doctor-information';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  html: string = '';
  constructor() { }

  setLocalItem(key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalItem(key: string){
    return JSON.parse(localStorage.getItem(key));
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
