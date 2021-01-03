import { Component, OnInit } from '@angular/core';
import { CacheService } from '../_services/cache.service';

@Component({
  selector: 'app-splashpage',
  templateUrl: './SplashPage.component.html',
  styleUrls: ['./SplashPage.component.css']
})
export class SplashPageComponent implements OnInit {

  constructor(private cache: CacheService) { }

  ngOnInit() {
    localStorage.clear();
    this.cache.setUserLoginStatus('navVisitor');
  }

}
