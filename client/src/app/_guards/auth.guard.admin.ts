import { AuthenticateService } from 'src/app/_services/authenticate.service';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserNotificationService } from '../_services/user-notification.service';
import { CacheService } from '../_services/cache.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

// tslint:disable-next-line:align
  constructor(private authService: AuthenticateService,
                private router: Router,
                private notify: UserNotificationService,
                private cache: CacheService) { }

    canActivate(): boolean  {
      if ((this.cache.StorageGet('token') !== null) &&
          this.cache.StorageGetBool('navAdmin') === true) {
        return true;
      }

      this.notify.postMessage('Administrators and Logged In Users Only', 7);
      this.router.navigate(['/splashPage']);
      return false;
    }
}
