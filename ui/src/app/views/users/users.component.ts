import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { FormControl } from '@angular/forms';

import { _cudService } from '../../services/http/_cud.http-service';
import { ViewService } from '../../services/http/view.http-service';
import { ToasterService } from '../../services/utility/toaster.utility-service';

import { Permission } from '../../models/permission.model';
import { User } from '../../models/user.model';
import { Customer } from '../../models/customer.model'


@Component({
  templateUrl: 'users.component.html',
  selector: 'app-users',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  can_view_users: boolean = false;
  users: User[] = [];
  customers: Customer[] = [];
  name = new FormControl('');

  this_user_id: number;
  perms_focus_user_id: number;

  modules: any[];
  perms_focus_module_id: number = 0;

  can_view_permissions: boolean = false;
  permissions: Permission[] = [];
  permissions_backup: Permission[] = [];

  focus_user: User = {};
  focus_user_index: number = 0;
  focus_username_changed: boolean = false;

  @ViewChild('CreateUserModal') public CreateUserModal: ModalDirective;
  @ViewChild('ModifyUserModal') public ModifyUserModal: ModalDirective;
  @ViewChild('ResetPasswordModal') public ResetPasswordModal: ModalDirective;
  @ViewChild('DeleteUserModal') public DeleteUserModal: ModalDirective;
  form_submit_active: boolean;
  can_save_permissions: boolean;

  constructor(private viewService: ViewService,
    private cudService: _cudService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.load_view();
  }

  load_view() {
    this.viewService.load_view('users').subscribe((res) => {
      console.log(res)
      if (!res['success']) {
        if (res['msg'] != 'handled') {
          this.toasterService.make_toast({ msg: 'Unable to load this view', type: 'error' });
        } return;
      }

      this.can_view_users = res['data']['users']['can_view'];
      if (this.can_view_users) {
        this.users = res['data']['users']['payload'];
        this.customers = res['data']['customers']['payload']
      } else {
        this.toasterService.make_toast({ msg: 'You do not have permission to see users', type: 'info' });
      }

      this.can_view_permissions = res['data']['permissions']['can_view'];
      if (this.can_view_permissions) {
        this.permissions = res['data']['permissions']['payload'];
        this.permissions_backup = JSON.parse(JSON.stringify(this.permissions));
      } else {
        this.toasterService.make_toast({ msg: 'You do not have permission to see permissions', type: 'info' });
      }

      this.modules = res['data']['modules'];

      if (this.can_view_users && this.can_view_permissions) {
        this.this_user_id = res['data']['user'];
        this.perms_focus_user_id = this.this_user_id;
      }
    });
  }

  reload_permissions() {
    let where = { user_id: this.perms_focus_user_id };

    if (this.perms_focus_module_id != 0) {
      where['module_id'] = parseInt(<any>this.perms_focus_module_id);
    }

    this.viewService.load_view('permissions', where).subscribe((res) => {
      if (!res['success']) {
        if (res['msg'] != 'handled') {
          this.toasterService.make_toast({ msg: 'Unable to refresh permissions', type: 'error' });
        } return;
      }

      this.can_view_permissions = res['data']['permissions']['can_view'];
      if (this.can_view_permissions) {
        this.permissions = res['data']['permissions']['payload'];
        this.permissions_backup = JSON.parse(JSON.stringify(this.permissions));
      } else {
        this.toasterService.make_toast({ msg: 'You do not have permission to see permissions', type: 'info' });
      }

      if (this.can_view_users && this.can_view_permissions) {
        this.perms_focus_user_id = res['data']['user'];
      }
    });
  }

  call_new_user_modal() {
    this.focus_user = {};
    this.focus_username_changed = false;
    this.form_submit_active = false;
    this.CreateUserModal.show();
  }

  generate_username() {
    if (this.focus_username_changed) {
      return;
    }
    const f_arr: string[] = this.focus_user.fullname.split(' ');
    this.focus_user.username = '';

    for (var i = 0; i < 2 && i < (f_arr.length - 1); i++) {
      this.focus_user.username += f_arr[i][0].toLowerCase();
    }

    this.focus_user.username += f_arr[f_arr.length - 1].toLowerCase();
  }

  create_user() {
    const t_key: string = this.toasterService.make_toast({ msg: 'Creating new user', type: 'load' }, 0);
    this.form_submit_active = true;

    const params = {
      'user_data': this.focus_user
    };
    this.cudService.handle('user', 'create', params).subscribe((res) => {
      if (res['success']) {
        setTimeout(() => {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'success' });
          this.CreateUserModal.hide();
          this.users.push(res['data']['new_user']);
        }, 500);
      } else {
        if (res['msg'] != 'handled') {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'error' });
        } else {
          this.toasterService.trigger_pop_toast(t_key);
        }
      }
    });
  }

  call_edit_user_modal(i: number) {
    this.focus_user = Object.assign({}, this.users[i]);
    this.focus_user_index = i;
    this.form_submit_active = false;
    this.ModifyUserModal.show();
  }

  edit_user() {
    const t_key: string = this.toasterService.make_toast({ msg: 'Modifying user information', type: 'load' }, 0);
    this.form_submit_active = true;

    const mod_keys: string[] = ['fullname', 'username', 'can_login'];

    let m: number = 0;
    mod_keys.forEach(k => {
      if (this.focus_user[k] !== this.users[this.focus_user_index][k]) {
        m++;
      }
    });

    if (m == 0) {
      this.toasterService.amend_toast(t_key, { msg: 'No changes made', type: 'info' });
      return;
    }

    const params = {
      'user_data': this.focus_user
    };
    this.cudService.handle('user', 'modify', params).subscribe((res) => {
      if (res['success']) {
        setTimeout(() => {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'success' });
          this.ModifyUserModal.hide();
          this.users[this.focus_user_index] = { ...this.users[this.focus_user_index], ...res['data']['edited_user'] };
        }, 500);
      } else {
        if (res['msg'] != 'handled') {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'error' });
        } else {
          this.toasterService.trigger_pop_toast(t_key);
        }
      }
    });
  }

  call_reset_password_modal() {
    this.ModifyUserModal.hide();
    this.form_submit_active = false;
    setTimeout(() => {
      this.ResetPasswordModal.show();
    }, 200);
  }

  reset_user_password() {
    const t_key: string = this.toasterService.make_toast({ msg: 'Resetting user password', type: 'load' }, 0);
    this.form_submit_active = true;

    const params = {
      'user_data': this.focus_user
    };
    this.cudService.handle('user', 'reset', params).subscribe((res) => {
      if (res['success']) {
        setTimeout(() => {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'success' }, 0);
          this.ResetPasswordModal.hide();
        }, 500);
      } else {
        if (res['msg'] != 'handled') {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'error' });
        } else {
          this.toasterService.trigger_pop_toast(t_key);
        }
      }
    });
  }

  call_delete_user_modal(i: number) {
    this.focus_user = Object.assign({}, this.users[i]);
    this.focus_user_index = i;
    this.form_submit_active = false;
    this.DeleteUserModal.show();
  }

  delete_user() {
    const t_key: string = this.toasterService.make_toast({ msg: 'Deleting user', type: 'load' }, 0);
    this.form_submit_active = true;

    const params = {
      'user_data': this.focus_user
    };
    this.cudService.handle('user', 'delete', params).subscribe((res) => {
      if (res['success']) {
        setTimeout(() => {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'success' });
          this.DeleteUserModal.hide();
          this.users.splice(this.focus_user_index, 1);
        }, 500);
      } else {
        if (res['msg'] != 'handled') {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'error' });
        } else {
          this.toasterService.trigger_pop_toast(t_key);
        }
      }
    });
  }

  check_permissions() {
    this.can_save_permissions = false;
    for (var i = 0; i < this.permissions.length; i++) {
      if (this.permissions[i].has_perm !== this.permissions_backup[i].has_perm) {
        this.can_save_permissions = true;
        return;
      }
    }
  }

  reset_permissions() {
    this.can_save_permissions = false;
    this.permissions = JSON.parse(JSON.stringify(this.permissions_backup));
  }

  change_permissions() {
    const t_key: string = this.toasterService.make_toast({ msg: 'Modifying user permissions', type: 'load' }, 0);
    this.form_submit_active = true;

    const params = {
      'current_permissions': this.permissions,
      'previous_permissions': this.permissions_backup,
      'user_id': this.perms_focus_user_id
    };
    this.cudService.handle('permission', 'modify', params).subscribe((res) => {
      if (res['success']) {
        setTimeout(() => {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'success' });
          this.permissions_backup = JSON.parse(JSON.stringify(this.permissions));
          this.can_save_permissions = false;
          this.form_submit_active = false;
        }, 500);
      } else {
        if (res['msg'] != 'handled') {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'error' });
        } else {
          this.toasterService.trigger_pop_toast(t_key);
        }
        this.form_submit_active = false;
      }
    });
  }

  format_2dp(v: any): any {
    return (parseFloat(v)).toFixed(2);
  }
}