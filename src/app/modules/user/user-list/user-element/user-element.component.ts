import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-element',
  templateUrl: './user-element.component.html',
  styleUrls: ['./user-element.component.scss']
})
export class UserElementComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit(): void {
  }

}
