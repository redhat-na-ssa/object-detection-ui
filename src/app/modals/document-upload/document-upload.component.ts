import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Buffer } from 'buffer';
import { faTimesCircle , faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Yolov5Service } from 'src/app/service/yolov5.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {

  formImport!: FormGroup;
  fileToUpload!: File | null;
  faTimesCircle = faTimesCircle;
  faSpinner = faSpinner;
  srcdata! : string;
  processedData! : string;
  uploadfileType! : string;
  isProcessed : boolean = false;
  isProcessing : boolean = false;
  processedObject : any[] = new Array();
  modelInfo! : any;

  constructor(public activeModal: NgbActiveModal,private yoloservice : Yolov5Service,public fb : FormBuilder) {
    this.formImport = this.fb.group({
      importFile : ['']
    })
  }

  ngOnInit() {
  }

  onUpload()
  {
      this.isProcessed = false;
      this.isProcessing = true;
      this.yoloservice.uploadFile(this.fileToUpload,this.formImport.get("importFile")?.value).subscribe((resp : any) => {
        console.log(resp);
        if(resp && resp.detectedObj)
        {
          this.isProcessed = true;
          this.isProcessing = false;
          this.processedData="data:"+resp.contentType+";base64,"+ resp.data;
          /* var arrayBufferView = new Uint8Array(resp.data );
          var blob = new Blob( [ arrayBufferView ], { type: resp.contentType } );
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            this.processedData = <string>reader.result;
         } */
        }
        this.processedObject = resp.detectedObj;
        this.modelInfo = resp.modelInfo;
      });
  }

  onFileChange(event: any)
  {

     this.isProcessed = false;
     if(event.files && event.files.item(0) != null) {
       this.fileToUpload = event.files.item(0);
       if((event.files.item(0).type).indexOf("video") != -1)
         this.uploadfileType = "video";
       else
         this.uploadfileType = "image";
     } 

    let fileReader  = new FileReader();
    fileReader.onload = () => {
       this.srcdata = <string>fileReader.result;
    }
    fileReader.readAsDataURL(event.files.item(0));

    this.formImport.patchValue({
       importFile : event.files.item(0)
    })
  }

  close(result? : number)
  {
    this.activeModal.close(result);
  }

  dismiss()
  {
    this.activeModal.dismiss();
  }

}

