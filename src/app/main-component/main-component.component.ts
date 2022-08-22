
import { faUser,faCamera,faUpload } from '@fortawesome/free-solid-svg-icons';
import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import videojs from 'video.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DocumentUploadComponent } from '../modals/document-upload/document-upload.component';
import { Yolov5Service } from '../service/yolov5.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {

  @ViewChild('target', {static: true}) target! : ElementRef;

  faUser = faUser;
  faCamera = faCamera;
  faUpload = faUpload;

  @Input() options! : {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
        src: string,
        type: string,
    }[],
};

player! : videojs.Player;

  constructor(private elementRef: ElementRef,private modalService: NgbModal,private yoloservice : Yolov5Service) { 
  }

  ngOnInit(): void {
   /*  this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    }); */
  }

   // Dispose the player OnDestroy
   ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  open() {
    const modalRef = this.modalService.open(DocumentUploadComponent, { ariaLabelledBy: 'modal-basic-title', size: 'xl',windowClass : 'modal-xl', backdrop: 'static' });
    modalRef.result.then((result) => {
    }, (reason) => {
     
    });
  }

}
