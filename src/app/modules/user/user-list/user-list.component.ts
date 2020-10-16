import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: UserModel[]) => {
      this.users = users;
    });
  }

}
