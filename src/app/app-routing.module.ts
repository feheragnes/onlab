import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from './guards/logged-in.guard';
import {LoggedOutGuard} from './guards/logged-out.guard';
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
import {WelcomeComponent} from './welcome/welcome.component';


const routes: Routes = [
    {
        path: 'players',
        component: PlayersComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'team-detail/:season/:ab',
        component: TeamDetailComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'teams',
        component: TeamsComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'games',
        component: GamesComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'head2head/:id',
        component: Head2headComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'stats',
        component: StatsComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'defense-stats',
        component: DefenseStatsComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'qb-stats',
        component: QbStatsComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'rb-stats',
        component: RbStatsComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'wr-stats',
        component: WrStatsComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: '',
        component: WelcomeComponent,
        canActivate: [LoggedInGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
