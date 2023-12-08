import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as arLang } from './modules/i18n/vocabs/ar';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './modules/auth/components/login/login.service';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { environment } from 'src/environments/environment';
import { MessagingService } from './core/services/messaging.service';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
// import * as firebase from 'firebase';
// import firebase from 'firebase';
// import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'af-notification';
  message: any = null;
  hubHelloMessage?: string;

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService,
    private loginService: LoginService
  ) {
    // register translations
    initializeApp(environment.firebaseConfig);
    // let conect = firebase.initializeApp(environment.firebaseConfig);
    // firebase
    //   .messaging()
    //   .usePublicVapidKey(
    //     'AAAA3LXzyDo:APA91bE5TtTOjwJqM-7lXjb94b2VBbM-QZK9CmBJrUfHzP2CF0TpR3rE2S0g3HWhpiA94J0wLw4Bxm4eeLP6kNTtbblIOc6urzN908r2H2Ir22WabUhg8Ez9dm03LhjK8U7MYOz-h_Bi'
    //   );

    this.translationService.loadTranslations(enLang, arLang);
    // initializeApp(environment.firebaseConfig);
  }

  ngOnInit() {
    // this.requestPermission();
    // this.listen();

    if (localStorage.getItem('lang')) {
      this.translate.use(localStorage.getItem('lang'));
    }
    let el = document.querySelector('html');
    if (this.translate.currentLang == 'ar') {
      el.setAttribute('direction', 'rtl');
      el.setAttribute('dir', 'rtl');
      el.style.direction = 'rtl';
    } else {
      el.setAttribute('direction', 'ltr');
      el.setAttribute('dir', 'ltr');
      el.style.direction = 'ltr';
    }
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, {
      vapidKey:
        'BH63IojNZFJRem_wL8Z-i16WgKp_BlOSlJ2Bv1WpFToNB3uNzEKzMR_a_dVGZV7YqVyCN0S1qIT8rFn7YIukbmY',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Hurraaa!!! we got the token.....');
          console.log(currentToken);
          console.log(
            '🚀 ~ file: app.component.ts:116 ~ AppComponent ~ requestPermission ~ messaging:',
            messaging
          );
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log(
        '🚀 ~ file: app.component.ts:137 ~ AppComponent ~ onMessage ~ payload:',
        payload
      );
      alert(payload.notification.body);
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }
}
