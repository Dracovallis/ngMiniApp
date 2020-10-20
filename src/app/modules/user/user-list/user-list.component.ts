import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';
import {MatTableDataSource} from '@angular/material/table';
import {LoaderComponent} from '../../core/loader/loader.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {fromEvent} from 'rxjs';
import {AppService} from '../../../app.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    columnDefinitions = {
        deviceType: {
            mobile: ['id', 'name', 'actions'],
            tablet: ['id', 'name', 'email', 'actions'],
            desktop: ['id', 'name', 'email', 'date_created', 'email_verified_at', 'actions'],
        }
    };
    displayedColumns;
    usersDataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService, private appService: AppService) {
        this.setInitialTableColumns();
    }

    ngOnInit(): void {
        this.userService.getUsers().subscribe((users: UserModel[]) => {
            this.usersDataSource = new MatTableDataSource(users);

            setTimeout(() => {
                this.usersDataSource.paginator = this.paginator;
                this.usersDataSource.sort = this.sort;
            });
        });


        const resizeEv = fromEvent(window, 'resize');
        resizeEv.subscribe(() => {
            this.appService.mobile$.subscribe((isMobile) => {
                if (isMobile) {
                    this.displayedColumns = this.columnDefinitions.deviceType.mobile;
                }
            });

            this.appService.tablet$.subscribe((isTablet) => {
                if (isTablet) {
                    this.displayedColumns = this.columnDefinitions.deviceType.tablet;
                }
            });

            this.appService.desktop$.subscribe((isDesktop) => {
                if (isDesktop) {
                    this.displayedColumns = this.columnDefinitions.deviceType.desktop;
                }
            });
        });
    }

    setInitialTableColumns(): void {
        if (window.innerWidth < 480) {
            this.displayedColumns = this.columnDefinitions.deviceType.mobile;
        } else if (window.innerWidth < 1024) {
            this.displayedColumns = this.columnDefinitions.deviceType.tablet;
        } else {
            this.displayedColumns = this.columnDefinitions.deviceType.desktop;
        }
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.usersDataSource.filter = filterValue.trim().toLowerCase();
    }
}
