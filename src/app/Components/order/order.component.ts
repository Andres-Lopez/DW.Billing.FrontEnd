import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/Services/order.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { faTrash, faPencilAlt,faPlus } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from 'src/app/Services/product.service';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @ViewChild('CreateOrderModal') modal:NgbModalRef;
  @ViewChild('UpdateOrderModal') modalUpdate:NgbModalRef;
  @ViewChild('DeleteOrderModal') modalDelete:NgbModalRef;
  @ViewChild('ProductModal') modalProduct:NgbModalRef;
  @ViewChild('ClientModal') modalClient:NgbModalRef;


  constructor(private service:OrderService,private serviceProduct:ProductService, private form:ReactiveFormsModule,private modalService: NgbModal, private serviceClient:ClientService) { }
  closeResult = '';
  p: number = 1;
  o: number = 1;

  createOrderForm:FormGroup;

  orderList;
  productList;
  clientList;
  DeleteId;

  updateModel;

  icoTrash = faTrash;
  icoPencil = faPencilAlt;
  icoPlus = faPlus;

  productPicked = [];
  Total:Number = 0;

  orderFilter = {
    Name:'',
  }

  clientName;
  clientId;


  StartOrder(){
    this.open(this.modalClient);
    this.productPicked = [];
    this.clientId = 0;
    this.clientName = "";
    this.clientList = [];

  }

  FilterClientName(){
    this.serviceClient.GetClientFilterName(this.clientName).subscribe((data:any)=>{
      this.clientList = data.client;
    })
  }

  PickClient(Id){
    this.clientId = Id;
    this.close();
    this.open(this.modalProduct);
  }

  ngOnInit(): void {
    this.GetAllProducts();
    this.GetAllOrders();
  }

  GetAllProducts(){
    this.serviceProduct.GetAllProducts().subscribe((data:any)=>{
      this.productList = data.product;
    })
  }

  FilterName(){
    this.service.GetOrderFilterName(this.orderFilter.Name).subscribe((data:any)=>{
      this.orderList = data.order;
    })
  }

  PickProduct(item){
    this.productPicked.push(item);
    this.Total = this.Total + item.Price;
  }

  CreateOrder(){
    this.close();
    this.service.CreateOrder(0,this.clientId,this.Total)
    .subscribe((data:any) =>{
      if(data.ResponseCode == 0){
        for(var i = 0; i < this.productPicked.length; i++){
            let item = this.productPicked[i];
            console.log(item);
            this.service.CreateProductOrder(item.ProductId,data.OrderId,1,item.Price).subscribe((data)=>{

            });
        }

        this.GetAllOrders();
        this.close();
      }
    })

  }


  GetAllOrders(){
    this.service.GetAllOrders().subscribe((data:any)=>{
      this.orderList = data.order;
      console.log(data.order);
    });
  }

  DeleteOrder(Id){
    this.DeleteId = Id;
    this.open(this.modalDelete);
  }

  DeleteConfirm(){
    this.close();
    this.service.DeleteOrder(this.DeleteId).subscribe((data:any)=>{
      this.GetAllOrders();
    })
  }

  UpdateOrder(data:any){
    console.log(data);
    this.updateModel = data;
    this.open(this.modalUpdate);
  }

  UpdateConfirm(){
    this.service.UpdateOrder(this.updateModel.OrderId,this.updateModel.Name,this.updateModel.Quantity,this.updateModel.Price).subscribe((data:any)=>{
      if(data.ResponseCode == 0){
        this.close()
        this.GetAllOrders();
      }

    })
  }

  open(content) {

    this.modal = this.modalService.open(content);

    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close(){
    this.modal.close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
