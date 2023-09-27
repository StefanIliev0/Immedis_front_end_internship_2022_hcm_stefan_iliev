import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KEY_API } from '../constaints';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private http  : HttpClient) { }


  get(path : string , options? : string[] ){
    let headerString =  options?.join('/') || ''
    return this.http.get(`${KEY_API}/${path}`, options? { headers :{ provideData : headerString }} : undefined);
  };
  post(path : string , body : any ,  options? : string[] ){
    let headerString =  options?.join('/') || ''
    return this.http.post(`${KEY_API}/${path}` ,  body , options? { headers :{ provideData : headerString }} : undefined);
  };
  update(path : string , body : any ){
    return this.http.patch(`${KEY_API}/${path}` , body );
  };
  remove(path : string){
    return this.http.delete(`${KEY_API}/${path}`);
  };
}
