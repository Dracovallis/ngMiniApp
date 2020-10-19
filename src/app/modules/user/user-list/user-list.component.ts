import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';
import {MatTableDataSource} from '@angular/material/table';
import {LoaderComponent} from '../../core/loader/loader.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
    columnDefinitions = [
        {def: ['id', 'name', 'email', 'date_created', 'actions'], showMobile: false},
        {def: ['id', 'name', 'actions'], showMobile: true},
    ];
    usersDataSource;
    currentDisplay;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService) {
        if (window.innerWidth < 500) {
            this.currentDisplay = 'mobile';
        } else {
            this.currentDisplay = 'desktop';
        }

    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe((users: UserModel[]) => {
            this.usersDataSource = new MatTableDataSource(users);

            setTimeout(() => {
                this.usersDataSource.paginator = this.paginator;
                this.usersDataSource.sort = this.sort;
            });
        });
    }

    ngAfterViewInit(): void {

    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.usersDataSource.filter = filterValue.trim().toLowerCase();
    }

    getDisplayedColumns(): string[] {
        const isMobile = this.currentDisplay === 'mobile';
        return this.columnDefinitions
            .filter(cd => cd.showMobile === isMobile)
            .map(cd => cd.def)[0];
    }

}
