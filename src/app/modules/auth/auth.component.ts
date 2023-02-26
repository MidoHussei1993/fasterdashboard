import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { loadScript } from 'src/app/util';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy, AfterViewInit {
  today: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    // document.body.classList.add('bg-white');
  }
  ngAfterViewInit(){
    this.loadScript();
  }
  async loadScript(){
    await loadScript('assets/scripts/particles.min.js')
  }

  ngOnDestroy() {
    // document.body.classList.remove('bg-white');
  }
}
