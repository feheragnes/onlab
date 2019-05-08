import { Component, OnInit, Input } from '@angular/core';
import { Head2Head } from '../../interfaces/head2head';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { Location } from '@angular/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-head2head',
  templateUrl: './head2head.component.html',
  styleUrls: ['./head2head.component.css']
})
export class Head2headComponent implements OnInit {
  @Input() head2head: Head2Head;

  width: any;
  @Input() id: number;
  @Input() home: string;
  @Input() away: string;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartColors = [
    {
      backgroundColor: ['#1a237e', '#5c6bc0']
    }
  ];

  public allowedPointsData: ChartDataSets[] = [
    { data: [], label: 'Allowed Points' }
  ];
  public scoredPointsData: ChartDataSets[] = [
    { data: [], label: 'Scored Points' }
  ];
  public allowedYardsData: ChartDataSets[] = [
    { data: [], label: 'Allowed Yards' }
  ];
  public scoredYardsData: ChartDataSets[] = [
    { data: [], label: 'Scored Yards' }
  ];

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHead2Head();
  }

  getHead2Head(): void {
    // const id = +this.route.snapshot.paramMap.get("id");
    this.gamesService.getHead2Head(this.id).subscribe(
      data => {
        this.head2head = data;
        this.barChartLabels = [this.home, this.away];
        this.allowedPointsData = [
          {
            data: [data.homeAllowedPoints, data.awayAllowedPoints],
            label: 'Allowed Points'
          }
        ];
        this.scoredPointsData = [
          {
            data: [data.homeScoredPoints, data.awayScoredPoints],
            label: 'Scored Points'
          }
        ];
        this.allowedYardsData = [
          {
            data: [data.homeAllowedYards, data.awayAllowedYards],
            label: 'Allowed Yards'
          }
        ];
        this.scoredYardsData = [
          {
            data: [data.homeScoredYards, data.awayScoredYards],
            label: 'Scored Yards'
          }
        ];
      },
      err => console.error(err),
      () => console.log('done loading head2head')
    );
  }

  goBack(): void {
    this.location.back();
  }
}
