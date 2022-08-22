import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Yolov5Service {

constructor(private http: HttpClient) { }

baseurl = "http://localhost:9000";

 uploadFile(file : File | null, value: any)
 {
    let url = this.baseurl + "/infer";
    let postData : FormData = new FormData();
    postData.append("file",value,file?.name);    
    
    return this.http.post(url, postData);
 }

}
