import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { SingleItemResponse } from 'src/app/shared';
import { Role } from '../../models';
import { IdentityService } from '../../services/identity.service';
class checkBoxRoles extends Role{
  isSelected:boolean
}

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  existRoles: checkBoxRoles[] = [];
  userRoles: Role[] = [];
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private identityService: IdentityService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
  ) { }

  ngOnInit() {
   this.getExistRoles();
  }

  getExistRoles(){
    this.spinner.show();
    this.identityService.getExistRoles()
    .subscribe((res: SingleItemResponse<checkBoxRoles[]>)=>{
      this.spinner.hide();
      res.returnData = res.returnData.map(item =>{
        item.isSelected = false;
        return item
      })
      this.existRoles = res.returnData
      this.getUserRoles();
    },err=>{
      this.spinner.hide();
    })
  }

  getUserRoles(){
    this.spinner.show();
    this.identityService.getUserRoles(this.activatedRoute.snapshot.params.id)
    .subscribe((res: SingleItemResponse<string[]>)=>{
      this.spinner.hide();
      res.returnData.map((selected:string) =>{
        this.existRoles.map(role =>{
          if(role.name == selected){
            role.isSelected = true;
          }
        })
      })
    },err=>{
      this.spinner.hide();
    })
  }

  updateUserRoles(){
    this.spinner.show();
    let selectedRolesIds = this.existRoles.filter(item => item.isSelected == true).map(item => item.name)
    this.identityService.updateUserRoles({
      roles: selectedRolesIds ,
      userId: this.activatedRoute.snapshot.params.id
    }).subscribe(res =>{
    this.spinner.hide();
    this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
    })
  }

}
