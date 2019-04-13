import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
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
  MatGridListModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './components/players/players.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { PlayerDashboardComponent } from './components/player-dashboard/player-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { GamesComponent } from './components/games/games.component';
import { Head2headComponent } from './components/head2head/head2head.component';
import { ThirddownChartComponent } from './components/charts/thirddown-chart/thirddown-chart.component';
import { DlinesChartComponent } from './components/charts/dlines-chart/dlines-chart.component';
import { SecondariesChartComponent } from './components/charts/secondaries-chart/secondaries-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerDetailComponent,
    PlayerDashboardComponent,
    BarChartComponent,
    TeamsComponent,
    TeamDetailComponent,
    GamesComponent,
    Head2headComponent,
    ThirddownChartComponent,
    DlinesChartComponent,
    SecondariesChartComponent
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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
