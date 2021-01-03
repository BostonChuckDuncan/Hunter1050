import { CacheService } from 'src/app/_services/cache.service';
import { AuthenticateService } from './_services/authenticate.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/Header.component';
import { MaterialModule } from './material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PreRegModule } from './PreReg/prereg.module';
import { CommonModule } from '@angular/common';
import { LogToServerService } from './_services/log-to-server.service';
import { UserNotificationService } from './_services/user-notification.service';
import { UserService } from './_services/user.service';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    PreRegModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/auth'],
      },
    }),
  ],
  providers: [
    AuthenticateService,
    LogToServerService,
    UserNotificationService,
    UserService,
    CacheService
  ],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    PreRegModule
  ]
})
export class AppModule {}
