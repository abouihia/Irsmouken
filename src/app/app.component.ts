import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements  OnInit{


  constructor(public authService: AuthService) {}

  logout() {
    this.authService.signOut();
  }

    ngOnInit(){
      $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });

      $('li > a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
      });

    }
}
