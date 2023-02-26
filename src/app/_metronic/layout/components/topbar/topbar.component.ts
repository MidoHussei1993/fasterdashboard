import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Profile } from 'src/app/pages/identity/models';
import { IdentityService } from 'src/app/pages/identity/services/identity.service';
import { SingleItemResponse } from 'src/app/shared';
import { LayoutService } from '../../core/layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  profile: Profile = new Profile()
  currentLang:string = '';
  constructor(
    private layout: LayoutService,
    private identityService: IdentityService,
    private router: Router,
    private translate: TranslateService

    ) {}

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.getProfile();
  }
  getProfile(){
    this.identityService.getProfile().subscribe((res: SingleItemResponse<Profile>) =>{
      this.profile = res.returnData;
    })
  }
  navigateToProfile(){
    this.router.navigateByUrl('/identity/my-profile')
  }
}
