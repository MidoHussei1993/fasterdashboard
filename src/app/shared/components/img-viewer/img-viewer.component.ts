import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss'],
})
export class ImgViewerComponent implements OnInit {
  @ViewChild('content', { static: false }) content;
  @Input() img: string = '';
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openBackDropCustomClass() {
    if(!this.img.length) return;
    this.modalService.open(this.content, {
      backdropClass: 'light-blue-backdrop',
      size :'xl'
    });
  }
}
