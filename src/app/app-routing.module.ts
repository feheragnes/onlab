import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayersComponent} from './components/players/players.component';
import {StatsComponent} from './components/stats/stats.component';
import {TeamsComponent} from './components/teams/teams.component';
import {TeamDetailComponent} from './components/team-detail/team-detail.component';
import {GamesComponent} from './components/games/games.component';
import {Head2headComponent} from './components/head2head/head2head.component';
import {DefenseStatsComponent} from './components/charts/defense-stats/defense-stats.component';
import {QbStatsComponent} from './components/charts/qb-stats/qb-stats.component';
import {RbStatsComponent} from './components/charts/rb-stats/rb-stats.component';
import {WrStatsComponent} from './components/charts/wr-stats/wr-stats.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
    {path: 'players', component: PlayersComponent, canActivate: [AuthGuard]},
    {path: 'team-detail/:season/:ab', component: TeamDetailComponent, canActivate: [AuthGuard]},
    {path: 'teams', component: TeamsComponent, canActivate: [AuthGuard]},
    {path: 'games', component: GamesComponent, canActivate: [AuthGuard]},
    {path: 'head2head/:id', component: Head2headComponent, canActivate: [AuthGuard]},
    {path: 'stats', component: StatsComponent, canActivate: [AuthGuard]},
    {path: 'defense-stats', component: DefenseStatsComponent, canActivate: [AuthGuard]},
    {path: 'qb-stats', component: QbStatsComponent, canActivate: [AuthGuard]},
    {path: 'rb-stats', component: RbStatsComponent, canActivate: [AuthGuard]},
    {path: 'wr-stats', component: WrStatsComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
