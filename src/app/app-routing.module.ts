import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlayersComponent } from "./components/players/players.component";
import { PlayerDashboardComponent } from "./components/player-dashboard/player-dashboard.component";
import { PlayerDetailComponent } from "./components/player-detail/player-detail.component";
import { BarChartComponent } from "./components/charts/bar-chart/bar-chart.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { TeamDetailComponent } from "./components/team-detail/team-detail.component";
import { GamesComponent } from "./components/games/games.component";
import { Head2headComponent } from "./components/head2head/head2head.component";

const routes: Routes = [
  { path: "players", component: PlayersComponent },
  { path: "player-dashboard", component: PlayerDashboardComponent },
  { path: "player-detail/:id", component: PlayerDetailComponent },
  { path: "team-detail/:ab", component: TeamDetailComponent },
  { path: "teams", component: TeamsComponent },
  { path: "games", component: GamesComponent },
  { path: "head2head/:id", component: Head2headComponent },
  { path: "bar-chart", component: BarChartComponent },
  { path: "", redirectTo: "/player-dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
