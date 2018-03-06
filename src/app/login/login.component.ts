import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {AdminService} from '../shared/services/admin/admin.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
	complexForm: FormGroup;
    loginData
    email
    password
    message

    constructor(private adminService:AdminService,public router: Router,private formBuilder:FormBuilder)
    {
        this.complexForm = this.formBuilder.group({
        'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(10)])],
        'password': [null, Validators.compose([Validators.required])]
      })
    }

    ngOnInit() {}

    onLoggedin() {
        this.loginData={
            email:this.email,
            password:this.password,
        }

        this.adminService.adminLogin(this.loginData).subscribe(data=>{
            console.log(data);
            if (data.response==true) {
                this.router.navigate(['/dashboard']);
                localStorage.setItem('isLoggedin', 'true');
            }
             else if(data.response==false){
                 this.message=data.message;
             }
         },err=>{
            console.log(err);
        })
    }
}
