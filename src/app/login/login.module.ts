import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { Http ,Headers,RequestOptions,ResponseContentType,HttpModule} from '@angular/http';

import {AdminService} from '../shared/services/admin/admin.service'

@NgModule({
    imports: [ReactiveFormsModule,FormsModule,CommonModule, LoginRoutingModule,HttpModule],
    declarations: [LoginComponent],
    providers:[AdminService],
})
export class LoginModule {}
