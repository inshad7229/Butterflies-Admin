import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Component, OnInit,ViewChild,Inject,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import {Sort} from '@angular/material';
import { ToastsManager , Toast} from 'ng2-toastr';
import { forkJoin } from "rxjs/observable/forkJoin";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { routerTransition } from '../../router.animations';
import {AdminService} from '../../shared/services/admin/admin.service'
import { ActivatedRoute } from '@angular/router'; 

const AVATAR_URL = 'https://api.adorable.io/avatars/285';
import { ChatService } from './chat.service';

@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
   usernameFormControl = new FormControl('', [Validators.required]);
  message: string;
messages: string[] = [];
roomdetails
id
reqMessage
verifiactionForm
chat
  constructor(
    private chatService:ChatService,private route: ActivatedRoute,public router: Router, private fb: FormBuilder,private adminService:AdminService,public dialog: MatDialog,vcr: ViewContainerRef,
                private toastr: ToastsManager) { 
     this.verifiactionForm = fb.group({
                'chat': [null, Validators.compose([Validators.required,Validators.maxLength(1000)])],
                
            
        }) 

   this.reqMessage={}
  this.route.params.subscribe(res => {
        console.log(res.id)
        this.id=res.id
      });}
      
  
    sendMessage(msg) {
    this.reqMessage={}
    this.reqMessage.sender_id=0
    this.reqMessage.room_id=this.id
    this.reqMessage.receiver_id=2//this.roomdetails.user_id
    this.reqMessage.message=this.chat
    this.reqMessage.unique_code=/*this.roomdetails.user_id*/2+ new Date().getTime()
    this.chatService.sendMessage(this.reqMessage);
    this.messages.push(this.reqMessage)
    this.chat=''
    this.message = '';
  }

  ngOnInit() {

     this.adminService.ChatRoomIdDetails(this.id).subscribe(data=>{
            console.log(data.result);
            this.roomdetails=data.result
            this.messages=this.roomdetails.adminRoomChats
          
        })

     this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log(message)
        this.messages.push(message);
    });
    }

    getClass(chat){
          if (chat.sender_id== 0) {
            return 'right clearfix'
          }else if (chat.sender_id!= 0 ) {
           return 'left clearfix'
          }
    }

    getClass2(chat){
        if (chat.sender_id== 0 ) {
            return 'pull-right'
          }else if (chat.sender_id!= 0 ) {
           return 'pull-left'
          }
    }
 }