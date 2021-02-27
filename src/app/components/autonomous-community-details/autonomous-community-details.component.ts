import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Province } from 'src/app/models/Province';
import { AutonomousCommunitiesService } from 'src/app/services/autonomous-communities.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-autonomous-community-details',
  templateUrl: './autonomous-community-details.component.html',
  styleUrls: ['./autonomous-community-details.component.css'],
  providers: [],
})
export class AutonomousCommunityDetailsComponent implements OnInit {
  public community: any;
  public communityName: string = '';
  displayedColumns: string[] = [
    'province',
    'population',
    'population_percentage',
    'surface',
    'surface_percentage',
  ];
  dataSource: MatTableDataSource<Province>;
  constructor(
    private route: ActivatedRoute,
    private _autonoumousCommunitiesService: AutonomousCommunitiesService
  ) {
    this.dataSource = new MatTableDataSource();
    this.communityName = '';
  }

  ngOnInit(): void {
    if (this.route) {
      this.route.paramMap.subscribe((params) => {
        this.communityName = params.get('community') || '';
        this.getAutonoumousCommunityByName();
      });
    }
  }

  getAutonoumousCommunityByName() {
    this._autonoumousCommunitiesService
      .getAutonoumousCommunityByName(this.communityName)
      .subscribe(
        (response) => {
          if (response) {
            this.community = response[0];
            this.dataSource = new MatTableDataSource(this.community.provinces);
          }
        },
        (error) => {
          Swal.fire({
            title: 'error',
            text: 'There has been a problem, please try again.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
  }
}
