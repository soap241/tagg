import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationStart, NavigationEnd, Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";

import { _cudService } from "../services/http/_cud.http-service";
import { UserService } from "../services/http/user.http-service";
import { ReloginService } from "../services/utility/relogin.utility-service";
import { ToasterService } from "../services/utility/toaster.utility-service";
import { ViewService } from "../services/http/view.http-service";

import { fade_in_out } from "../animations/fade-in-out.animation";
import { toaster_in_out } from "../animations/toaster.animation";

import { User } from "../models/user.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./wrapper.component.html",
  styleUrls: ["./wrapper.component.css"],
  animations: [fade_in_out(200, 200), toaster_in_out(-50, 200, 200)],
})
export class WrapperComponent implements OnInit {
  public nav_items = [];

  public sidebarMinimized = true;

  public app_user: User = {};
  public user_password_set = { old: "", new: "", confirm: "" };

  public routed_location: string = "";
  public navigation_active: boolean = false;

  public page_titles: { [key: string]: string } = {
    dashboard: "Dashboard",
    users: "User Management",
  };

  @ViewChild("ChangePasswordModal") public ChangePasswordModal: ModalDirective;
  @ViewChild("LogoutModal") public LogoutModal: ModalDirective;
  form_submit_active: boolean = false;

  @ViewChild("ReloginWrapper") public TestWrapper: ModalDirective;
  relogin_submit_msg: string;
  relogin_password: string;
  relogin_submit_active: boolean = false;
  relogin_submit_success: boolean;

  form_submit_success: boolean;
  form_submit_msg: string;

  constructor(
    private cudService: _cudService,
    private userService: UserService,
    private viewService: ViewService,
    private router: Router,
    public reloginService: ReloginService,
    public toasterService: ToasterService
  ) {
    this.router.events.subscribe((r) => {
      if (r instanceof NavigationStart) {
        this.navigation_active = true;
      } else if (r instanceof NavigationEnd) {
        this.navigation_active = false;
        this.routed_location = this.page_titles[r.url.split("/").pop()];
      }
    });
  }

  ngOnInit() {
    this.app_user.fullname = localStorage.getItem("user_fullname");
    this.load_nav();
  }

  private load_nav() {
    this.viewService.load_view("home").subscribe((res) => {
      if (!res["success"]) {
        this.toasterService.make_toast({
          msg: "Unable to load navigation items",
          type: "error",
        });
        return;
      }

      this.nav_items = res["data"]["nav_items"];
    });
  }

  public toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public call_change_password_modal() {
    this.user_password_set = { old: "", new: "", confirm: "" };
    this.form_submit_active = false;

    this.ChangePasswordModal.show();
  }

  public call_logout_modal() {
    this.form_submit_active = false;
    this.LogoutModal.show();
  }

  public call_relogin_modal() {}

  public user_password_modify() {
    const t_key: string = this.toasterService.make_toast({
      msg: "Changing password",
      type: "load",
    });

    const params = {
      passwords: this.user_password_set,
    };
    this.cudService.handle("user", "password", params).subscribe((res) => {
      if (res["success"]) {
        setTimeout(() => {
          this.toasterService.amend_toast(t_key, {
            msg: res["msg"],
            type: "success",
          });
          this.ChangePasswordModal.hide();
        }, 1000);
      } else {
        this.toasterService.amend_toast(t_key, {
          msg: res["msg"],
          type: "error",
        });
        this.form_submit_active = false;
      }
    });
  }

  private user_login() {
    this.relogin_submit_active = true;

    this.userService.login_user(this.app_user).subscribe((res) => {
      if (res["success"]) {
        setTimeout(() => {
          this.router.navigate(["/dashboard"]);
        }, 2000);
      } else {
        this.relogin_submit_active = false;
        this.app_user.password = "";
      }
    });
  }

  public user_logout() {
    this.userService.logout_user().subscribe(() => {
      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 500);
    });
  }

  public relogin_submit() {
    // abstract
  }
}
