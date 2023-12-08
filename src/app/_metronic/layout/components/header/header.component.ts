import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../core/layout.service';
import { MenuComponent } from '../../../kt/components';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  headerContainerCssClasses: string = '';
  asideDisplay: boolean = true;
  headerLeft: string = 'menu';
  pageTitleCssClasses: string = '';
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef;
  currentLang: string = 'ar';
  pageTitle: string = '';

  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private router: Router,
    private headerService: HeaderService,
    private translate: TranslateService
  ) {
    this.routingChanges();
    this.currentLang = this.translate.currentLang;
  }

  ngOnInit(): void {
    this.headerService.pageTitle.subscribe((res) => {
      this.pageTitle = res;
    });
    this.headerContainerCssClasses =
      this.layout.getStringCSSClasses('headerContainer');
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
  }
  changeLanguage(): void {
    let el = document.querySelector('html');
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
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
  ngAfterViewInit() {
    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (this.pageTitleAttributes.hasOwnProperty(key)) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        MenuComponent.reinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {}
}
