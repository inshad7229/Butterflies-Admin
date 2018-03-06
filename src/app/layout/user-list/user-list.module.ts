import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent ,UniversityConfirmation} from './user-list.component';

@NgModule({
  imports: [
    CommonModule,
    UserListRoutingModule, 
    PageHeaderModule,
    ReactiveFormsModule,
FormsModule,
MatSortModule,
NgxPaginationModule,
MatPaginatorModule,
MatDialogModule,
ToastModule.forRoot(),
  ],
  declarations: [UserListComponent,UniversityConfirmation],
  providers:[AdminService],
  entryComponents:[UniversityConfirmation]
})
export class UserListModule { }
