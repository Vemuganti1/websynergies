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
    hierarchy: Object;
    nodes: { id: number; name: string; children: ({ id: number; name: string; children?: undefined; } | { id: number; name: string; children: { id: number; name: string; }[]; })[]; }[];
    parent: any;
    child: any;

    constructor(private accountService: AccountService,private route: ActivatedRoute,
        private router: Router) {
       // this.user = this.accountService.userValue;
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        
    }
   
    ngOnInit() {
        this.username =  localStorage.getItem('name');
        this.accountService.getHierarchy().subscribe(res=>{
           
            this.hierarchy=res['entity']['nodeStandardMetadata'];
           
            this.parent=res['entity']['nodeStandardMetadata']['children'],
            this.child=res['entity']['nodeStandardMetadata']['children']['children']
            
            let childArray:any=[];
            let nestedChildArray=[];
            this.parent.forEach(element => {
                childArray.push({'id':element.nodeId,'name':element.nodeName})
                console.log("res is"+JSON.stringify(element.children))
                element.children.forEach(element1 => {
                    element1.children.forEach(element2 => {
                    this.nodes = [
                        {
                          id: this.hierarchy['nodeId'],
                          name: this.hierarchy['nodeName'],
                     children: [{'id':element.nodeId,'name':element.nodeName,
                     children:[{'id':element1.nodeId,'name':element1.nodeName},
                    {'id':element2.nodeId,'name':element2.nodeName}]
                      
                        
                    }
                ]  
                }];
            }) 
            })  

            });
            
             
                
            
        
                 
                })
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