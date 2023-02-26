import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { SingleItemResponse } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { Profile } from '../models';
import { IdentityService } from '../services/identity.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  profile: Profile = new Profile();
  form: FormGroup;
  isFormChanged: boolean = false;

  @ViewChild('imgViewer', { static: false }) imgViewer:ImgViewerComponent;


  constructor(
    private identityService: IdentityService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,

  ) {
    this.form = this.formBuilder.group({
      phoneNumber: ['', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
      fullName: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.getProfile();
  }

  viewImage(){
    this.imgViewer.openBackDropCustomClass();
  }
  getProfile(){
    this.identityService.getProfile().subscribe((res: SingleItemResponse<Profile>) =>{
      this.profile = res.returnData;
      this.form.patchValue(this.profile)
      console.log(this.profile)
    })
  }

  async handleInputChange(event) {
    const file = event.target.files[0];
    this.identityService.updateProfileImage(file).subscribe(res => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  }
  edit() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    let body = this.form.value;
    this.spinner.show();
    this.identityService.updateDashBoardUserProfile(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }

}
