import { Component, OnInit } from '@angular/core';
import { AutonomousCommunitiesService } from '../../services/autonomous-communities.service';
import { MatTableDataSource } from '@angular/material/table';
import { Community } from 'src/app/models/Community';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-autonomous-communities-list',
  templateUrl: './autonomous-communities-list.component.html',
  styleUrls: ['./autonomous-communities-list.component.css'],
  providers: [],
})
export class AutonomousCommunitiesListComponent implements OnInit {
  displayedColumns: string[] = ['flag', 'community', 'surface', 'population'];
  dataSource: MatTableDataSource<Community>;
  communities: any;
  constructor(
    private _autonoumousCommunitiesService: AutonomousCommunitiesService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAutonoumousCommunities();
  }


  getAutonoumousCommunities() {
    this._autonoumousCommunitiesService.getAutonoumousCommunities().subscribe(
      (response) => {
        this.communities = response;
        this.dataSource = new MatTableDataSource(response);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
