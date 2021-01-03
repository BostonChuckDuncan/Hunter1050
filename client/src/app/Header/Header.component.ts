import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../_services/authenticate.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CacheService } from '../_services/cache.service';
import { LogToServerService } from '../_services/log-to-server.service';
import { UserNotificationService } from '../_services/user-notification.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css'],
})
export class HeaderComponent implements OnInit {
  model: any = {};
  welcomeName = '';
  loginForm: FormGroup;
  logoutForm: FormGroup;
  messageText = '';

  userLoggedIn: boolean;
  userNameInput: string;
  userPasswordInput: string;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    public cache: CacheService,
    private ngLog: LogToServerService,
    private notify: UserNotificationService,
  ) {}

  ngOnInit() {
    this.userLoggedIn = false;
    this.userNameInput = 'X';
    this.userPasswordInput = 'Y';
    
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
    this.logoutForm = this.fb.group({});

    if (this.cache.getUserLoginStatus() === 'none') {
      this.cache.setUserLoginStatus('navVisitor');
    }

    this.loginForm.patchValue({ username: '' });
    this.loginForm.patchValue({ password: '' });
    const us = this.loginForm.get('username').value;
    const pa = this.loginForm.get('password').value;

    this.notify.messenger.subscribe((msg) => {
      this.messageText = msg;
      // setTimeout( () => { this.messageText = ''; }, 5);
    });
  }

  get f() { return this.loginForm.controls; }

  async login() {
    this.ngLog.addLogMsg('nav.component:65 async login() entered');
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    const model = { Username: username, Password: password };
    this.ngLog.addLogMsg(`nav/login:69 username ${username} password ${password}`);

    // Installation mode: no username or password when login button pressed
    if (username === '' && password === '') {
      // check number of users in db; there MUST be zero for us to add an administrator
      const areDbUsers = await this.authService.checkAnyUsers();
      if (!areDbUsers) {    // No users yet; the first user after installation will be Admin
        this.ngLog.addLogMsg('nav/login:76 creating Admin User account');
        model.Username = 'Admin';
        model.Password = 'TooManySecrets';  // they are expected to change their password
        this.authService.registerAdmin(model)
          .subscribe(() => {
            console.log('Admin created');
            this.notify.postMessage('Installed Admin; please change password', 4);
            this.cache.setUserLoginStatus('navVisitor');  // was registered - not logged in
            this.router.navigate(['/home']);
          },
            (error) => {
              console.log(error);
              this.cache.setUserLoginStatus('navVisitor');
              this.notify.postMessage('Admin product installation setup failed.', 7);
              this.ngLog.addLogMsg(`Error creating intial user: ${error}`);
            });  // end of registerAdmin subscribe
      } // end of this is the first user
      else {  // can't add another admin this way
        this.notify.postMessage('Cannot add more administrators this way');
      }
    } // end of username and password are both empty
    else { // normal user/password login
      this.authService.login(model).subscribe(next => {
        if (this.cache.StorageGet('token') === null || this.cache.StorageGet('token').length <= 0) { // false means the login failed
          this.notify.postMessage('Unable to log this user in');
        } else { // login was successful
          this.notify.postMessage('Logged in Successfully', 3);
          this.ngLog.addLogMsg('Logged in Successfully');
          this.cache.setUserLoginStatus('navUser');
          this.cache.StorageSet('username', model.Username);
          this.cache.cacheUser(model.Username).subscribe((user) => {  // cacheuser.subscribe
            this.cache.StorageSet('user', JSON.stringify(user));
            this.cache.setIsUserAdmin();
            if (user.knownAs && user.knownAs.length > 0) {
              const name = user.knownAs;
              this.cache.StorageSet('welcomeName', name);
              this.welcomeName = name;
            } else {
              this.cache.StorageSet('welcomeName', '');
            }
            this.ngLog.addLogMsg('splash page login router navigate to /research');
            this.router.navigate(['/research']);
          }  // end of cacheUser next
          ); // end of cacheUser subscribe
        } // end of else where login was successful
      }, // end of authService.login subscribe next
        error => {  // authService Login error (in subscribe)
          this.ngLog.addLogMsg(`nav/Login:123 normal login error: ${error}`);
          this.notify.postMessage('Server reported error: ' + error, 9);
          this.cache.loggedOut();
        } // end of authService Login subscribe error
      ); // end of .login.subscribe
    } // end of 'else' for normal user/password login
  }

  loggedIn() {
    this.cache.setUserLoginStatus('navUser');
    return true;
  }

  logout() {
    this.ngLog.addLogMsg('nav.component:99 logout() entered');
    this.cache.loggedOut();
    this.cache.setUserLoginStatus('navVisitor');
    this.notify.postMessage('logged out', 3);
    this.router.navigate(['/splashPage']);
  }

  gotoResearch() {
    this.ngLog.addLogMsg('nav.component route.navigate to research');
    this.router.navigate(['research']);
  }

  setWelcomeName() {
    this.welcomeName = '';
  }

  gotoHomePage() {
    this.router.navigate(['/']);
  }

  gotoLogout() {
    this.cache.loggedOut();
    this.authService.logOut();
    this.notify.postMessage("User Logged Out", 4);
    this.router.navigate([""]);
  }

}
