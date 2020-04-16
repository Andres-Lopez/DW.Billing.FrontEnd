import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  endpoint;
  constructor(private http:HttpClient) {
    this.endpoint = environment.endpoint + '/Order';
  }

  CreateOrder(OrderId:Number,ClientId:String,Total:Number){
    return this.http.post(this.endpoint+'/CreateOrder',{order:{ClientId:ClientId,Total:Total}});
  }

  UpdateOrder(OrderId:Number,Name:String,Quantity:String,Price:String){
    return this.http.post(this.endpoint+'/UpdateOrder',{order:{OrderId:OrderId,Name:Name,Quantity:Quantity,Price:Price}});
  }

  DeleteOrder(OrderId:Number){
    return this.http.post(this.endpoint+'/DeleteOrder',{OrderId:OrderId});
  }

  GetAllOrders(){
    return this.http.post(this.endpoint+'/GetAllOrders',{});
  }

  GetOrderFilterName(Name:String){
    return this.http.post(this.endpoint+'/GetOrderFilterName',{Name:Name});
  }

  CreateProductOrder(ProductId:Number,OrderId:Number,Quantity:Number,UnitPrice:Number){
    return this.http.post(this.endpoint+'/CreateProductOrder',{ProductId:ProductId,OrderId:OrderId,Quantity:Quantity,UnitPrice:UnitPrice});
  }

}
