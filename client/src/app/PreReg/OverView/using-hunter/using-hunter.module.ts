import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsingHunterComponent} from './using-hunter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UsingHunterComponent
  ],
  exports: [
    UsingHunterComponent
  ]
})
export class UsingHunterModule {}
