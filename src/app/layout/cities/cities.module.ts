import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent,CityConfirmation } from './cities.component';

@NgModule({
  imports: [
    CommonModule,
    CitiesRoutingModule,
     PageHeaderModule,
    ReactiveFormsModule,
FormsModule,
MatSortModule,
NgxPaginationModule,
MatPaginatorModule,
MatDialogModule,
ToastModule.forRoot(),
  ],
  declarations: [CitiesComponent,CityConfirmation],
  providers:[AdminService],
  entryComponents:[CityConfirmation]
})
export class CitiesModule { }
