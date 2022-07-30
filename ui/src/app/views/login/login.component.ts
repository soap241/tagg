import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { UserService } from "../../services/http/user.http-service";

import { User } from "../../models/user.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
})
export class LoginComponent {
  login_user: User = {};
  login_active: boolean = false;

  login_msg: string = "";
  login_success: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  public user_login() {
    this.login_active = true;

    this.userService.login_user(this.login_user).subscribe((res) => {
      this.login_msg = res["msg"];
      this.login_success = res["success"];

      if (res["success"]) {
        setTimeout(() => {
          this.router.navigate(["/dashboard"]);
        }, 1500);
      } else {
        this.login_active = false;
        this.login_user.password = "";
      }
    });
  }
}
