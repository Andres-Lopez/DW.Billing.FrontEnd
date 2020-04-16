import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint;
  constructor(private http:HttpClient) {
    this.endpoint = environment.endpoint + '/Product';
  }

  CreateProduct(ProductId:Number,Name:String,Quantity:String,Price:String){
    return this.http.post(this.endpoint+'/CreateProduct',{product:{ProductId:ProductId,Name:Name,Quantity:Quantity,Price:Price}});
  }

  UpdateProduct(ProductId:Number,Name:String,Quantity:String,Price:String){
    return this.http.post(this.endpoint+'/UpdateProduct',{product:{ProductId:ProductId,Name:Name,Quantity:Quantity,Price:Price}});
  }

  DeleteProduct(ProductId:Number){
    return this.http.post(this.endpoint+'/DeleteProduct',{ProductId:ProductId});
  }

  GetAllProducts(){
    return this.http.post(this.endpoint+'/GetAllProducts',{});
  }

  GetProductFilterName(Name:String){
    return this.http.post(this.endpoint+'/GetProductFilterName',{Name:Name});
  }
}
