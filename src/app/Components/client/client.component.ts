import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { ReactiveFormsModule, Form, FormGroup, FormControl, Validators } from '@angular/forms';

import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  @ViewChild('CreateClientModal') modal:NgbModalRef;
  @ViewChild('UpdateClientModal') modalUpdate:NgbModalRef;
  @ViewChild('DeleteClientModal') modalDelete:NgbModalRef;

  constructor(private service:ClientService, private form:ReactiveFormsModule,private modalService: NgbModal) { }
  closeResult = '';
  p: number = 1;

  createClientForm:FormGroup;

  clientList;
  DeleteId;

  updateModel;

  icoTrash = faTrash;
  icoPencil = faPencilAlt;

  clientFilter = {
    FirstName:'',
    LastName:'',
    Email:'',
    Identification:''
  }

  ngOnInit(): void {
    this.createClientForm = new FormGroup({
      FirstName: new FormControl('',Validators.nullValidator),
      LastName: new FormControl('',Validators.nullValidator),
      Age: new FormControl('',Validators.nullValidator),
      Identification: new FormControl('',Validators.nullValidator),
      Email: new FormControl('',Validators.nullValidator)
    });

    this.GetAllClients();

  }

  FilterName(){
    this.service.GetClientFilterName(this.clientFilter.FirstName).subscribe((data:any)=>{
      this.clientList = data.client;
    })
  }

  FilterLastName(){
    this.service.GetClientFilterLastName(this.clientFilter.LastName).subscribe((data:any)=>{
      this.clientList = data.client;
    })
  }

  FilterEmail(){
    this.service.GetClientFilterEmail(this.clientFilter.Email).subscribe((data:any)=>{
      this.clientList = data.client;
    })
  }

  CreateClient(){
    this.service.CreateClient(0,this.createClientForm.value.FirstName,this.createClientForm.value.LastName,this.createClientForm.value.Age,this.createClientForm.value.Identification,this.createClientForm.value.Email)
    .subscribe((data:any) =>{
      if(data.ResponseCode == 0){
        this.GetAllClients();
        this.close();
      }
    })
  }

  GetAllClients(){
    this.service.GetAllClients().subscribe((data:any)=>{
      this.clientList = data.client;
      console.log(data.client);
    });
  }

  DeleteClient(Id){
    this.DeleteId = Id;
    this.open(this.modalDelete);
  }

  DeleteConfirm(){
    this.close();
    this.service.DeleteClient(this.DeleteId).subscribe((data:any)=>{
      this.GetAllClients();
    })
  }

  UpdateClient(data:any){
    console.log(data);
    this.updateModel = data;
    this.open(this.modalUpdate);
  }

  UpdateConfirm(){
    this.service.UpdateClient(this.updateModel.ClientId,this.updateModel.FirstName,this.updateModel.LastName,this.updateModel.Age,this.updateModel.Identification,this.updateModel.Email).subscribe((data:any)=>{
      if(data.ResponseCode == 0){
        this.close()
        this.GetAllClients();
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
