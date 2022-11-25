import { Component,ViewChild, OnInit, } from '@angular/core';
import { ViewService } from '../../../services/http/view.http-service'
import { _cudService } from '../../../services/http/_cud.http-service'
import { Customer } from '../../../models/customer.model'
import { ToasterService } from '../../../services/utility/toaster.utility-service';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { DataService } from '../../../services/data/data.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  customers: Customer[] = [];
  createCustomerForm: FormGroup;
  
  focus_customer: Customer = {};




  @ViewChild('CreateCustomerModal') public CreateCustomerModal: ModalDirective;
  @ViewChild('EditCustomerModal') public EditCustomerModal: ModalDirective;
  @ViewChild('DeleteCustomerModal') public DeleteCustomerModal: ModalDirective;
  form_submit_active: boolean;
  can_save_permissions: boolean;
  can_view_customers: any;

  


  constructor(private view_service: ViewService, 
    private toasterService: ToasterService,
    private customerService: _cudService, 
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
    ) { }
    

 ngOnInit(): void {
   this.loadView();
   this.createCustomerForm = this.fb.group({
     company_name: [null, [Validators.required]],
     netsuite_customer_id: [null, [Validators.required]],
     email_address: [null, [Validators.email, Validators.required]],
     phone: [null, [Validators.required]],
     address: [null, [Validators.required]],
     web_address: [null],
     fax_number: [null],
     alt_phone: [null]

   })
 }

 get company_name() { return this.createCustomerForm.get('company_name'); }
 get netsuite_customer_id() { return this.createCustomerForm.get('netsuite_customer_id'); }
 get email_address() { return this.createCustomerForm.get('email_address'); }
 get phone() { return this.createCustomerForm.get('phone'); }
 get address() { return this.createCustomerForm.get('address'); }

 loadView() {
  this.view_service.load_view('customers').subscribe((res) => {
    if (!res['success']) {
      if (res['msg'] != 'handled') {
        this.toasterService.make_toast({ msg: 'Unable to load this view', type: 'error' });
      } return;
    }

    console.log('customer response data ....',res);

    this.customers = res['data']['customers']['payload'];

    // this.can_view_customers = res['data']['customer']['can_view'];
    // if (this.can_view_customers) {
    //   this.customers = res['data']['customer']['payload'];
    // } else {
    //   this.toasterService.make_toast({ msg: 'You do not have permission to see users', type: 'info' });
    // }

    // this.can_view_permissions = res['data']['permissions']['can_view'];
    // if (this.can_view_permissions) {
    //   this.permissions = res['data']['permissions']['payload'];
    //   this.permissions_backup = JSON.parse(JSON.stringify(this.permissions));
    // } else {
    //   this.toasterService.make_toast({ msg: 'You do not have permission to see permissions', type: 'info' });
    // }

    // this.modules = res['data']['modules'];

    // if (this.can_view_users && this.can_view_permissions) {
    //   this.this_user_id = res['data']['user'];
    //   this.perms_focus_user_id = this.this_user_id;
    // }
  });
 }
 call_new_customer_modal(){ this.focus_customer = {};
 
//  this.form_submit_active = false;
 this.CreateCustomerModal.show();

 }

call_edit_customer(i: number){ 

  this.focus_customer = Object.assign({}, this.customers[i]);
   // this.focus_user_index = i;
    this.form_submit_active = false;

//  this.form_submit_active = false;
// this.EditCustomerModal.show();
}
call_delete_customer_modal(){ this.focus_customer = {};

//  this.form_submit_active = false;
this.DeleteCustomerModal.show();

}

submitCreate() {
  console.log(this.createCustomerForm.value)

  const t_key: string = this.toasterService.make_toast({ msg: 'Adding new customer account', type: 'load' }, 0);

  for (const i in this.createCustomerForm.controls) {
    this.createCustomerForm.controls[i].markAsDirty();
    this.createCustomerForm.controls[i].updateValueAndValidity();
  }
  
  // save the record to our service
   this.customerService.handle('customer', 'create', {'customer_data': this.createCustomerForm.value})
     .subscribe((res) => {

      if (res['success']) {
        setTimeout(() => {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'success' });
          this.createCustomerForm.reset()
          this.CreateCustomerModal.hide()
         // this.customers.push(res['data']['n']);

         this.loadView()
        }, 500);
      } else {
        if (res['msg'] != 'handled') {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'error' });
        } else {
          this.toasterService.trigger_pop_toast(t_key);
        }
      }

     })

   
}

  submitEdit() {
    const t_key: string = this.toasterService.make_toast({ msg: 'Modifying user information', type: 'load' }, 0);

    const params = {
      'customer_data': this.focus_customer
    };

    this.customerService.handle('customer', 'edit', params).subscribe((res) => {

       if(res['success']) {

        this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'success' });
        this.EditCustomerModal.hide()
        
      //  setTimeout(() => {
          this.loadView()
       // }, 2000)

       } else {

        if (res['msg'] != 'handled') {
          this.toasterService.amend_toast(t_key, { msg: res['msg'], type: 'error' });
        } else {
          this.toasterService.trigger_pop_toast(t_key);
        }

       }

    })
    
  }

  gotoCreateCustomer(u={}) {
    console.log(u)
    this.dataService.customer=u;
   this.router.navigate(['customers','create-customer']);
  }


}
