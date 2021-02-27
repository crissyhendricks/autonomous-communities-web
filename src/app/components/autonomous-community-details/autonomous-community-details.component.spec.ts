import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AutonomousCommunityDetailsComponent } from './autonomous-community-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AutonomousCommunitiesService } from '../../services/autonomous-communities.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { Community } from 'src/app/models/Community';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('AutonomousComunityDetailsComponent', () => {
  let component: AutonomousCommunityDetailsComponent;
  let fixture: ComponentFixture<AutonomousCommunityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, MaterialModule],
      declarations: [AutonomousCommunityDetailsComponent],
      providers: [
        {
          provide: AutonomousCommunitiesService,
          useClass: AutonomousCommunitiesServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutonomousCommunityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a page title', () => {
    const pageTitleElement = fixture.debugElement.query(By.css('.page-title'));
    expect(pageTitleElement.nativeElement.textContent).toBe('Islas Baleares ');
  });

  it('should minimum be one table tbody tr on the page', () => {
    const trList = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(trList.length).toBe(1);
  });

  it('should have a province with the name Baleares', () => {
    const tdList = fixture.debugElement.queryAll(
      By.css('.mat-column-province')
    );
    expect(tdList[1].nativeElement.textContent).toBe('Baleares');
  });

  it('should get name of map', () => {
    const trList = fixture.debugElement.queryAll(By.css('.map-image'));
    expect(trList[0].nativeElement.src).toContain('map/Islas%20Baleares.png');
  });

  it('should navigate to list of communities on community details tr click', fakeAsync(() => {
    const location = TestBed.inject(Location);
    const linkDes = fixture.debugElement.queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
    nativeButton.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/');
  }));
});

class AutonomousCommunitiesServiceStub {
  getAutonoumousCommunityByName(): Observable<Community[]> {
    return of([
      {
        flag: 'Baleares',
        id: 4,
        community: 'Islas Baleares',
        provinces: [
          {
            province: 'Baleares',
            population: 1171543,
            population_percentage: 2.49,
            surface: 4991,
            surface_percentage: 0.99,
          },
        ],
        surface: 4992,
        population: 1128139,
        capital: 'Palma de Mallorca',
      },
    ]);
  }
}
