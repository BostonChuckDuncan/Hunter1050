import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-profiles',
  templateUrl: './projectProfiles.component.html',
  styleUrls: ['./projectProfiles.component.scss']
})
export class ProjectProfilesComponent implements OnInit {
  profilesForm: FormGroup;
  gapOccur: number;
  gapPointA: string;
  gapPointB: string;

  mutationOccur: number;
  mutationPointA: string;
  mutationPointB: string;

  virusOccur: number;
  virusPointA: string;
  virusPointB: string;

  parentOccur: number;
  parentPointA: string;
  parentPointB: string;

  parentSimOccur: number;
  parentSimPointA: string;
  parentSimPointB: string;

  parentContribOccur: number;
  parentContribPointA: string;
  parentContribPointB: string;

  childSurviveOccur: number;
  childSurvivePointA: string;
  childSurvivePointB: string;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.profilesForm && this.profilesForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(private route: Router,
              private fb: FormBuilder) {
              }

  ngOnInit() {
    const hasSettings: boolean = this.areMasterProfilesPresent();

    this.profilesForm = this.fb.group( {
      gapOccur:            ['',    [Validators.required]],
      gapPointA:           ['',    [Validators.required]],
      gapPointB:           ['',    [Validators.required]],
      mutationOccur:       ['',    [Validators.required]],
      mutationPointA:      ['',    [Validators.required]],
      mutationPointB:      ['',    [Validators.required]],
      virusOccur:          ['',    [Validators.required]],
      virusPointA:         ['',    [Validators.required]],
      virusPointB:         ['',    [Validators.required]],
      parentOccur:         ['',    [Validators.required]],
      parentPointA:        ['',    [Validators.required]],
      parentPointB:        ['',    [Validators.required]],
      parentSimOccur:      ['',    [Validators.required]],
      parentSimPointA:     ['',    [Validators.required]],
      parentSimPointB:     ['',    [Validators.required]],
      parentContribOccur:  ['',    [Validators.required]],
      parentContribPointA: ['',    [Validators.required]],
      parentContribPointB: ['',    [Validators.required]],
      childSurviveOccur:   ['',    [Validators.required]],
      childSurvivePointA:  ['',    [Validators.required]],
      childSurvivePointB:  ['',    [Validators.required]],
    });

    if (!hasSettings) {
      this.f.gapOccur.setValue('0.05');
      this.f.gapPointA.setValue('(0, 0.05)');
      this.f.gapPointB.setValue('(20, 1)');

      this.f.mutationOccur.setValue('0.05');
      this.f.mutationPointA.setValue('(0, 0.05)');
      this.f.mutationPointB.setValue('(20, 1)');

      this.f.virusOccur.setValue('0.05');
      this.f.virusPointA.setValue('(0, 0.05)');
      this.f.virusPointB.setValue('(20, 1)');

      this.f.parentOccur.setValue('1');
      this.f.parentPointA.setValue('(0, 0.05)');
      this.f.parentPointB.setValue('(20, 10');

      this.f.parentSimOccur.setValue('1');
      this.f.parentSimPointA.setValue('(0, 0.05)');
      this.f.parentSimPointB.setValue('(20, 1)');

      this.f.parentContribOccur.setValue('1');
      this.f.parentContribPointA.setValue('(0, 0.05)');
      this.f.parentContribPointB.setValue('(20, 1)');

      this.f.childSurviveOccur.setValue('1');
      this.f.childSurvivePointA.setValue('0, 0.05');
      this.f.childSurvivePointB.setValue('20, 1');
    } else {

    }
  }

  get f() { return this.profilesForm.controls; }

  areMasterProfilesPresent(): boolean {
    return false;
  }

  cancelButton() {
    this.route.navigate(['research']);
  }

  updateButtonText() {
    const i = 0;
  }

  submitProfiles() {
    const i = 0;
  }
}
