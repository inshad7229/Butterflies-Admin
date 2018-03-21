import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'


import { UserdetailRoutingModule } from './userdetail-routing.module';
import { UserdetailComponent } from './userdetail.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
  imports: [
    CommonModule,PageHeaderModule,
    UserdetailRoutingModule,
    ToastModule.forRoot(),
  ],
  declarations: [UserdetailComponent],
  providers:[AdminService]
})
export class UserdetailModule { }
