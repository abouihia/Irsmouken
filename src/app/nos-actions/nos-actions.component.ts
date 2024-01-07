import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ContactService} from '../services/contact.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-nos-actions',
  templateUrl: './nos-actions.component.html',
  styleUrls: ['./nos-actions.component.css']
})
export class NosActionsComponent implements OnInit {

  contacts: any;

  constructor(private http: HttpClient, private service: ContactService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
       this.contacts =  this.service.getAllContactsList().map(changes => {
         return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
       }).subscribe(contacts  => {
          this.contacts  = contacts;
          console.log(this.contacts );
       } )
  }



}
