import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap';
import { AlertModule} from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
   declarations: [

   ],
   imports: [
    CommonModule,
    AlertModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule
   ],
   exports: [

   ]
})
export class ResearcherModule { }
