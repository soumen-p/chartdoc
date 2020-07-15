import { Component, OnInit } from '@angular/core';
import { ServiceMasterService } from 'src/app/services/service-master.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from 'querystring';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-charge-date',
  templateUrl: './charge-date.component.html',
  styleUrls: ['./charge-date.component.css']
})
export class ChargeDateComponent implements OnInit {

  chargeDates: [];
  editedData:any;
  deletedData:any;
  chargeDateFormGroup : FormGroup;
  chargeDateFromArray : FormArray;
  constructor(private fb: FormBuilder, private serviceMasterService: ServiceMasterService,private datePipe: DatePipe, public toastr: ToastrManager) { }

  ngOnInit() {
    this.chargeDateFormGroup = this.fb.group({
      chargeDateArray: this.fb.array([])
    });
    
  this.getAllChargeDates();
  }

  get getChargeDateArray() {
    return this.chargeDateFormGroup.get('chargeDateArray') as FormArray;
  }

  createChargeDateRow(id : number,startDate : string,endDate : string,description : string): FormGroup {
    return new FormGroup(
      {
       
        id: new FormControl(id),
        startDate: new FormControl( this.datePipe.transform(startDate, 'yyyy-MM-dd') , Validators.required),
        endDate: new FormControl(this.datePipe.transform(endDate, 'yyyy-MM-dd'), Validators.required),
        description : new FormControl(description),
        isEdit : new FormControl(false)
      }
    );
  }

  getAllChargeDates() {
     var chargeDateArray = this.getChargeDateArray;
     chargeDateArray.clear();
     this.serviceMasterService.getAllChargeDates(" "," ")
      .subscribe((res) => {
        res.forEach(element => {
          chargeDateArray.push(
            this.createChargeDateRow(
              element.id,
              element.startDate,
              element.endDate,
              element.description
            )
          );
       });
       
      }, err => {
        console.log(err);
      });
  }


  editChargeDate(value:any){
    const chargeDateRow = value as FormGroup;
    chargeDateRow.controls.isEdit.setValue(true);
  }
  cancelChargeDate(value:any){
    const chargeDateRow = value as FormGroup;
    chargeDateRow.controls.isEdit.setValue(false);
  }

  saveChargeDate(value:any){
    const chargeDateRow = value as FormGroup;
    chargeDateRow.controls.isEdit.setValue(false);
    
    
    var startDt =  chargeDateRow.controls['startDate'].value;
    var endDt =  chargeDateRow.controls['endDate'].value;
    var id =  chargeDateRow.controls['id'].value;

    this.editedData = chargeDateRow.value;
    //this.editedData.Description = this.editedData.FromDate.replace('/','') + "-" + this.editedData.ToDate.replace('/','');
    this.editedData.startDate = this.datePipe.transform(this.editedData.startDate, 'MM/dd/yyyy');
    this.editedData.endDate = this.datePipe.transform(this.editedData.endDate, 'MM/dd/yyyy');
    this.editedData.description =  this.datePipe.transform(this.editedData.startDate, 'MMddyyyy') + "-" +
                                    this.datePipe.transform(this.editedData.endDate, 'MMddyyyy') ;
    this.editedData.status = "U";

    this.saveChargeDateService(this.editedData);
  }

  saveChargeDateService(request) {
    this.serviceMasterService.saveChargeDate(request).subscribe((res) => {
      let response = res.split('|');
      if(response[0] == '1'){
        this.toastr.successToastr(response[1]);
        this.closePopuop('modalmarkDelete');
        this.getAllChargeDates();
      }
      else{
        this.toastr.errorToastr(response[1]);
      }
      
    }, err => {
      console.log("error");
    })
  }

  deleteChargeDate(formGroupRow:any){
    this.deletedData=formGroupRow.value;
    document.getElementById("modalmarkDelete").style.display = "block";
  }

  
  public openmodal(myModal: string, value: any) {

    this.deletedData.status = "D";
    this.saveChargeDateService(this.deletedData);
    document.getElementById(myModal).style.display = "block";
  }
  
  public closePopuop(myModal: string) {
    document.getElementById(myModal).style.display = "none";
  }
}
