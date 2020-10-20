import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {fromEvent} from 'rxjs';
import {AppService} from './app.service';
import {debounceTime, distinctUntilChanged, map, startWith, tap} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'mini-app';

    private resize$: Observable<number>;

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
        this.resize$ = fromEvent(window, 'resize')
            .pipe(
                debounceTime(100),
                map(() => window.innerWidth),
                distinctUntilChanged(),
                startWith(window.innerWidth),
                tap((width) => this.appService.setWindowWidth(width)),
            );
        this.resize$.subscribe();
    }
}
