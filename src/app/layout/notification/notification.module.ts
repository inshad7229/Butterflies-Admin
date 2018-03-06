import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,
	FormsModule,
	MatSortModule,
	NgxPaginationModule,
	MatPaginatorModule,
	MatDialogModule,
	ToastModule.forRoot(),
	PageHeaderModule
  ],
  declarations: [NotificationComponent],
  providers:[AdminService]
})
export class NotificationModule { }
