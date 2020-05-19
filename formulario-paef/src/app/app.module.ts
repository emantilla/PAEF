import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {
  MatCardModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
  MatInputModule, MatPaginatorModule, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { FormularioPaefComponent } from './components/fomulario-paef/formulario-paef.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioPaefComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    SweetAlert2Module
  ],
  providers: [
    MatDatepickerModule,
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
