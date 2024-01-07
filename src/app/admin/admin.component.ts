import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

import { FormGroup,  FormBuilder,  Validators } from '@angular/forms'


import {Contact} from '../contact/contact';
import {ContactService} from '../services/contact.service';
import 'rxjs/add/operator/map';
import {FileUpload} from './FileUpload';
import {UploadImageEventService} from '../services/upload-image-event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent    {

  angForm: FormGroup;
  showMessage :boolean ;
  events: any;
  displayedColumns = ['name','pname','phone','email','adresse1','adresse2','ville','postalCode','textMessage'];
  dataSource = new MatTableDataSource<Contact>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private fb: FormBuilder, private  contactService: ContactService,
              private uploadService: UploadImageEventService) {
    this.createForm();

  }

  createForm() {
    this.angForm = this.fb.group({
      //  date: ['', Validators.required ],
      pImage: ['', Validators.required ]
    });
  }


  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

    this.contactService.getAllContactsList().subscribe(ressources =>{
      this.dataSource.data = ressources;
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  /*************Gestion des images************************/

  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: {percentage: number} = {percentage: 0}
   file : string;

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.file = this.selectedFiles.item(0).name;
  }

  upload() {
    this.currentFileUpload = new FileUpload(this.selectedFiles.item(0));
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
    if(this.progress.percentage === 100){
    this.currentFileUpload = null;
      this.file = '';
    }
    this.uploadService.getImageEvents().subscribe(ressources =>{
     console.log( ressources);
    });
  }


}






