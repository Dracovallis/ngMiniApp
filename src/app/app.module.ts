// @ng
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// @ng mat
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


import {AppRoutingModule} from './app-routing.module';
// @components
import {AppComponent} from './app.component';
import {HomeComponent} from './modules/core/home/home.component';
import {UserDetailsComponent} from './modules/user/user-details/user-details.component';
import {UserListComponent} from './modules/user/user-list/user-list.component';
import {UserElementComponent} from './modules/user/user-list/user-element/user-element.component';
import { LoaderComponent } from './modules/core/loader/loader.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserDetailsComponent,
        UserListComponent,
        UserElementComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MatListModule,
        MatTableModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
