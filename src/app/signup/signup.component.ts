import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {AdminService} from '../shared/services/admin/admin.service'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
	complexForm: FormGroup;
    email
    forgotData
    message
    
    constructor(private adminService:AdminService,public router: Router,private formBuilder:FormBuilder) 
    {
    	 this.complexForm = this.formBuilder.group({
        'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
         })
    }

      //adminForgotPass

    ngOnInit() {}

    adminForgotPass(){
    	this.forgotData={
            email:this.email
        }
    	this.adminService.adminForgotPass(this.forgotData).subscribe(data=>{
            console.log(data);
            if (data.response==true) {
            	this.message=data.message;
            }
             else if(data.response==false){
                this.message=data.message;
             }
         },err=>{
            console.log(err);
        })
    }
}
