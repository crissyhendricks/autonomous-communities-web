import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutonomousCommunitiesListComponent } from './components/autonomous-communities-list/autonomous-communities-list.component';
import { AutonomousCommunityDetailsComponent } from './components/autonomous-community-details/autonomous-community-details.component';

const routes: Routes = [
  { path: '', component: AutonomousCommunitiesListComponent },
  { path: ':community', component: AutonomousCommunityDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
