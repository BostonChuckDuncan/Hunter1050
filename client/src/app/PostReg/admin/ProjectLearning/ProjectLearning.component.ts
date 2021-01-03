import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-learning',
  templateUrl: './ProjectLearning.component.html',
  styleUrls: ['./ProjectLearning.component.scss']
})
export class ProjectLearningComponent implements OnInit {
  projectNames: any[];
  learningForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.learningForm = this.fb.group ( {
      selectedProject:     ['', Validators.required],
      learningInProcess:   ['false'],
      usePreviousProfile:  ['false'],
      useMasterProfile:    ['true'],
      gapOccur:            ['',    [Validators.required]],
      gapPointA:           ['',    [Validators.required]],
      gapPointB:           ['',    [Validators.required]],
      mutationOccur:       ['',    [Validators.required]],
      mutationPointA:      ['',    [Validators.required]],
      mutationPointB:      ['',    [Validators.required]],
      parentOccur:         ['',    [Validators.required]],
      parentPointA:        ['',    [Validators.required]],
      parentPointB:        ['',    [Validators.required]],
      parentSimOccur:      ['',    [Validators.required]],
      parentSimPointA:     ['',    [Validators.required]],
      parentSimPointB:     ['',    [Validators.required]],
      parentContribOccur:  ['',    [Validators.required]],
      parentContribPointA: ['',    [Validators.required]],
      parentContribPointB: ['',    [Validators.required]]
    })
  }

  selectprojectName(name) {
    const i = 0;
  }

  learningSubmit() {
    const i = 0;
  }

}
