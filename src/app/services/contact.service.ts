
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


import {Contact} from '../contact/contact';


@Injectable()
export class ContactService {


  contactsRef: FirebaseListObservable<Contact[]> = null;

  private basePath: string ='/Contacts'

  constructor(private   http: HttpClient, public db: AngularFireDatabase) {
    this.contactsRef = db.list(this.basePath);
  }




  addContact(contact : Contact) {
    //insert in the Collection : Contacts   key user with this contact
    this.contactsRef.push(contact);
  }
  updateCustomer(key: string, value: any): void {
    this.contactsRef.update(key, value).catch(error => this.handleError(error));
  }


  getAllContactsList(): FirebaseListObservable<Contact[]> {
      return this.contactsRef;
  }

  deleteAllContacts(): void {
    this.contactsRef.remove().catch(error => this.handleError(error));
  }

  deleteContacts(key: string): void {
    this.contactsRef.remove(key).catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
