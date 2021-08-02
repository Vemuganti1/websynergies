import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { OrderDetailComponent } from './orders';
import { TreeModule } from '@circlon/angular-tree-component';
import { HierarchyComponent } from 'src/hierarchy';


@NgModule({
    imports: [
        TreeModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
        
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        OrderDetailComponent,
        HierarchyComponent
    
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };