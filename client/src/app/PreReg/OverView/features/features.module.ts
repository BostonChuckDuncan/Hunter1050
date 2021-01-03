import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeaturesComponent} from './features.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FeaturesComponent
  ],
  exports: [
    FeaturesComponent
  ]
})
export class FeaturesModule {}
