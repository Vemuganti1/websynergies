import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models';

@Component({ templateUrl: 'customer.component.html' })
export class CustomerComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    username: string;
    public user: Observable<User>;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {  
 }

    ngOnInit() {
        this.username =  localStorage.getItem('name')
        this.form = this.formBuilder.group({
            customerName: ['', Validators.required],
            customerAge: ['', Validators.required,Validators.pattern("^[0-9]*$")],
            customerAddress: ['', Validators.required]
           
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        console.log("form value is"+JSON.stringify(this.form.value))
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Customer created successfully', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/home')
                },
                error: error => {
                    this.alertService.error("invalid data");
                    this.loading = false;
                }
            });
    }
 
 
}