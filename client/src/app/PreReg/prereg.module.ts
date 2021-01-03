import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { OverviewModule } from './OverView/overview.module';
import { RouterModule } from '@angular/router';
import {GuidesModule} from './Guides/guides.module';
import {ContactsModule} from './Contacts/contacts.module';
import {OverviewModule} from './OverView/Overview.Module';

@NgModule({
  imports: [
    CommonModule,
    OverviewModule,
    GuidesModule,
    RouterModule,
    ContactsModule
  ],
  exports: [
    OverviewModule,
    GuidesModule,
    ContactsModule,
  ]
})
export class PreRegModule { }
