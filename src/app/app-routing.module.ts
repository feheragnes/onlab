import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './components/players/players.component';
import { StatsComponent } from './components/stats/stats.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { GamesComponent } from './components/games/games.component';
import { Head2headComponent } from './components/head2head/head2head.component';
import { DefenseStatsComponent } from './components/charts/defense-stats/defense-stats.component';
import { QbStatsComponent } from './components/charts/qb-stats/qb-stats.component';
import { RbStatsComponent } from './components/charts/rb-stats/rb-stats.component';
import { WrStatsComponent } from './components/charts/wr-stats/wr-stats.component';

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'team-detail/:ab', component: TeamDetailComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'head2head/:id', component: Head2headComponent },
  { path: 'stats', component: StatsComponent },
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
