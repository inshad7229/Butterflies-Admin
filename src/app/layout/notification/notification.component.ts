import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Component, OnInit,ViewChild,Inject,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {Sort} from '@angular/material';
import { forkJoin } from "rxjs/observable/forkJoin";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import {AdminService} from '../../shared/services/admin/admin.service'
import {PageEvent} from '@angular/material';
import { ToastsManager , Toast} from 'ng2-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [routerTransition()]
})
export class NotificationComponent implements OnInit {
	verifiactionForm:FormGroup
	datamodel

  constructor(public router: Router, private fb: FormBuilder,private adminService:AdminService,public dialog: MatDialog,vcr: ViewContainerRef,
                private toastr: ToastsManager) 
  {
    this.toastr.setRootViewContainerRef(vcr);
  	this.datamodel={}
  	this.verifiactionForm = fb.group({
        'message': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
        'options': [null, Validators.compose([Validators.required])],            
        })
  }

  ngOnInit() {
  }

  onReset(){
    this.datamodel={}
  }

  onSubmit(){
  	console.log(this.datamodel)
    this.adminService.sendBrodCastMessageAdmin(this.datamodel)
        .subscribe(data=>{
          console.log(data)
          if(data.response){
            this.toastr.success('Notification Sent' ,'Success',{toastLife: 2000, showCloseButton: true});
            this.verifiactionForm.reset();
          }else{
            this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true});    
          }
        })
  }

}
