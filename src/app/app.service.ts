import { Injectable } from '@angular/core';
import { ApplicationState } from './statemanagement/states/application.state';
import { Store } from '@ngrx/store';
import { SetScreen } from './statemanagement/actions/screen.actions';

@Injectable()
export class AppService {
    mobile$ = this.store.select(state => state.screen.mobile);
    tablet$ = this.store.select(state => state.screen.tablet);
    desktop$ = this.store.select(state => state.screen.desktop);

    constructor(private store: Store<ApplicationState>) {
    }

    setWindowWidth(windowWidth: number): void {
        this.store.dispatch(new SetScreen(windowWidth));
    }
}
