import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent }      from './players/players.component';
import { PlayerDashboardComponent }   from './player-dashboard/player-dashboard.component';
import { PlayerDetailComponent }  from './player-detail/player-detail.component';
import { BarChartComponent }  from './bar-chart/bar-chart.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'player-dashboard', component: PlayerDashboardComponent },
  { path: 'player-detail/:id', component: PlayerDetailComponent },
  { path: 'team-detail/:ab', component: TeamDetailComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'bar-chart', component: BarChartComponent},
  { path: '', redirectTo: '/player-dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
