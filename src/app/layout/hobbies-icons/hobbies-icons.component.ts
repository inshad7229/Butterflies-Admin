import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Component, OnInit,ViewChild,Inject,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {Sort} from '@angular/material';
import { ToastsManager , Toast} from 'ng2-toastr';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import {AdminService} from '../../shared/services/admin/admin.service'
import {PageEvent} from '@angular/material';
import {ENV} from '../../env'

@Component({
  selector: 'app-hobbies-icons',
  templateUrl: './hobbies-icons.component.html',
  styleUrls: ['./hobbies-icons.component.scss'],
  animations: [routerTransition()]
})
export class HobbiesIconsComponent implements OnInit {

  verifiactionForm:FormGroup
  HobbiesList
  sortedData
  users=[];
  listIndex=1;
  listSize=10
  pageIndex=0  
  pageSize=1
  pageSizeOptions = [5, 10, 25, 100];

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
                'countryName': [null, Validators.compose([Validators.required,Validators.maxLength(100)])],
            
        }) }

  ngOnInit() {
    this.onGetList()    
  }
  onGetList(){
    this.adminService.HobbiesList()
        .subscribe(data=>{
            if(data.response){;
              this.HobbiesList=data.result
              this.toastr.success('Hobbies Icons List' ,'Success',{toastLife: 2000, showCloseButton: true});
              //this.sortedData=data.result 
             if (this.HobbiesList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.HobbiesList.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.HobbiesList[i])
                 this.sortedData = this.users.slice();

                }
            }else{
              this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true});    
            }
        })
  }
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
        case 'name': return compare(a.name.trim(), b.name.trim(), isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }

   pageoption(event){
      this.pageSize=event.pageSize
      this.pageIndex=event.pageIndex
      this.users=[]
        for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
          if(i==this.HobbiesList.length){
            break;
          }else{
              this.users.push(this.HobbiesList[i])
                 this.sortedData = this.users.slice();

            }
     }
     
}

onEdit(country){
  this.datamodel=Object.assign({}, country)
}
onReset(){
  this.datamodel={}
}
onSubmit(){
  if (this.datamodel.id) {
      this.adminService.oneditCountry(this.datamodel)
        .subscribe(data=>{
            if(data.response){;
              let index=this.HobbiesList.map(function (img) { return img.id; }).indexOf(this.datamodel.id)
              this.toastr.success('Country Edited' ,'Success',{toastLife: 2000, showCloseButton: true});
              this.HobbiesList[index].name=this.datamodel.name;
             if (this.HobbiesList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.HobbiesList.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.HobbiesList[i])
                 this.sortedData = this.users.slice();

                }
            }else{
              this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true});  
            }
        })
  }else{
      this.adminService.onAddCountry(this.datamodel)
        .subscribe(data=>{
            if(data.response){;
             this.onGetList()
              this.toastr.success('Country Added Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});

            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
  }
}
onChange(data){
this.adminService.oneditCountryStatus(data)
        .subscribe(data=>{
            if(data.response){;
            // this.onGetList()
              this.toastr.success('Country updated Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});

            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
}
//this.customersList.map(function (img) { return img.customer_id; }).indexOf(this.appointMents[i].customer_id)==-1
onDelete(id){
    this.adminService.oneDeleteCountry(id)
        .subscribe(data=>{
            if(data.response){;
              this.HobbiesList=this.HobbiesList.filter(arg=>arg.id!=id)
              this.toastr.success('Country deleted' ,'Success',{toastLife: 2000, showCloseButton: true});
              this.users=[]
             if (this.HobbiesList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.HobbiesList.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.HobbiesList[i])
                 this.sortedData = this.users.slice();

                }
            }else{
                
            }
        })

}


opendelete(data): void {
        let dialogRef = this.dialog.open(HobbiesConfirmation, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
         if (result) {
           this.onDelete(data.id)
         }
        });
    }

 getImagePath(path){
  return ENV.img+'hobbies_icons/'+path
 }
}


function compare(a, b, isAsc) {
  if(a&&isNaN(a)){
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  }else{
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}



@Component({
  selector: 'hobbies-confirmation-dialog',
  templateUrl: 'confirmation.html',
  animations: [routerTransition()]
})

export class HobbiesConfirmation {
   

  constructor(
    public dialogRef: MatDialogRef<HobbiesConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data: any,
        private router: Router,
        private adminService: AdminService,
        public dialog: MatDialog) {
       }

  onYesClick(): void {
    this.dialogRef.close('yes');
    // this.homePage.onDelete(this.data.admin)
  }
   onNoClick(): void {
    this.dialogRef.close();
  }


 

}