import {Component, OnInit} from '@angular/core';
import {GamesService} from '../../services/games.service';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    constructor(private gamesService: GamesService) {
    }

    public games;
    public filteredGames;

    seasons = [];
    weeks = [];

    selectedSeason = 2018;
    selectedWeek = 1;
    loading = true;

    ngOnInit() {
        this.getSeasons();
        this.getGames();
    }

    onSeasonChanged(season: number): void {
        this.selectedSeason = season;
        this.getGames();
    }

    onWeekChanged(week: number): void {
        this.selectedWeek = week;
        this.filterData();
    }

    getGames(): void {
        this.gamesService.getGamesBySeason(this.selectedSeason).subscribe(
            data => {
                this.games = data;
                this.weeks = Array.from(new Set(data.map((item: any) => item.week)));
                this.filterData();
            },
            err => console.error(err),
            () => {
                console.log('done loading games');
                this.loading = false;
            }
        );
    }

    getSeasons(): void {
        this.gamesService.getSeasons().subscribe(
            data => {
                this.seasons = data;
            },
            err => console.error(err),
            () => console.log('done loading seasons')
        );
    }

    getHead2Head(): void {
        this.gamesService.getGames().subscribe(
            data => {
                this.games = data;
            },
            err => console.error(err),
            () => console.log('done loading head2head')
        );
    }

    filterData() {
        this.filteredGames = this.games.filter(x => x.week == this.selectedWeek);
    }
}
