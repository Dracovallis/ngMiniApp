import {ActionReducerMap, combineReducers, MetaReducer} from '@ngrx/store';
import {InjectionToken} from '@angular/core';

import {screenReducer} from './reducers/screen.reducer';


export const rootReducer = {
    screen: screenReducer,
};

export function getReducers() {
    return rootReducer;
}

export const reducerProvider = [
    {
        useFactory: getReducers
    }
];


