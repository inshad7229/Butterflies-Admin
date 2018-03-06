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
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss'],
   animations: [routerTransition()]
})
export class UniversitiesComponent implements OnInit {
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
    this.onGetList()    
  }
  onGetList(){
    this.users=[]
    this.adminService.CountriesList()
     forkJoin([this.adminService.CountriesList(), this.adminService.UniversityList()])
        .subscribe(data=>{
            if(data[0].response && data[1].response){;
              this.CountyList=data[0].result.filter(arg=>arg.status == true)
              this.UniversityList=data[1].result
              this.toastr.success('University List and Countries list ' ,'Success',{toastLife: 2000, showCloseButton: true});
              //this.sortedData=data.result 
             if (this.UniversityList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.UniversityList.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.UniversityList[i])
                 this.sortedData = this.users.slice();

                }
            }else if(data[0].response && !data[1].response){
               this.CountyList=data[0].result.filter(arg=>arg.status == true)
              this.toastr.success('University List' ,'Success',{toastLife: 2000, showCloseButton: true});
            }else{
              this.toastr.error(data[0].message+',and '+data[1].message ,'Error',{toastLife: 2000, showCloseButton: true});    
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
        case 'country_name': return compare(a.Country.name.trim(), b.Country.name.trim(), isAsc);
        case 'university_name': return compare(a.university_name.trim(), b.university_name.trim(), isAsc);
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
          if(i==this.UniversityList.length){
            break;
          }else{
              this.users.push(this.UniversityList[i])
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
onSubmit(){
  if (this.datamodel.id) {
      this.adminService.oneditUniversity(this.datamodel)
        .subscribe(data=>{
            if(data.response){;
              let index=this.UniversityList.map(function (img) { return img.id; }).indexOf(this.datamodel.id)
              this.toastr.success('University Edited' ,'Success',{toastLife: 2000, showCloseButton: true});
              this.onGetList()
              this.datamodel.country_id=null
              this.verifiactionForm.reset();
            }else{
              this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true});  
            }
        })
  }else{
      this.adminService.onAddUniversity(this.datamodel)
        .subscribe(data=>{
            if(data.response){;
             this.onGetList()
             this.datamodel.country_id=null
             this.verifiactionForm.reset();
              this.toastr.success('University Added Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});

            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
  }
}
onChange(data){
this.adminService.oneditUniversityStatus(data)
        .subscribe(data=>{
            if(data.response){;
            // this.onGetList()
              this.toastr.success('University updated Successfully' ,'Success',{toastLife: 2000, showCloseButton: true});

            }else{
               this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true}); 
            }
        })
}
//this.customersList.map(function (img) { return img.customer_id; }).indexOf(this.appointMents[i].customer_id)==-1
onDelete(id){
    this.adminService.oneDeleteUniversity(id)
        .subscribe(data=>{
            if(data.response){;
              this.UniversityList=this.UniversityList.filter(arg=>arg.id!=id)
              this.toastr.success('University deleted' ,'Success',{toastLife: 2000, showCloseButton: true});
              this.users=[]
              this.sortedData=this.sortedData.filter(arg=>arg.id!=id)
             if (this.UniversityList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.UniversityList.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.UniversityList[i])
                 this.sortedData = this.users.slice();

                }
            }else{
                
            }
        })

}


opendelete(data): void {
        let dialogRef = this.dialog.open(UniversityConfirmation, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
         if (result) {
           this.onDelete(data.id)
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



@Component({
  selector: 'cities-confirmation-dialog',
  templateUrl: 'confirmation.html',
  animations: [routerTransition()]
})

export class UniversityConfirmation {
   

  constructor(
    public dialogRef: MatDialogRef<UniversityConfirmation>,
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