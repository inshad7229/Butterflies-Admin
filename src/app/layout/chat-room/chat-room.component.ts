import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Component, OnInit,ViewChild,Inject,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {Sort} from '@angular/material';
import { ToastsManager , Toast} from 'ng2-toastr';
import { forkJoin } from "rxjs/observable/forkJoin";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import {AdminService} from '../../shared/services/admin/admin.service'
import {PageEvent} from '@angular/material';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  animations: [routerTransition()]
})
export class ChatRoomComponent implements OnInit {
verifiactionForm:FormGroup
AllUsersList=[]

  CountyList
  UniversityList
  sortedData
  users=[];
  listIndex=1;
  listSize=10
  pageIndex=0  
  pageSize=1
  pageSizeOptions = [5, 10, 25, 100];
  searchInput
  usersDataBackup

  // MatPaginator Output
  pageEvent: PageEvent;
  datamodel
  editStatus:boolean=false

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  constructor(public router: Router, private fb: FormBuilder,private adminService:AdminService,public dialog: MatDialog,vcr: ViewContainerRef,
                private toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vcr);
    this.datamodel={}
    this.verifiactionForm = fb.group({
                'university_name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'country_id': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
            
        }) }

  ngOnInit() {
    this.usersList();
  }

    usersList(){
        this.adminService.adminChatRoomIds().subscribe(data=>{
            console.log(data);
            if(data.response==true){
               this.AllUsersList= data.result;
               this.usersDataBackup=data.result;
               if (this.AllUsersList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.AllUsersList.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.AllUsersList[i])
                 this.sortedData = this.users.slice();

                }
            }
        })
  }

   pageoption(event){
      this.pageSize=event.pageSize
      this.pageIndex=event.pageIndex
      this.users=[]
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
          if(i==this.AllUsersList.length){
            break;
          }else{
              this.users.push(this.AllUsersList[i])
                 this.sortedData = this.users.slice();

            }
     }
     
}


  sortData(sort: Sort) {
    const data =this.users.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'room_id': return compare(a.room_id.trim(), b.room_id.trim(), isAsc);
        case 'name': return compare(a.userDetails.name, b.userDetails.name, isAsc);
        case 'contact_no': return compare(a.userDetails.contact_no, b.userDetails.contact_no, isAsc);
        case 'age': return compare(a.userDetails.age.trim(), b.userDetails.age.trim(), isAsc);
        case 'gender': return compare(a.userDetails.gender.trim(), b.userDetails.gender.trim(), isAsc);
        case 'day': return compare(a.day, b.day, isAsc);
        default: return 0;
      }
    });
  }

}


function compare(a, b, isAsc) {
  if(a&&isNaN(a)){
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  }else{
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}