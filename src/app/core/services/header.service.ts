import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  pageTitle = new BehaviorSubject<string>('');

  constructor() {}
  setPageTitle(title: string) {
    this.pageTitle.next(title);
    document.title = title;
  }
}
