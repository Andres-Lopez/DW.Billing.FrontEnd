import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/Services/product.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('CreateProductModal') modal:NgbModalRef;
  @ViewChild('UpdateProductModal') modalUpdate:NgbModalRef;
  @ViewChild('DeleteProductModal') modalDelete:NgbModalRef;

  constructor(private service:ProductService, private form:ReactiveFormsModule,private modalService: NgbModal) { }
  closeResult = '';
  p: number = 1;

  createProductForm:FormGroup;

  productList;
  DeleteId;

  updateModel;

  icoTrash = faTrash;
  icoPencil = faPencilAlt;

  productFilter = {
    Name:'',
  }

  ngOnInit(): void {
    this.createProductForm = new FormGroup({
      Name: new FormControl('',Validators.nullValidator),
      Quantity: new FormControl('',Validators.nullValidator),
      Price: new FormControl('',Validators.nullValidator)
    });

    this.GetAllProducts();

  }

  FilterName(){
    this.service.GetProductFilterName(this.productFilter.Name).subscribe((data:any)=>{
      this.productList = data.product;
    })
  }


  CreateProduct(){
    this.service.CreateProduct(0,this.createProductForm.value.Name,this.createProductForm.value.Quantity,this.createProductForm.value.Price)
    .subscribe((data:any) =>{
      if(data.ResponseCode == 0){
        this.GetAllProducts();
        this.close();
      }
    })
  }

  GetAllProducts(){
    this.service.GetAllProducts().subscribe((data:any)=>{
      this.productList = data.product;
      console.log(data.product);
    });
  }

  DeleteProduct(Id){
    this.DeleteId = Id;
    this.open(this.modalDelete);
  }

  DeleteConfirm(){
    this.close();
    this.service.DeleteProduct(this.DeleteId).subscribe((data:any)=>{
      this.GetAllProducts();
    })
  }

  UpdateProduct(data:any){
    console.log(data);
    this.updateModel = data;
    this.open(this.modalUpdate);
  }

  UpdateConfirm(){
    this.service.UpdateProduct(this.updateModel.ProductId,this.updateModel.Name,this.updateModel.Quantity,this.updateModel.Price).subscribe((data:any)=>{
      if(data.ResponseCode == 0){
        this.close()
        this.GetAllProducts();
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
