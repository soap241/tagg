import { Component, NgModule, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Location } from '@angular/common';
import { DataService } from '../../../services/data/data.service';
import { CustomerService } from '../../../services/http/customer.http-service';
import { ToasterService } from '../../../services/utility/toaster.utility-service';


export class AppModule { }

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})

export class CreatecustomerComponent implements OnInit {

  createCustomerForm: FormGroup;
 public page_title = '';
  constructor(private fb: FormBuilder, private location: Location,
    private dataService: DataService,
    private customerService: CustomerService, public toasterService:ToasterService

    ) { }
   
  ngOnInit(): void {
this.page_title = Object.keys(this.dataService.customer).length==0?"Create Customer":"Edit Customer";
    this.createCustomerForm = this.fb.group({
      company_name: [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['company_name'], [Validators.required]],
      netsuite_customer_id: [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['netsuite_customer_id'], [Validators.required]],
      email_address: [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['email_address'], [Validators.required]],
      phone:  [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['phone'], [Validators.required]],
      address: [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['address'], [Validators.required]],
      web_address: [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['web_address'], [Validators.required]],
      fax_number:  [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['fax_number'], []],
      alt_phone: [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['alt_phone'], [Validators.required]],
    
      subsidiary: [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['subsidiary'], [Validators.required]],
      customer_details: [Object.keys(this.dataService.customer).length==0?null:this.dataService.customer['customer_details'], []]
    
    })
  }

  get company_name() { return this.createCustomerForm.get('company_name'); }
  get netsuite_customer_id() { return this.createCustomerForm.get('netsuite_customer_id'); }
  get email_address() { return this.createCustomerForm.get('email_address'); }
  get phone() { return this.createCustomerForm.get('phone'); }
  get address() { return this.createCustomerForm.get('address'); }
 

  submitCreate() {
    if(Object.keys(this.dataService.customer).length==0){
      // create customer
      let obj_ = JSON.parse(JSON.stringify(this.createCustomerForm.value));
       this.customerService.create_customer(obj_).subscribe(res=>{
      this.toasterService.make_toast( { msg: res['msg'], type: 'success' },2);
      this.goBack();
      
      this.dataService.customer = {};
    },e=>{console.log(e)})


    }else{
    // edit
    let obj_ = JSON.parse(JSON.stringify(this.createCustomerForm.value));
    obj_.id = this.dataService.customer['id'];
    this.customerService.modify_customer(obj_).subscribe(res=>{
      this.toasterService.make_toast( { msg: res['msg'], type: 'success' },2);
      this.goBack();
      this.dataService.customer = {};
    },e=>{this.toasterService.make_toast({ msg: e['msg'], type: 'error' },2)})
   }
  }
  goBack(): void {
    this.location.back();
  }



//   ngOnInit(): void {}

  
}



