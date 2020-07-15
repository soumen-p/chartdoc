import { Component, OnInit } from '@angular/core';
import { OthersServiceService } from '../../../services/others-service.service'
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';
import { OtherSave } from '../../../models/other-save';
import { TabHeadingDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-general',
  templateUrl: './add-general.component.html',
  styleUrls: ['./add-general.component.css']
})
export class AddGeneralComponent implements OnInit {
  selectedTypeId = '-1';
  Types: any[];
  OtherValues: OtherSave = new OtherSave();

  constructor(private OthersService: OthersServiceService, public toastr: ToastrManager, private router: Router) { }

  ngOnInit() {
    this.populatetypes();
  }
  selectChangeHandler(event: any) {
    // update the ui
    this.selectedTypeId = event.target.value;
  }

  populatetypes() {
    this.OthersService.getTypes()
      .subscribe((res) => {
        this.Types = res;
      });
  }
  SaveOther(Desc: string) {
    if (this.selectedTypeId === '' || this.selectedTypeId === '-1') {
      this.toastr.warningToastr('Select Type');
      return;
    } else if (Desc === '') {
      this.toastr.warningToastr('Add decsription');
      return;
    } else {
      const category: OtherSave = {
        id: '0',
        name: Desc,
        type: this.selectedTypeId
      };
      this.OthersService.saveOther(category)
        .subscribe((res) => {
          const result = res.split('|');
          if (result[0] === '1') {
            this.toastr.successToastr(result[1]);
            this.router.navigate(['/app-general']);
          } else {
            this.toastr.errorToastr(result[1]);
          }
        }, err => {
          this.toastr.errorToastr(err);
        });
    }
  }
}
