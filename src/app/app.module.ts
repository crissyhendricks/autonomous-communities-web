import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutonomousCommunitiesListComponent } from './components/autonomous-communities-list/autonomous-communities-list.component';
import { AutonomousCommunityDetailsComponent } from './components/autonomous-community-details/autonomous-community-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule  } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AutonomousCommunitiesListComponent,
    AutonomousCommunityDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
