import { Injectable } from "@angular/core";

import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  login_user() {
    localStorage.setItem("user_fullname", this.cookieService.get("fullname"));
  }

  logout_user() {
    this.cookieService.deleteAll();
    localStorage.clear();
  }

  is_logged_in() {
    return this.cookieService.get("fullname") ? true : false;
  }
}
