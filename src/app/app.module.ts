import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { NosActionsComponent } from './nos-actions/nos-actions.component';
import {ContactService} from "./services/contact.service";
import { VideoComponent } from './video/video.component';
import { AdminComponent } from './admin/admin.component';

/*
  router concept in Angular
  1-first step
 */
import { EventComponent } from './event/event.component';
import { AlbumPhotoComponent } from './album-photo/album-photo.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { AlbumPhoto2012Component } from './album-photo-2012/album-photo-2012.component';
import {NgbdModalBasic} from './modal-basic';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

// authentification
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './services/auth.service';
import {MatFileUploadModule} from 'angular-material-fileupload';
import {CustomMaterialModule} from './angluar-material/custom-material.module';
import {UploadImageEventService} from './services/upload-image-event.service';


const routes: Routes = [
  { path: 'Accueil', component: AccueilComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Actualite', component: ActualiteComponent },
  { path: 'NosActions', component: NosActionsComponent },
  { path: 'Event', component: EventComponent },
  { path: 'AlbumPhoto', component: AlbumPhotoComponent },
  { path: 'AlbumPhoto2012', component: AlbumPhoto2012Component },
  { path: 'Videos', component: VideoComponent },
  { path: 'SingUp', component: SingUpComponent },
  { path: 'Admin', component: AdminComponent },
  { path: '', redirectTo: '/Accueil', pathMatch: 'full'}

];


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ContactComponent,
    ActualiteComponent,
    NosActionsComponent,
    EventComponent,
    AlbumPhotoComponent,
    SingUpComponent,
    AlbumPhoto2012Component,
    NgbdModalBasic,
    VideoComponent,
    AdminComponent,
  ],
  imports: [
    MatFileUploadModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    AngularFireAuthModule, // for authentification
    CustomMaterialModule,
  ],
  providers: [ContactService, AuthService,UploadImageEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
