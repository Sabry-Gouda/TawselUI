import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {UserAccount} from "../../models/user-account";
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.css']
})
export class SystemUsersComponent implements OnInit {

  newAccount: UserAccount;
  alertType: string = "";
  message:string = "";
  isVisible: boolean = false;
  roles: Role[] = [];

  constructor(private accountService: AccountService, private router: Router, private roleService: RoleService) {
    this.newAccount = new UserAccount();
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  registration=new UntypedFormGroup({
    fullName: new UntypedFormControl("", [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")]),
    username: new UntypedFormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+[a-z|A-Z|0-9]*$")]),
    email:new UntypedFormControl("",[Validators.required,Validators.email]),
    password: new UntypedFormControl("", [Validators.required, Validators.minLength(8)]),
    role: new UntypedFormControl('', [Validators.required])

  })

  getAllRoles() {
    this.roleService.getAll().subscribe(
      data => {
        this.roles = data
      },
      error => {
        console.log(error);

      }
    )
  }

  get FullName() {
    return this.registration.get("fullName");
  }
  get UserName(){
    return this.registration.get("username");
  }
  get Email(){
    return this.registration.get("email");
  }

  get Password(){
    return this.registration.get("password");
  }
  get Permission(){
    return this.registration.get("permission");
  }

  get Role() {
    return this.registration.get('role');
  }

  createUser(fullName: string, userName: string, email: string, password: string, roleId: string) {
    this.newAccount.full_Name = fullName;
    this.newAccount.email = email;
    this.newAccount.userName = userName;
    this.newAccount.password = password;
    this.newAccount.roleId = roleId;
    this.accountService.registerNewUser(this.newAccount).subscribe(
      (data)=>{
        // check if created successfully
        console.log(data);
        this.isVisible = true;
        this.alertType = "success"
        this.message = "User created Successfully";
        this.registration.reset();
      },
      (err) => {
        console.log(err);
        this.isVisible = true;
        this.alertType = "danger";
        // single Error
        if (err.hasOwnProperty("error")) {
          let { error } = err;
          let { message } = error;
          this.message = message;
        }

        // More than Error
        let { errors } = err
        if (err.hasOwnProperty("errors")) {
          for (let i = 0; i < errors.length; i++) {
            this.message += errors[i];
          }
        }
      }
    )

  }

}
