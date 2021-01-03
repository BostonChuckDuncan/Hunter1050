import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap';
import { AlertModule} from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserAdminComponent } from './administer-Users/user-admin.component';

import { ProjectLearningComponent } from './ProjectLearning/ProjectLearning.component';
import { ProjectProfilesComponent } from './projectProfiles/projectProfiles.component';
import { RouterModule } from '@angular/router';

@NgModule({
   declarations: [
      UserAdminComponent,
      ProjectLearningComponent,
      ProjectProfilesComponent
   ],
   imports: [
      CommonModule,
      AlertModule,
      BrowserModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      AccordionModule
   ],
   exports: [
      UserAdminComponent,
      ProjectLearningComponent,
      ProjectProfilesComponent
   ]
})
export class AdminModule { }
