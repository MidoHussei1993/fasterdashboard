import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menuItems } from 'src/app/shared/modules/sidebarItemsDto';
import { SidebaritemsService } from 'src/app/shared/services/sidebaritems.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  menuItems: menuItems[]=[];

  constructor(
    private _sideMenuServ: SidebaritemsService,
    private router: Router
    ) {
    
  }

  ngOnInit(): void {
    let allMenu= this._sideMenuServ.menu;
    let currentUserRole = JSON.parse(localStorage.getItem('roles'))
    // this.menuItems = allMenu
    allMenu.map((item,index) => {
      let menuTitle = item.menuTitle;
      currentUserRole.map(role =>{
        item.role.map(pageRole =>{
          if(pageRole == role){
            if (this.menuItems.length &&this.menuItems[this.menuItems.length-1].menuTitle == menuTitle) return;
            if(item){
              item.childern = item.childern.filter(child => {
                if(child.role){
                  return child.role.includes(role)
                } else return true
              })
              this.menuItems.push(item)
            }
            else return;
            // item.role = [];
          }
        })
      })
    })
  }
  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/login')
  }

  navigate(item){
    console.log(item);
    if(item.link){
      this.router.navigateByUrl(item.link);
    }
  }
}
