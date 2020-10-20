// @ng
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// @ng mat
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MaterialModules} from './modules/core/material-modules';

import {AppRoutingModule} from './app-routing.module';
// @components
import {AppComponent} from './app.component';
import {HomeComponent} from './modules/core/home/home.component';
import {UserDetailsComponent} from './modules/user/user-details/user-details.component';
import {UserListComponent} from './modules/user/user-list/user-list.component';
import {UserElementComponent} from './modules/user/user-list/user-element/user-element.component';
import {LoaderComponent} from './modules/core/loader/loader.component';
import {AppService} from './app.service';
import {reducerProvider, getReducers} from './statemanagement/root.reducer';
import {StateObservable, Store, StoreModule} from '@ngrx/store';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserDetailsComponent,
        UserListComponent,
        UserElementComponent,
        LoaderComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModules,
        StoreModule.forRoot(getReducers()),
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
        AppService,
        reducerProvider,
        Store
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
