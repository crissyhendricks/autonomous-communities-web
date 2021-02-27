import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AutonomousCommunitiesListComponent } from './autonomous-communities-list.component';
import { AutonomousCommunitiesService } from '../../services/autonomous-communities.service';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { Community } from 'src/app/models/Community';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

describe('AutonomousCommunitiesListComponent', () => {
  let component: AutonomousCommunitiesListComponent;
  let fixture: ComponentFixture<AutonomousCommunitiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutonomousCommunitiesListComponent, DummyComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: ':community', component: DummyComponent },
        ]),
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: AutonomousCommunitiesService,
          useClass: AutonomousCommunitiesServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutonomousCommunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a page title', () => {
    const pageTitleElement = fixture.debugElement.query(By.css('.page-title'));
    expect(pageTitleElement.nativeElement.textContent).toBe(
      'Autonomous communities of Spain '
    );
  });

  it('should minimum be 2 table tbody tr on the page', () => {
    const trList = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(trList.length).toBe(2);
  });

  it('should get name of flags', () => {
    const trList = fixture.debugElement.queryAll(By.css('.flag-image'));
    expect(trList[0].nativeElement.src).toContain('flags/Bandera_de_Espa%C3%B1a.png');
    expect(trList[1].nativeElement.src).toContain('flags/Islas%20Baleares.png');
    expect(trList[2].nativeElement.src).toContain('flags/La%20Rioja.png');
  });

  it('should navigate to AutonomousCommunitiesList before community tr click', () => {
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('');
  });

  it('should navigate to Islas Baleares Details on community tr click', fakeAsync(() => {
    const location = TestBed.inject(Location);
    const linkDes = fixture.debugElement.queryAll(By.css('table tbody tr'));
    const nativeTr: HTMLTableRowElement = linkDes[0].nativeElement;
    nativeTr.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe('/Islas%20Baleares');
  }));
});

class AutonomousCommunitiesServiceStub {
  getAutonoumousCommunities(): Observable<Community[]> {
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
      {
        flag: 'La Rioja',
        id: 13,
        community: 'La Rioja',
        provinces: [
          {
            province: 'La Rioja',
            population: 319914,
            population_percentage: 0.67,
            surface: 5045,
            surface_percentage: 1,
          },
        ],
        surface: 5045,
        population: 315371,
        capital: 'Logroño',
      },
    ]);
  }
}

@Component({ template: '' })
class DummyComponent {}
