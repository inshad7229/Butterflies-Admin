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
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
   animations: [routerTransition()]
})
export class EventsListComponent implements OnInit {
verifiactionForm:FormGroup

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
  AllUsersList


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
    this.usersDataBackup=[]
this.AllUsersList=[]
    this.verifiactionForm = fb.group({
                'university_name': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
                'country_id': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
            
        }) }

  ngOnInit() {
    this.usersList();
  }

  usersList(){
         this.usersDataBackup=[];
this.users=[];
        this.adminService.eventListAdmin().subscribe(data=>{
            console.log(data);
            if(data.response==true){
               this.AllUsersList= data.data;
               this.usersDataBackup=data.data;
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
    searchUser(pager){
          
        pager.pageIndex=0;
        this.usersDataBackup=[];
        this.usersDataBackup=this.AllUsersList.filter( it => {
            let b = it.name+it.email+it.email+it.contact_no+it.register_for+it.gemder+it.vegetarian
            return b.toLowerCase().includes(this.searchInput.toLowerCase())
        });
        this.pageIndex=0;
        this.pageSize=10;
        this.users=[];
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
            if(i==this.usersDataBackup.length){break;
            }else{
              this.users.push(this.usersDataBackup[i])
                 this.sortedData = this.users.slice();

          }
            if(this.usersDataBackup.length-1<i+1){break;}
        }
    }

  // onGetList(){
  //   this.users=[]
  //   this.adminService.CountriesList()
  //    forkJoin([this.adminService.CountriesList(), this.adminService.UniversityList()])
  //       .subscribe(data=>{
  //           if(data[0].response && data[1].response){;
  //             this.CountyList=data[0].result.filter(arg=>arg.status == true)
  //             this.UniversityList=data[1].result
  //             this.toastr.success('University List and Countries list ' ,'Success',{toastLife: 2000, showCloseButton: true});
  //             //this.sortedData=data.result 
  //            if (this.UniversityList.length>5){
  //                 this.pageSize=5
  //               }else{
  //                 this.pageSize=this.UniversityList.length  
  //               }
  //               for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
  //                this.users.push(this.UniversityList[i])
  //                this.sortedData = this.users.slice();

  //               }
  //           }else if(data[0].response && !data[1].response){
  //              this.CountyList=data[0].result.filter(arg=>arg.status == true)
  //             this.toastr.success('University List' ,'Success',{toastLife: 2000, showCloseButton: true});
  //           }else{
  //             this.toastr.error(data[0].message+',and '+data[1].message ,'Error',{toastLife: 2000, showCloseButton: true});    
  //           }
  //       })
  // }
  getClass(i){
    if (i%2==0) {
     return 'table-success'
    }else{
      return 'table-info'
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
        case 'title': return compare(a.title.trim(), b.title.trim(), isAsc);
        case 'name': return compare(a.artist_name, b.artist_name, isAsc);
        case 'from_date': return compare(a.from_date, b.from_date, isAsc);
        case 'to_date': return compare(a.to_date.trim(), b.to_date.trim(), isAsc);
        case 'status': return compare(a.approved_status.trim(), b.approved_status.trim(), isAsc);
        case 'day': return compare(a.day, b.day, isAsc);
        default: return 0;
      }
    });
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

onEdit(country){
  this.datamodel=Object.assign({}, country)
  console.log(this.datamodel)
}
onReset(){
  this.datamodel={}
}
// onSubmit(){
//   if (this.datamodel.id) {
//       this.adminService.oneditUniversity(this.datamodel)
//         .subscribe(data=>{
//             if(data.response){;
//               let index=this.UniversityList.map(function (img) { return img.id; }).indexOf(this.datamodel.id)
//               this.toastr.success('University Edited' ,'Success',{toastLife: 2000, showCloseButton: true});
//               this.onGetList()
//               this.datamodel.country_id=null
//               this.verifiactionForm.reset();
//             }else{
//               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true});  
//             }
//         })
//   }else{
//       this.adminService.onAddUniversity(this.datamodel)
//         .subscribe(data=>{
//             if(data.response){;
//              this.onGetList()
//              this.datamodel.country_id=null
//              this.verifiactionForm.reset();
//               this.toastr.success('University Added Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});

//             }else{
//                this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
//             }
//         })
//   }
// }

onChange(data){
this.adminService.userStatusUpdateAdmin(data)
        .subscribe(data=>{
            if(data.response){;
              this.toastr.success('User Status Updated Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});
            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
}

onDelete(id){
    this.adminService.userDeleteAdmin(id)
        .subscribe(data=>{
            if(data.response){
              this.AllUsersList=this.AllUsersList.filter(arg=>arg.id!=id)
              this.toastr.success('User deleted' ,'Success',{toastLife: 2000, showCloseButton: true});
            
             if (this.AllUsersList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.AllUsersList.length  
                }
          }
        })

}


onApproved(data){
this.adminService.eventApproveAdmin(data.id)
        .subscribe(data=>{
            if(data.response){
               if (data.data[0]==1) {
                    this.toastr.success('User Status Updated Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});
                  this.usersList();
               }
            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
}

}


function compare(a, b, isAsc) {
  if(a&&isNaN(a)){
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  }else{
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}



