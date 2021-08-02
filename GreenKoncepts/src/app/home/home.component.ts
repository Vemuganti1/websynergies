import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models';
import { AccountService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
   // user: User;
    username:string;
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    items = [
    	{name: 'Hierarchy', description: 'desc'},
      {name: 'Customer', description: 'desc'},
      {name: 'Orders', description: 'desc'},
      {name: 'Schedules', description: 'desc'},
      {name: 'Messages', description: 'desc'},
      {name: 'Email', description: 'desc'}
      
    ]
  

    constructor(private accountService: AccountService,private route: ActivatedRoute,
        private router: Router) {
       // this.user = this.accountService.userValue;
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        
    }
    ngOnInit() {
        this.username =  localStorage.getItem('name')
        //.replace(/^"(.+(?="$))"$/, '$1');
       
      }
      logout() {
       
        //this.router.navigate(['/account/login']);
     console.log("enter logout")  
        this.accountService.logout().subscribe(res=>{
          if(res){
            localStorage.removeItem('user');
                
         this.userSubject.next(null);
         this.router.navigateByUrl('/');
          }
        })

       
    }
   tileClick(tileName)
   {
if(tileName=="Customer"){
  this.router.navigateByUrl('/customer')
}
if(tileName=="Orders"){
  this.router.navigateByUrl('/orders')
}
if(tileName=="Hierarchy"){
  this.router.navigateByUrl('/hierarchy')
}
   }
}