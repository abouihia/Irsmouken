import { Component, OnInit } from '@angular/core';

import { Validators,FormGroup,  FormBuilder} from '@angular/forms';

import { ContactService } from '../services/contact.service';
import {Contact} from './contact';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  angForm: FormGroup;
   showMessage :boolean ;
  contact : Contact;

  constructor(private contactService: ContactService, private fb: FormBuilder ) {
    this.createForm();
  }

  ngOnInit() {
    console.log(this.angForm.invalid);
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      pname: ['', Validators.required ],
      phone: ['', Validators.required ],
      email: ['', [Validators.required,Validators.email ] ],
      adresse1: ['', Validators.required ],
      adresse2: ['', Validators.required ],
      ville: ['', Validators.required ],
      postalCode: ['', Validators.required ],
      textMessage: ['', Validators.required ]
    });
  }




  addContact(name, pname, phone, email,adresse1, adresse2, ville, postalCode, textMessage) {

        this.contact  =new Contact(name,pname,phone,email,adresse1,adresse2,ville,postalCode, textMessage);
        /*this.contact.name  = name;
        this.contact.pname =pname;
        this.contact.phone =phone;
        this.contact.email =email;
        this.contact.adresse1 =adresse1;
        this.contact.adresse2 =adresse2;
        this.contact.ville =ville;
        this.contact.postalCode =postalCode;
        this.contact.textMessage =textMessage;*/


    this.contactService.addContact(this.contact);
      this.angForm.reset();
      this.showMessage = true;
      setInterval(() =>{ this.showMessage = false;}, 5000);

  }


  get nameForm(){
   return this.angForm.controls['name'];
  }
  get pnameForm(){
    return this.angForm.controls['pname'];
  }
  get phoneForm(){
    return this.angForm.controls['phone'];
  }
  get emailForm(){
    return this.angForm.controls['email'];
  }
  get adresse1Form(){
    return this.angForm.controls['adresse1'];
  }
  get adresse2Form(){
    return this.angForm.controls['adresse2'];
  }
  get villeForm(){
    return this.angForm.controls['ville'];
  }
  get postalCodeForm(){
    return this.angForm.controls['postalCode'];
  }
  get textMessageForm(){
    return this.angForm.controls['textMessage'];
  }


   getFormInput(input){
     return this.angForm.controls[input];
  }
}



