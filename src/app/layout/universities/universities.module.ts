import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'

import { UniversitiesRoutingModule } from './universities-routing.module';
import { UniversitiesComponent,UniversityConfirmation } from './universities.component';

@NgModule({
  imports: [
    CommonModule,
    UniversitiesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
FormsModule,
MatSortModule,
NgxPaginationModule,
MatPaginatorModule,
MatDialogModule,
ToastModule.forRoot(),
  ],
  declarations: [UniversitiesComponent,UniversityConfirmation],
  providers:[AdminService],
  entryComponents:[UniversityConfirmation]
})
export class UniversitiesModule { }
