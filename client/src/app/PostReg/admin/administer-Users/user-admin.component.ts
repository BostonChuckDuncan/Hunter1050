import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, HostListener, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User, UserShortModel } from '../../../Model/User';
import { AuthenticateService } from 'src/app/_services/authenticate.service';
import { Router } from '@angular/router';
import { LogToServerService } from 'src/app/_services/log-to-server.service';
import { CacheService } from 'src/app/_services/cache.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/_services/user.service';

export class UsersInfo {
  userNames: string[] = [];
}

@Component({
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAdminComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  userFirstNamePattern: string;
  userLastNamePattern: string;
  usPhonePattern: string;
  knownAsPattern: string;
  emailPattern: string;
  companyPattern: string;
  cityPattern: string;
  statePattern: string;
  countryPattern: string;
  zipUsCanadaPattern: string;
  booleanPattern: string;
  csvPattern: string;
  mmyyPattern: string;
  mmddyyyyPattern: string;

  userNameSelected: boolean;
  saveButtonText = 'Save';

  userNames: string[] = [];
  model = { firstName: '', lastName: '', phone1: '', phone2: '',
            knownAs: '', emailAddress: '', userName: '', password: '',
            question: '', answer: '', projectAdmin: 0, systemAdmin: false };
  shortModel: UserShortModel;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.registrationForm && this.registrationForm.dirty) {
      $event.returnValue = true;
    }
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('user-admin destroyed');
  }

  constructor(private fb: FormBuilder,
              private authService: AuthenticateService,
              private userService: UserService,
              private cd: ChangeDetectorRef,
              public route: Router,
              public ngLog: LogToServerService,
              public cache: CacheService,
              public http: HttpClient) { }

  ngOnInit() {
    // const store = [];
    // const keys = Object.keys(localStorage);
    // let i = keys.length;

    // while (i--) {
    //   const content = localStorage.getItem(keys[i]);
    //   store.push(`key = ${keys[i]}  content = ${store[i]}`);
    // }

    this.userNameSelected = false;

    this.ngLog.addLogMsg('Entering user-admin.component:47 (ngOnInit)');
    this.userService.getAllUserNames().subscribe( (response) => {
      this.userNames = response;
    },
    (error) => {
      console.log(error);
    });

    this.userFirstNamePattern = '^[a-zA-Z]{3,20}$';
    this.userLastNamePattern =  '^[a-zA-Z]{3,30}$';
    this.usPhonePattern =  '^(([(]?[0-9]{3}[)]?)|[0-9]{3})[ -.]?[0-9]{3}[ -.]?[0-9]{4}$';
    this.knownAsPattern = '^[a-zA-Z0-9 ]{3,20}$';
    this.emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$';
    this.booleanPattern = '^([Tt]{1,1}.*)|([Ff]{1,1}.*)|([Yy]{1,1}.*)|([Nn]{1,1}.*)$';
    this.mmyyPattern = '^(0[1-9]{1})|(1[012]{1})\/([1-9][0-9])$';
    this.csvPattern = '[0-9]{3}';
    this.mmddyyyyPattern = '^(0[1-9]{1})|(1[012]{1})\/([1-9]{1,}|[12]{1,}[0-9]{0,1}|3[01]{1,})\/([12]{1,}[0-9]{3}|[0-9]{2,})$';

    this.registrationForm = this.fb.group({
      FirstName:		['', [Validators.required, Validators.pattern(this.userFirstNamePattern)]],
      LastName:		  ['', [Validators.required, Validators.pattern(this.userLastNamePattern)]],
      Phone1:		    ['', [Validators.pattern(this.usPhonePattern)]],
      Phone2:		    ['', [Validators.pattern(this.usPhonePattern)]],
      KnownAs:      ['', [Validators.pattern(this.knownAsPattern)]],
      EmailAddress:	['', [Validators.pattern(this.emailPattern)]],
      Username:		  ['', [Validators.required]],
      Password:	    ['', [Validators.required, Validators.minLength(8)]],
      Confirm:	    ['', [Validators.required]],
      Question:	    ['', [Validators.required]],
      Answer:		    ['', [Validators.required]],
      isAdmin:		  ['false', [Validators.required, Validators.pattern(this.booleanPattern)]]
    }, this.passwordMatchValidator);

    this.cd.markForCheck();
    setTimeout( () => {
      this.cd.detectChanges(); },
      500
    );

    const token = this.cache.StorageGet('token');
    const userStat = this.cache.getUserLoginStatus();
  }

  get f() { return this.registrationForm.controls; }

  onNgDestroy() {

  }

  clearFields() {
    this.f.FirstName.setValue('');
    this.f.LastName.setValue('');
    this.f.Phone1.setValue('');
    this.f.Phone2.setValue('');
    this.f.KnownAs.setValue('');
    this.f.EmailAddress.setValue('');
    this.f.Username.setValue('');
    this.f.Password.setValue('');
    this.f.Confirm.setValue('');
    this.f.Question.setValue('');
    this.f.Answer.setValue('');
    this.f.isAdmin.setValue(false);
  }

  submitRegistration() {   ///////// either new or updated
    // the name on the Save/Update button determines if this is a Registration or Put
    this.model.firstName = this.f.FirstName.value;
    this.model.lastName = this.f.LastName.value;
    this.model.phone1 = this.f.Phone1.value;
    this.model.phone2 = this.f.Phone2.value;
    this.model.knownAs = this.f.KnownAs.value;
    this.model.emailAddress = this.f.EmailAddress.value;
    this.model.userName = this.f.Username.value;
    this.model.password = this.f.Password.value;
    this.model.question = this.f.Question.value;
    this.model.answer = this.f.Answer.value;
    this.model.projectAdmin = 0;
    this.model.systemAdmin = this.f.isAdmin.value;

    if (this.saveButtonText === 'Update') {  ///////////////////// UPDATE
      this.shortModel = new UserShortModel();
      this.shortModel.firstName = this.model.firstName;
      this.shortModel.lastName = this.model.lastName;
      this.shortModel.phone1 = this.model.phone1;
      this.shortModel.phone2 = this.model.phone2;
      this.shortModel.knownAs = this.model.knownAs;
      this.shortModel.emailAddress = this.model.emailAddress;
      this.shortModel.userName = this.model.userName;
      this.shortModel.password = this.model.password;
      this.shortModel.question = this.model.question;
      this.shortModel.answer = this.model.answer;
      this.shortModel.systemAdmin = this.model.systemAdmin;

      this.ngLog.addLogMsg(`submitRegistration:138 UPDATE new ${this.model.firstName} ${this.model.lastName}`);
      this.userService.updateUser(this.shortModel).subscribe( () => {
        this.clearFields();
        this.saveButtonText = 'Save';
        this.ngLog.addLogMsg(`submitRegistration:142 user has been updated: ${this.model.userName} `);
      },
      (error) => {
        console.log(error);
        this.ngLog.addLogMsg(`SubmitRegistration:146 error during update. userName = ${this.model.userName} error = ${error}`);
      });
    } else {  // new registration ///////////////////////////////// SAVE
      this.ngLog.addLogMsg(`submitRegistration:165 SAVE new ${this.model.firstName} ${this.model.lastName}`);
      this.authService.register(this.model).subscribe( () => {
        console.log('registration successful');
        this.ngLog.addLogMsg(`submitRegistration:126 successful: ${this.model.firstName}`);
        this.clearFields();
        this.userNameSelected = false;

        this.userService.getAllUserNames().subscribe( (results) => {
          this.userNames = results;
          this.clearFields();
          this.cd.markForCheck();
          });
      },
      (error) => {
        console.log(error);
        this.ngLog.addLogMsg(`submitRegistration:181 error: ${error}`);
      });
    }
  }

  passwordMatchValidator( g: FormGroup ) {
    return this.f.Password.value === this.f.ConfirmPassword.value ? null : { mismatch: true };
  }

  selectUserName(selectedName: string) {
    this.cache.StorageSet('selectedUserName', selectedName);
    this.userNameSelected = true;
    if ( selectedName === 'add new user') {
      this.saveButtonText = 'Save';

      this.clearFields();
    } else {
      this.saveButtonText = 'Update';
      // GetUserByName
      this.userService.getUserByName(selectedName)
        .subscribe( (response: User) => { const selectedUser = response;
                                          this.f.FirstName.setValue(selectedUser.firstName);
                                          this.f.LastName.setValue(selectedUser.lastName);
                                          this.f.Phone1.setValue(selectedUser.phone1);
                                          this.f.Phone2.setValue(selectedUser.phone2);
                                          this.f.KnownAs.setValue(selectedUser.knownAs);
                                          this.f.EmailAddress.setValue(selectedUser.emailAddress);
                                          this.f.Username.setValue(selectedUser.userName);
                                          this.f.Question.setValue(selectedUser.question);
                                          this.f.Answer.setValue(selectedUser.answer);
                                          this.f.isAdmin.setValue(selectedUser.systemAdmin);
                  },
                    (error) =>          { console.log(error); }
                  );
    }
  }

  cancelButton() {
    this.userNameSelected = false;
    this.saveButtonText = 'Save';
    this.route.navigate(['/research']);
  }

  deleteRegistration() {
    if (!this.userNameSelected) {
  //    this.alertify.error('Select a name then click delete');
    } else {
      this.saveButtonText = 'Save';
      const username = this.cache.StorageGet('selectedUserName');
      return this.userService.deleteUser(username).subscribe( () => {
        this.userService.getAllUserNames().subscribe( (results) => {
          this.userNames = results;
          this.cd.markForCheck();
          });
      });


      // var values = [], keys = Object.keys(localStorage), i = keys.length;
      // for (let j = 0; j < i; j++) {
      //   const item = localStorage.getItem(keys[j]);
      //   console.log(`${j} ${keys[j]} = item=${item}`);
      // }

    }
  }
}
