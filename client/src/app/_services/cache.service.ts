import { Injectable } from '@angular/core';
import { User } from '../Model/User';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CacheService {

  constructor(private http: HttpClient, private route: Router, private jwtHelper: JwtHelperService) {
    if (localStorage.getItem("baseUrl") === null) {
      localStorage.setItem("baseUrl", 'http://localhost:5000/api');
    }
  }
  baseUrlauth = 'http://localhost:5000/api/auth/';

  cacheUser(userName: string) {
    const sql = this.baseUrlauth + `user/${userName}`;
    return this.http.get<User>(sql);
  }

  setIsUserAdmin() {
    const jsonUser = localStorage.getItem('user');
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      const status = user.systemAdmin === true ? 'navAdmin' : 'navUser';
      this.setUserLoginStatus(status);
      return user.systemAdmin;
    } else {
      return false;
    }
  }

  setUserLoginStatus(status: string) {
    this.StorageSetBool('navUser', false);
    this.StorageSetBool('navVisitor', false);
    this.StorageSetBool('navAdmin', false);

    switch (status.toLowerCase()) {
      case 'navuser':
        this.StorageSetBool('navUser', true);
        break;
      case 'navvisitor':
        this.StorageSetBool('navVisitor', true);
        break;
      case 'navadmin':
        this.StorageSetBool('navAdmin', true);
        break;
      case 'none':
        break;
    }
  }

  getUserLoginStatus() {
    if (this.StorageGetBool('navUser') === true) {
      return 'navUser';
    } else {
      if (this.StorageGetBool('navVisitor') ===  true) {
        return 'navVisitor';
      } else {
        if (this.StorageGetBool('navAdmin') === true) {
        return 'navAdmin';
        } else {
          return 'none';
        }
      }
    }
  }

  loggedIn() {
    const token = this.StorageGet('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  loggedOut() {
    localStorage.clear();
    this.setUserLoginStatus('navVisitor');
    this.route.navigate(['/splashPage']);
  }

  StorageSet(key: string, value: string) {
    // storage values must be strings
    localStorage.setItem(key, value); // store the value as a string
  }
  StorageSetBool(key: string, value: boolean) {
    // storage values must be strings
    const storeValue = value ? 'true' : 'false';
    localStorage.setItem(key, storeValue); // store the value as a string
    return value; // return the original value
  }
  StorageSetNumber(key: string, value: number) {
    const szNumber = value.toString();
    localStorage.setItem(key, szNumber);
  }

  StorageGet(key: string) {
    const result = localStorage.getItem(key);
    return result;
  }
  StorageGetBool(key: string) {
    const result = localStorage.getItem(key);
    const retVal = result === 'true' ? true : false;
    return retVal;
  }
  StorageGetNumber(key: string) {
    const num = localStorage.getItem(key);
    const szNum = num.toString();
    return szNum;
  }

  StorageDelete(key: string) {
    localStorage.removeItem(key);
  }

  StorageClear() {
    localStorage.clear();
  }
}
