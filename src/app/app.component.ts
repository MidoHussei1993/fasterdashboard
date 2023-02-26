import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslationService} from './modules/i18n';
// language list
import {locale as enLang} from './modules/i18n/vocabs/en';
import {locale as arLang} from './modules/i18n/vocabs/ar';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './modules/auth/components/login/login.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private translate: TranslateService,
    private loginService: LoginService,
    ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      arLang,
    );
  }

  ngOnInit() {
  //  let refresh =  setInterval(() =>{
  //     this.loginService.refreshToken().toPromise().then(res => {
  //       console.log(res);
  //       localStorage.setItem('refreshToken' ,res.returnData.refreshToken );
  //         localStorage.setItem('token' ,res.returnData.token );
  //     }).catch(err => {
  //       clearInterval(refresh);
  //     })
  //   },1000*60*60*24 )
    if(localStorage.getItem('lang')){
      this.translate.use(localStorage.getItem('lang'));
    }
    let el = document.querySelector('html');
    if(this.translate.currentLang == 'ar'){
      el.setAttribute('direction', 'rtl');
      el.setAttribute('dir', 'rtl');
      el.style.direction = 'rtl';
    }else{
      el.setAttribute('direction', 'ltr');
      el.setAttribute('dir', 'ltr');
      el.style.direction = 'ltr';
    }
  }
}
