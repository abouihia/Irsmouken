import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatProgressSpinnerModule}

  from '@angular/material';
import { MatTableModule,
  MatPaginatorModule} from '@angular/material';








import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({

  imports: [CommonModule,
           MatToolbarModule,
           MatButtonModule,
           MatCardModule,MatInputModule,
           MatProgressSpinnerModule,
           CdkTableModule,
           MatTableModule,
           MatPaginatorModule,
          MatFormFieldModule,MatExpansionModule, BrowserAnimationsModule,NoopAnimationsModule],

  exports: [CommonModule,
            MatToolbarModule,
            MatButtonModule,
            MatCardModule,
            MatInputModule,
            MatProgressSpinnerModule,
            CdkTableModule,
            MatTableModule,
            MatPaginatorModule,
           MatFormFieldModule, MatExpansionModule, BrowserAnimationsModule,NoopAnimationsModule],
  declarations: []
})
export class CustomMaterialModule {




}
