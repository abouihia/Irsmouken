import { Component, OnInit } from '@angular/core';
import {UploadImageEventService} from '../services/upload-image-event.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  images : any;


  text:any = {
    Year: 'Annee',
    Month: 'Mois',
    Weeks: "Semaine",
    Days: "Jours",
    Hours: "Heurs",
    Minutes: "Minutes",
    Seconds: "Seconds",
    MilliSeconds: "MilliSeconds"
  };

  distance: number ;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  interval: number;

  constructor(private uploadService: UploadImageEventService) {
  }

  ngOnInit() {
   const interval = setInterval(() =>{

  this.distance = new Date('Jul 12, 2018 00:00:00').getTime() - Date.now();
  this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
  this.hours = Math.floor ((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
  this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

  // Si le compteur arrive à la fin
  if (this.distance < 0) {
    clearInterval(interval)
    document.getElementById('demo').innerHTML = "EXPIRED";
    }
  },1000 );

    this.uploadService.getImageEvents().subscribe(ressources =>{
      this.images =ressources;
    });
  }


}
