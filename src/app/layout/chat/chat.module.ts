import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {NgxPaginationModule} from 'ngx-pagination'
import {MatPaginatorModule,MatDialogModule,MatInputModule,MatIconModule,MatListModule,MatFormFieldModule,MatCardModule} from '@angular/material';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { PageHeaderModule } from './../../shared';
import {AdminService} from '../../shared/services/admin/admin.service'

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';



import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';

// import {ChatService} from './chat.service'


@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
FormsModule,
MatSortModule,
NgxPaginationModule,
MatPaginatorModule,
MatDialogModule,
MatIconModule,
MatListModule,
MatFormFieldModule,
MatCardModule,
MatInputModule,
ToastModule.forRoot(),
  ],
  declarations: [ChatComponent,DialogUserComponent],
   providers:[AdminService,SocketService],
   entryComponents: [DialogUserComponent]
})
export class ChatModule { }
