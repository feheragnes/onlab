import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent }      from './players/players.component';
import { PlayerDashboardComponent }   from './player-dashboard/player-dashboard.component';
import { PlayerDetailComponent }  from './player-detail/player-detail.component';
import { BarChartComponent }  from './bar-chart/bar-chart.component';

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'player-dashboard', component: PlayerDashboardComponent },
  { path: 'detail/:id', component: PlayerDetailComponent },
  { path: 'bar-chart', component: BarChartComponent},
  { path: '', redirectTo: '/player-dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
