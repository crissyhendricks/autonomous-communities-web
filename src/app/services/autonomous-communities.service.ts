import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GLOBAL } from '../global';
import { Community } from '../models/Community';

@Injectable({
  providedIn: 'root',
})
export class AutonomousCommunitiesService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getAutonoumousCommunities(): Observable<Community[]> {
    return this._http.get<Community[]>(this.url + 'autonomous-communities');
  }
  getAutonoumousCommunityByName(community: string): Observable<Community[]> {
    return this._http.get<Community[]>(
      this.url + 'autonomous-communities/?community=' + community
    );
  }
}
