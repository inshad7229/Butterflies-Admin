import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit,ViewChild,Inject,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from "rxjs/observable/forkJoin";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import {PageEvent} from '@angular/material';
import {AdminService} from '../../shared/services/admin/admin.service'


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [routerTransition()]
})
export class ContactUsComponent implements OnInit {
  contactUsList
  sortedData
  users=[];
  pageIndex=0  
  pageSize=1
  pageSizeOptions = [5, 10, 25, 100];

  constructor(  private adminService:AdminService,public router: Router, private fb: FormBuilder,
  				public dialog: MatDialog,
  				vcr: ViewContainerRef,
             ) 
  {

  }

  ngOnInit() {
    this.contactUsAdmin();
  }

  open(data): void {
    let dialogRef = this.dialog.open(Email, {
      width: '750px', height: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result) {
        this.adminService.contactUsReplyAdmin(result).subscribe(data=>{
            console.log(data);
            if(data.response==true){
               // this.contactUsList= data.result;
            }
        })
      }
    });
  }

  contactUsAdmin(){
        this.adminService.contactUsAdmin().subscribe(data=>{
            console.log(data);
            if(data.response==true){
               this.contactUsList= data.result;
            }
        })
    }

    // pageoption(event){
    //   this.pageSize=event.pageSize
    //   this.pageIndex=event.pageIndex
    //   this.users=[]
    //     for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
    //       if(i==this.contactUsList.length){
    //         break;
    //       }else{
    //           this.users.push(this.contactUsList[i])
    //              this.sortedData = this.users.slice();

    //         }
    //    }
    // }

}


/////////////////// Dialog ///////////////////////////////
@Component({
  selector: 'email-dialog',
  templateUrl: 'email.html',
  animations: [routerTransition()]
})

export class Email {
 verifiactionForm;
 reply;
 dataSend
  constructor(
    public dialogRef: MatDialogRef<Email>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        public dialog: MatDialog,
        private fb: FormBuilder) {
    this.dataSend={}
    this.verifiactionForm = fb.group({
                'reply': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])],
            
        }) 
       }

  sendEmail(): void {
     this.dataSend.email=this.data.senderDetails.email
    this.dataSend.name=this.data.senderDetails.email
    this.dataSend.subject=this.data.senderDetails.email
    this.dataSend.message=this.data.senderDetails.email
    this.dataSend.reply=this.data.senderDetails.email
    this.dialogRef.close(this.dataSend);
  }

  onNoClick(){
     this.dialogRef.close()
  }
}
