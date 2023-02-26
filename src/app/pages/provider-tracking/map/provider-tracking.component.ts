import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provider-tracking',
  templateUrl: './provider-tracking.component.html',
  styleUrls: ['./provider-tracking.component.scss']
})
export class ProviderTrackingComponent implements OnInit{

   url: SafeResourceUrl;

   progress : boolean = false;
  constructor(private route: ActivatedRoute,public sanitizer:DomSanitizer) {
    this.progress = true;
  }

  ngOnInit(): void {
    let userId = this.route.snapshot.params.userId;

      this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://api.faster.sa:7080/Tracking/TrackingProvider?userId="+userId);      
     // console.log("the url is" + this.url + "end ")
  }
}
