import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'


import { UserdetailRoutingModule } from './userdetail-routing.module';
import { UserdetailComponent } from './userdetail.component';

@NgModule({
  imports: [
    CommonModule,PageHeaderModule,
    UserdetailRoutingModule
  ],
  declarations: [UserdetailComponent],
  providers:[AdminService]
})
export class UserdetailModule { }
