import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
// import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { IdentityService } from 'src/app/pages/identity/services/identity.service';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertResult } from 'sweetalert2';

let audio = new Audio('../../../assets/audio/fingerlicking-message-tone.mp3');
// import * as authfirebase from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private identityService: IdentityService
  ) {
    // this.angularFireMessaging.messages((msgings) => console.log(msgings));

    this.angularFireMessaging.messages.subscribe((_messaging: any) => {
      console.log(
        '🚀 ~ file: messaging.service.ts:17 ~ MessagingService ~ this.angularFireMessaging.messages.subscribe ~ _messaging:',
        _messaging
      );
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      // _messaging._next = (payload: any) => {
      //   this.currentMessage.next(payload);
      // };
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });

    this.angularFireMessaging.messages.subscribe((msgings) => {
      console.log(msgings);
      // msgings = msgings.onMessage.bind(msgings);
      // msgings.onTokenRefresh = msgings.onTokenRefresh.bind(msgings);
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(
          '🚀 ~ file: messaging.service.ts:38 ~ MessagingService ~ this.angularFireMessaging.requestToken.subscribe ~ token:',
          token
        );
        this.identityService.updateFirebaseToken(token).subscribe(
          (res) => {
            console.log(
              '🚀 ~ file: messaging.service.ts:46 ~ MessagingService ~ this.angularFireMessaging.requestToken.subscribe ~ res:',
              res
            );
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              position: 'center',
              title:
                ' تاكد من اعدادات الاشعارات في المتصفح لتتمكن من استقبال الاشعارات',
              // footer: '<a href>Why do I have this issue?</a>'
            });
          }
        );
      },
      (err) => {
        Swal.fire({
          icon: 'warning',
          position: 'center',
          title:
            ' تاكد من اعدادات الاشعارات في المتصفح لتتمكن من استقبال الاشعارات',
          // footer: '<a href>Why do I have this issue?</a>'
        });
      }
    );
  }

  receiveMessage() {
    // this.angularFireMessaging.messages.subscribe((msg: any) => {
    //   console.log('show message!', msg);
    //   const body = `<div class='grosso' style="width: 500px">${msg.notification.body}<a href="${msg.notification.click_action}">click</a></div>`;
    //   // this.toastrService.success(body, msg.notification.title, {
    //   //   enableHtml: true,
    //   //   positionClass: 'toast-top-left',
    //   //   disableTimeOut: true,
    //   // });

    //   this.currentMessage.next(msg);
    // });
    // this.angularFireMessaging.messages.subscribe((_messaging: any) => {
    //   console.log(
    //     '🚀 ~ file: messaging.service.ts:17 ~ MessagingService ~ this.angularFireMessaging.messages.subscribe ~ _messaging:',
    //     _messaging
    //   );
    //   _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //   // _messaging._next = (payload: any) => {
    //   //   this.currentMessage.next(payload);
    //   // };
    //   _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    // });

    this.angularFireMessaging.messages.subscribe((msgings) => {
      audio.play();
      this.currentMessage.next(msgings);
      // console.log(msgings);
      // msgings = msgings.onMessage.bind(msgings);
      // msgings.onTokenRefresh = msgings.onTokenRefresh.bind(msgings);
    });
  }
}
