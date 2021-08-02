import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models';
import { AccountService } from '../_services';

@Component({ templateUrl: 'orderDetail.component.html' })
export class OrderDetailComponent {
   // user: User;
    username:string;
    orderData: Object;
    

    constructor(private accountService: AccountService,private route: ActivatedRoute,
        private router: Router) {
       // this.user = this.accountService.userValue;
    }
    ngOnInit() {
        this.username =  localStorage.getItem('name')
        this.accountService.getOrderDetails().subscribe(res=>{
           //console.log("res is"+JSON.stringify(res))
            this.orderData=res;
            //this.customerName=res['customer']
        })
        //.replace(/^"(.+(?="$))"$/, '$1');
       
      }
   
}