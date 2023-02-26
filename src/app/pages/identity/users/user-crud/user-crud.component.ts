import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern, SingleItemResponse, UserType } from 'src/app/shared';
import { Role } from '../../models';
import { IdentityService } from '../../services/identity.service';
class checkBoxRoles extends Role{
  isSelected:boolean
}

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss']
})
export class UserCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  existRoles: checkBoxRoles[] = [];
  userRoles: Role[] = [];
  currentLanguage: string = '';
  userTypeDropDown =  UserType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private identityService : IdentityService,
  ) { 
    this.form = this.formBuilder.group({
      identificationNumber: [''],
      fullName: ['', [Validators.required]],
      userType: [1, [Validators.required]],
      phone: ['', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
      email: ['', [Validators.required,Validators.email]],
      profileImage: ['', [Validators.required]],
      password: ['', [Validators.required]],
      // favoriteLanguage: ['', [Validators.required]],
      // frontEndDevice: ['', [Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.addControl('frontEndDevice', new FormControl('', Validators.required))
      this.form.addControl('favoriteLanguage', new FormControl('', Validators.required))
      // this.isView = true;
      this.form.disable();
    }
  }
  ngOnInit() {
    this.getExistRoles();
    if (this.mode === FormMode.View) {
      this.identityService.getUserById(this.route.snapshot.params.id).subscribe(res=>{
        this.form.patchValue(res.returnData);
        this.form.get('phone').patchValue(res.returnData.phoneNumber);
        res.returnData.roles.map(role =>{
          this.existRoles.map(exist =>{
            if(exist.name === role){
              exist.isSelected = true;
            }
          })
        })
      })
    }
   }
   
   async handleInputChange(event) {
    const file = event.target.files[0];
    this.identityService.uploadImage(file).subscribe(res => {
      this.form.get('profileImage').patchValue(res.returnData.response)
    })
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
      //  this.getUserRoles();
     },err=>{
       this.spinner.hide();
     })
   }

   edit() {
    this.form.markAllAsTouched();
    console.log(this.form)
    if(!this.form.valid) return;
    let body = this.form.value;
    body.userType = +body.userType;
    // this.form.get('identificationNumber').patchValue(this.route.snapshot.params.id)
    // this.form.get('userType').patchValue(Number(this.form.get('userType').value))
    body.roles = this.existRoles.filter(item => item.isSelected == true).map(item => item.name)
    this.spinner.show();
    this.identityService.createDashboardUser(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}
