import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Profile } from 'src/app/pages/identity/models';
import { IdentityService } from 'src/app/pages/identity/services/identity.service';
import { SingleItemResponse } from 'src/app/shared';
import { LayoutService } from '../../core/layout.service';
import { MessagingService } from 'src/app/core/services/messaging.service';

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
  profile: Profile = new Profile();
  currentLang: string = '';
  notificationList: any[] = [];
  constructor(
    private layout: LayoutService,
    private identityService: IdentityService,
    private router: Router,
    private translate: TranslateService,
    private messagingService: MessagingService // public signalrService: SignalrService
  ) {}

  ngOnInit(): void {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.messagingService.currentMessage.subscribe((message) => {
      if (message) {
        console.log(
          '🚀 ~ file: notifications-inner.component.ts:27 ~ NotificationsInnerComponent ~ this.messagingService.currentMessage.subscribe ~ message:',
          message
        );
        this.notificationList.push(message);
        // this.alerts.push({
        //   title: message.title,
        //   description: message.body,
        //   time: '1 hr',
        //   icon: 'icons/duotune/technology/teh008.svg',
        //   state: 'primary',
        // });
      }
    });
    this.currentLang = this.translate.currentLang;
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.getProfile();
  }
  backPage() {
    window.history.back();
  }

  notifyMe() {
    if (!('Notification' in window)) {
      // Check if the browser supports notifications
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification('Hi there!');
      // …
    } else if (Notification.permission !== 'denied') {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
          const notification = new Notification('Hi there!');
          // …
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }
  getProfile() {
    this.identityService
      .getProfile()
      .subscribe((res: SingleItemResponse<Profile>) => {
        this.profile = res.returnData;
      });
  }
  navigateToProfile() {
    this.router.navigateByUrl('/identity/my-profile');
  }
}
