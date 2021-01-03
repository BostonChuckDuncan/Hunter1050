import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ConsultingComponent } from './consulting/consulting.component';
import { SupportComponent } from './support/support.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AboutUsComponent,
    ContactUsComponent,
    ConsultingComponent,
    SupportComponent
  ],
  exports: [
    AboutUsComponent,
    ContactUsComponent,
    ConsultingComponent,
    SupportComponent
  ]
})
export class ContactsModule { }
