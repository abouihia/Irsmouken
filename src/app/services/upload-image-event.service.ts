import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';

import{FileUpload} from '../admin/FileUpload'
import {Contact} from '../contact/contact';


@Injectable()
export class UploadImageEventService {

  private basePath = '/uploads';

  contactsRef: FirebaseListObservable<Contact[]> = null;

  constructor(private db: AngularFireDatabase) {
    this.contactsRef = db.list(`${this.basePath}/`);
  }



  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL
        fileUpload.name = fileUpload.file.name
        this.saveFileData(fileUpload)
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.contactsRef.push(fileUpload);
  }


  getImageEvents(): FirebaseListObservable<Contact[]> {
    return this.contactsRef;
  }


}
