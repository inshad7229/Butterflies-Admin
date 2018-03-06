import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Component, OnInit,ViewChild,Inject,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {Sort} from '@angular/material';
import { ToastsManager , Toast} from 'ng2-toastr';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import {AdminService} from '../../shared/services/admin/admin.service'
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-videos-content',
  templateUrl: './videos-content.component.html',
  styleUrls: ['./videos-content.component.scss'],
  animations: [routerTransition()]
})
export class VideosContentComponent implements OnInit {
verifiactionForm:FormGroup
  VideoContentList
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
                'countryName': [null, Validators.compose([Validators.required,Validators.maxLength(500)])],
            
        }) }

  ngOnInit() {
    this.verifiactionForm.disable();
    this.onGetList()    
  }
  onGetList(){
    this.datamodel={}
    this.users=[]
    this.adminService.videoContentList()
        .subscribe(data=>{
            if(data.response){;
              this.VideoContentList=data.result
              this.toastr.success('Videos Content List' ,'Success',{toastLife: 2000, showCloseButton: true});
              //this.sortedData=data.result 
             if (this.VideoContentList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.VideoContentList.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.VideoContentList[i])
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
        case 'name': return compare(a.content.trim(), b.content.trim(), isAsc);
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
          if(i==this.VideoContentList.length){
            break;
          }else{
              this.users.push(this.VideoContentList[i])
                 this.sortedData = this.users.slice();

            }
     }
     
}

onEdit(country){
  this.verifiactionForm.enable();
  this.datamodel=Object.assign({}, country)
}
onReset(){
  this.datamodel={}
}
onSubmit(){
  console.log("submit button clicked")
  if (this.datamodel.id) {
      this.adminService.editVideosContent(this.datamodel)
        .subscribe(data=>{
            if(data.response){
              this.onGetList()

             //  let index=this.VideoContentList.map(function (img) { return img.id; }).indexOf(this.datamodel.id)
             //  this.toastr.success('Country Edited' ,'Success',{toastLife: 2000, showCloseButton: true});
             //  this.VideoContentList[index].name=this.datamodel.name;
             // if (this.VideoContentList.length>5){
             //      this.pageSize=5
             //    }else{
             //      this.pageSize=this.VideoContentList.length  
             //    }
             //    for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
             //     this.users.push(this.VideoContentList[i])
             //     this.sortedData = this.users.slice();

             //    }
            }else{
              this.toastr.error(data.message ,'Error',{toastLife: 2000, showCloseButton: true});  
            }
        })
  }else{
      
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
              this.VideoContentList=this.VideoContentList.filter(arg=>arg.id!=id)
              this.toastr.success('Country deleted' ,'Success',{toastLife: 2000, showCloseButton: true});
              this.users=[]
             if (this.VideoContentList.length>5){
                  this.pageSize=5
                }else{
                  this.pageSize=this.VideoContentList.length  
                }
                for (var i = this.pageIndex*this.pageSize; i<(this.pageIndex*this.pageSize+this.pageSize); i++) {
                 this.users.push(this.VideoContentList[i])
                 this.sortedData = this.users.slice();

                }
            }else{
                
            }
        })

}


opendelete(data): void {
        let dialogRef = this.dialog.open(VideoContentConfirmation, {
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
  selector: 'video-content-confirmation-dialog',
  templateUrl: 'confirmation.html',
  animations: [routerTransition()]
})

export class VideoContentConfirmation {
   

  constructor(
    public dialogRef: MatDialogRef<VideoContentConfirmation>,
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