import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
     url='https://dev.greenkoncepts.com/gktest';
    userData: string;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    
    login(username, password) {
        
        return this.http.get<User>(this.url+'/login?username='+username+'&password='+password)
            .pipe(map(user => {
                console.log("user is"+JSON.stringify(user))
                this.userData=user.key
               
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('name', user['userName']); 
                localStorage.setItem('key',user['key'])
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove
      
        console.log(JSON.stringify(this.userData))
        return this.http.get(this.url+'/logout?token='+this.userData)   
    }
    register(test) {
      //  const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
        const body =     test 
       let api= "https://dev.greenkoncepts.com/gktest/createCustomer?token="+this.userData
       return this.http.post<any>(api, body).pipe(map(res=>res))
       
      
    }

    getOrderDetails() {
        console.log(JSON.stringify(this.userData))
        return this.http.get(this.url+'/getAllOrders?token='+this.userData)   
    }
    getHierarchy()
    {
        return this.http.get(this.url+'/node-hierarchy?token='+this.userData)  
    }

   
    
}