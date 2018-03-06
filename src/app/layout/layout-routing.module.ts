import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'countries', loadChildren: './countries/countries.module#CountriesModule' },
            { path: 'cities', loadChildren: './cities/cities.module#CitiesModule' },
            { path: 'universities', loadChildren: './universities/universities.module#UniversitiesModule' },
            { path: 'hobbies', loadChildren: './hobbies-icons/hobbies-icons.module#HobbiesIconsModule' },
            { path: 'introductrory', loadChildren: './introductory-content/introductory-content.module#IntroductoryContentModule' },
            { path: 'videocontent', loadChildren: './videos-content/videos-content.module#VideosContentModule' },
            { path: 'aboutus', loadChildren: './about-us/about-us.module#AboutUsModule' },
            { path: 'contactus', loadChildren: './contact-us/contact-us.module#ContactUsModule' },
            { path: 'faq', loadChildren: './faq/faq.module#FaqModule' },
            { path: 'user', loadChildren: './user-list/user-list.module#UserListModule' },
            { path: 'userDetail/:id', loadChildren: './userdetail/userdetail.module#UserdetailModule' },
            { path: 'notification', loadChildren: './notification/notification.module#NotificationModule' },
            { path: 'chatroom', loadChildren: './chat-room/chat-room.module#ChatRoomModule' },
            { path: 'chat', loadChildren: './chat/chat.module#ChatModule' },
            { path: 'chat/:id', loadChildren: './chat/chat.module#ChatModule' },
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
