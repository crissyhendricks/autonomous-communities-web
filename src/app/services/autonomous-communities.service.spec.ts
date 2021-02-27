import { fakeAsync, getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AutonomousCommunitiesService } from './autonomous-communities.service';
import { GLOBAL } from '../global';

describe('AutonomousCommunitiesService', () => {
  let injector: TestBed;
  let service: AutonomousCommunitiesService;
  let httpMock: HttpTestingController;
  let url = GLOBAL.url;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    injector = getTestBed();
    service = TestBed.inject(AutonomousCommunitiesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAutonoumousCommunities', () => {
    it('should call collection of autonomous communities', () => {
      service.getAutonoumousCommunities().subscribe((res) => {
        expect(res.length).toBe(2);
      });
      const req = httpMock.expectOne(url + 'autonomous-communities');
      expect(req.request.method).toBe('GET');
      req.flush(mockCommunities);
    });
  });

  describe('getAutonoumousCommunityByName', () => {
    it('should get details of La Rioja', fakeAsync(() => {
      service
        .getAutonoumousCommunityByName('La%20Rioja')
        .subscribe((response) => {
          expect(response.length).toBe(1);
        });
      const req = httpMock.expectOne(
        url + 'autonomous-communities/?community=La%20Rioja'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCommunity);
    }));
  });
});

const mockCommunities = [
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
];
const mockCommunity = [
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
];
