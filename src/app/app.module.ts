import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './modules/core/home/home.component';
import {UserDetailsComponent} from './modules/user/user-details/user-details.component';
import {UserListComponent} from './modules/user/user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserElementComponent } from './modules/user/user-list/user-element/user-element.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserDetailsComponent,
        UserListComponent,
        UserElementComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
