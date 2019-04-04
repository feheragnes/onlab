import { Component, OnInit, Input } from "@angular/core";
import { Head2Head } from "../../interfaces/head2head";
import { ActivatedRoute } from "@angular/router";
import { GamesService } from "../../services/games.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-head2head",
  templateUrl: "./head2head.component.html",
  styleUrls: ["./head2head.component.css"]
})
export class Head2headComponent implements OnInit {
  @Input() head2head: Head2Head;

  width: any;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHead2Head();
  }

  getHead2Head(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.gamesService
      .getHead2Head(id)
      .subscribe(head2head => (this.head2head = head2head));
  }

  goBack(): void {
    this.location.back();
  }
}
