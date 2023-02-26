import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IdentityService } from '../../services/identity.service';

interface IPrivilege {
  roleName: string;
  privileges: {
    id: number;
    isHavePrivilege: boolean;
    privilegeName: string;
  }[];
}

@Component({
  selector: 'app-priviledge',
  templateUrl: './priviledge.component.html',
  styleUrls: ['./priviledge.component.scss'],
})
export class PriviledgeComponent implements OnInit {
  privilegeList: IPrivilege[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private identityService: IdentityService,
    private spinner: NgxSpinnerService,

  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.identityService
      .getPriviledge(this.activatedRoute.snapshot.params.id)
      .subscribe((res) => {
        this.spinner.hide();
        this.privilegeList = res.returnData;
      },err => {
        this.spinner.hide();
      });
  }
  changePriviledge(privilege: {id: number,isHavePrivilege: boolean,privilegeName: string}) {
    console.log(privilege);
    this.spinner.show();
    this.identityService.ChangeUserPrivilegesStatus(this.activatedRoute.snapshot.params.id,privilege.id)
      .subscribe(res => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }
}
