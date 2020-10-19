import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../user.model';
import {UserService} from '../user.service';
import {LoaderComponent} from '../../core/loader/loader.component';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

    user: UserModel;
    displayedColumns: string[] = ['email'];



    constructor(private route: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit(): void {
        const userId = parseInt(this.route.snapshot.params.id);
        this.userService.getUserById(userId).subscribe((user: UserModel) => {
            this.user = user;
        });
    }

}
