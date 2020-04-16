import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './Components/client/client.component';
import { OrderComponent } from './Components/order/order.component';
import { ProductComponent } from './Components/product/product.component';

const routes: Routes = [
  { path: '', component:OrderComponent },
  { path: 'Client', component:ClientComponent },
  { path: 'Order', component:OrderComponent },
  { path: 'Product', component:ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
