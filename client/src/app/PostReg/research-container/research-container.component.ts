import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-research-container',
  templateUrl: './research-container.component.html',
  styleUrls: ['./research-container.component.css']
})
export class ResearchContainerComponent implements OnInit, OnDestroy {

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('research destroyed');
  }
  constructor() {

  }

  ngOnInit() {
    const i = 0;
  }


}
