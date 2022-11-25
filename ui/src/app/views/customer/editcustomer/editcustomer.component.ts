
import { Component, NgModule, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Location } from '@angular/common';


export class AppModule { }

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})

export class editcustomerComponent implements OnInit {
  [x: string]: any;

  editCustomerForm: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) { }

  ngOnInit(): void {

    this.editCustomerForm = this.fb.group({
      company_name: [null, [Validators.required]],
      netsuite_customer_id: [null, [Validators.required]],
      email_address: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      web_address: [null, [Validators.required]],
      fax_number: [null, [Validators.required]],
      alt_phone: [null, [Validators.required]],
      subsidiary: [null, [Validators.required]],
      customer_details: [null, [Validators.required]]
    })
  }

  get company_name() { return this.editCustomerForm.get('company_name'); }
  get netsuite_customer_id() { return this.editCustomerForm.get('netsuite_customer_id'); }
  get email_address() { return this.editCustomerForm.get('email_address'); }
  get phone() { return this.editCustomerForm.get('phone'); }
  get address() { return this.editCustomerForm.get('address'); }
 

  submitedit() {

  }
  goBack(): void {
    this.location.back();
  }



//   ngOnInit(): void {}

  
}
