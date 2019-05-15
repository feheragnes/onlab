import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';

import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
} from '@angular/material';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayersComponent} from './components/players/players.component';
import {ChartsModule} from 'ng2-charts';
import {StatsComponent} from './components/stats/stats.component';
import {TeamsComponent} from './components/teams/teams.component';
import {TeamDetailComponent} from './components/team-detail/team-detail.component';
import {GamesComponent} from './components/games/games.component';
import {Head2headComponent} from './components/head2head/head2head.component';
import {ThirddownChartComponent} from './components/charts/thirddown-chart/thirddown-chart.component';
import {DlinesChartComponent} from './components/charts/dlines-chart/dlines-chart.component';
import {SecondariesChartComponent} from './components/charts/secondaries-chart/secondaries-chart.component';
import {FirstdownChartComponent} from './components/charts/firstdown-chart/firstdown-chart.component';
import {TdYpgChartComponent} from './components/charts/td-ypg-chart/td-ypg-chart.component';
import {DefenseStatsComponent} from './components/charts/defense-stats/defense-stats.component';
import {WrStatsComponent} from './components/charts/wr-stats/wr-stats.component';
import {RbStatsComponent} from './components/charts/rb-stats/rb-stats.component';
import {QbStatsComponent} from './components/charts/qb-stats/qb-stats.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthHeaderInterceptor} from './interceptors/auth-header.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        PlayersComponent,
        StatsComponent,
        TeamsComponent,
        TeamDetailComponent,
        GamesComponent,
        Head2headComponent,
        ThirddownChartComponent,
        DlinesChartComponent,
        SecondariesChartComponent,
        FirstdownChartComponent,
        TdYpgChartComponent,
        DefenseStatsComponent,
        WrStatsComponent,
        RbStatsComponent,
        QbStatsComponent,
        LoginComponent,
        RegisterComponent,
        WelcomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ChartsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatBadgeModule,
        MatExpansionModule,
        MatSelectModule,
        MatFormFieldModule,
        MatChipsModule,
        MatPaginatorModule,
        NgbModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatMenuModule,
        MatSliderModule,
        MatSidenavModule,
        MatInputModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            progressBar: true,
        })
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHeaderInterceptor,
        multi: true,
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
