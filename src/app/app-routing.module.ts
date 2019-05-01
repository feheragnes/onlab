import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './components/players/players.component';
import { PlayerDashboardComponent } from './components/player-dashboard/player-dashboard.component';
import { PlayerDetailComponent } from './components/player-detail/player-detail.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { GamesComponent } from './components/games/games.component';
import { Head2headComponent } from './components/head2head/head2head.component';
import { DefenseStatsComponent } from './components/defense-stats/defense-stats.component';
import { QbStatsComponent } from './components/qb-stats/qb-stats.component';
import { RbStatsComponent } from './components/rb-stats/rb-stats.component';
import { WrStatsComponent } from './components/wr-stats/wr-stats.component';

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'player-dashboard', component: PlayerDashboardComponent },
  { path: 'player-detail/:id', component: PlayerDetailComponent },
  { path: 'team-detail/:ab', component: TeamDetailComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'head2head/:id', component: Head2headComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'defense-stats', component: DefenseStatsComponent },
  { path: 'qb-stats', component: QbStatsComponent },
  { path: 'rb-stats', component: RbStatsComponent },
  { path: 'wr-stats', component: WrStatsComponent },
  { path: '', redirectTo: '/teams', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
