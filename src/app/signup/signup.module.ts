import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { Http ,Headers,RequestOptions,ResponseContentType,HttpModule} from '@angular/http';
import {AdminService} from '../shared/services/admin/admin.service'


@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,FormsModule,
	ReactiveFormsModule,
	HttpModule
  ],
  declarations: [SignupComponent],
  providers:[AdminService],
})
export class SignupModule { }
