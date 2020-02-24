import { TestBed } from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {TemperatureApiService} from './temperature-api.service';
import {environment} from '../../../../src/environments/environment';

describe('TemperatureApiService', () => {
  let service: TemperatureApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
    });
    service = TestBed.inject(TemperatureApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should report temperature correctly', () => {
    const temperature = 88;
    expect(temperature).toEqual(88);
    service.postTemperature(temperature).subscribe(() => {
      service.fetchRecentTemperatures(Number(environment.machineId)).subscribe((data) => {
        expect(data.temp[0].temperature).toEqual(temperature.toString());
      }, (e) => {
        throw e;
      });
    }, (e) => {
      throw e;
    });
  });
});

