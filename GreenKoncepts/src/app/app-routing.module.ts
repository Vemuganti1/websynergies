import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HierarchyComponent } from 'src/hierarchy';
import { CustomerComponent } from './account/customer.component';


import { HomeComponent } from './home';
import { OrderDetailComponent } from './orders';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '',  loadChildren: accountModule },
    // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
     { path: 'home', component:HomeComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'orders', component: OrderDetailComponent },
    { path: 'hierarchy', component:HierarchyComponent },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }