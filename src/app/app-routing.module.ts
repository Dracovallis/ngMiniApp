import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './modules/core/home/home.component';
import {UserDetailsComponent} from './modules/user/user-details/user-details.component';
import {UserListComponent} from './modules/user/user-list/user-list.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'users',
        component: UserListComponent
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
