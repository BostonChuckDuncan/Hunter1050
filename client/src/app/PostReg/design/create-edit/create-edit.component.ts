import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {
  isCollapsed = false;

  projectNames: string[] = [];

  constructor() { }

  ngOnInit() {
    // debugging - get list from service ... use UserName info
    this.projectNames[0] = '<new project>';
    this.projectNames[1] = 'Root Calculation';
    this.projectNames[2] = 'Pattern Matching';
    this.projectNames[3] = 'Weather';
    this.projectNames[4] = 'Crop Prediction - Wheat';
    this.projectNames[5] = 'Crop Prediction - Soy Beans';
    this.projectNames[6] = 'Traveling Salesman - small';
    this.projectNames[7] = 'Traveling Salesman - large';
    this.projectNames[8] = 'Rubix Cube';
  }

  selectProjectName(index: number) {
    const count = this.projectNames.length;
    const i = name;
  }
}
