import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './modules/core/home/home.component';
import {UserDetailsComponent} from './modules/user/user-details/user-details.component';
import {UserListComponent} from './modules/user/user-list/user-list.component';
import {PieChartComponent} from './modules/charts/amcharts/pie-chart/pie-chart.component';
import {LineChartComponent} from './modules/charts/amcharts/line-chart/line-chart.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'users',
        component: UserListComponent
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent
    },
    {
        path: 'charts/amchart/pie-chart',
        component: PieChartComponent
    },
    {
        path: 'charts/amchart/line-chart',
        component: LineChartComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
