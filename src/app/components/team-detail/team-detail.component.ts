import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Team } from "../../interfaces/team";
import { TeamService } from "../../services/team.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-team-detail",
  templateUrl: "./team-detail.component.html",
  styleUrls: ["./team-detail.component.scss"]
})
export class TeamDetailComponent implements OnInit {
  @Input() team: Team;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTeam();
  }

  getTeam(): void {
    const ab = this.route.snapshot.paramMap.get("ab");
    console.log(ab);
    this.teamService.getTeam(ab).subscribe(team => (this.team = team));
  }
}
