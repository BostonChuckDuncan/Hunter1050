import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashPageComponent } from './SplashPage.component';
import { HeaderComponent } from '../Header/Header.component';
// import { ValueComponent } from '../value/value.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HeaderComponent,
    SplashPageComponent,
//    ValueComponent
  ]
})
export class SplashPageModule { }
