import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {
  KEY_API : string = environment.KEY_API; 

  constructor(private http  : HttpClient) { }


  get(path : string , options? : string[] ){
    let headerString =  options?.join('/') || ''
    return this.http.get(`${this.KEY_API}/${path}`, options? { headers :{ provideData : headerString }} : undefined);
  };
  post(path : string , body : any ,  options? : string[] ){
    let headerString =  options?.join('/') || ''
    return this.http.post(`${this.KEY_API}/${path}` ,  body , options? { headers :{ provideData : headerString }} : undefined);
  };
  update(path : string , body : any ){
    return this.http.patch(`${this.KEY_API}/${path}` , body );
  };
  remove(path : string){
    return this.http.delete(`${this.KEY_API}/${path}`);
  };
}
