import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';



@Component({ templateUrl: 'hierarchy.component.html' })
export class HierarchyComponent {
   // user: User;
    username:string;
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

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
   
}