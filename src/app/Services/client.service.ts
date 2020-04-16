import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  endpoint;
  constructor(private http:HttpClient) {
    this.endpoint = environment.endpoint + '/Client';
  }

  CreateClient(ClientId:Number,FirstName:String,LastName:String,Age:String,Identification:String,Email:String){
    return this.http.post(this.endpoint+'/CreateClient',{client:{ClientId:ClientId,FirstName:FirstName,LastName:LastName,Age:Age,Identification:Identification,Email:Email}});
  }

  UpdateClient(ClientId:Number,FirstName:String,LastName:String,Age:String,Identification:String,Email:String){
    return this.http.post(this.endpoint+'/UpdateClient',{client:{ClientId:ClientId,FirstName:FirstName,LastName:LastName,Age:Age,Identification:Identification,Email:Email}});
  }

  DeleteClient(ClientId:Number){
    return this.http.post(this.endpoint+'/DeleteClient',{ClientId:ClientId});
  }

  GetAllClients(){
    return this.http.post(this.endpoint+'/GetAllClients',{});
  }

  GetClientFilterName(FirstName:String){
    return this.http.post(this.endpoint+'/GetClientFilterName',{FirstName:FirstName});
  }

  GetClientFilterLastName(LastName:String){
    return this.http.post(this.endpoint+'/GetClientFilterLastName',{LastName:LastName});
  }

  GetClientFilterEmail(Email:String){
    return this.http.post(this.endpoint+'/GetClientFilterEmail',{Email:Email});
  }

}
