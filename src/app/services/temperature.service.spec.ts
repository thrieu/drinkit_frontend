import { TestBed } from '@angular/core/testing';

import { TemperatureService } from './temperature.service';
import {HttpClientModule} from '@angular/common/http';
import {TemperatureRepository} from './temperature-repository.service';

describe('TemperatureService', () => {
  let service: TemperatureService;
  let repo: TemperatureRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
    });
    service = TestBed.inject(TemperatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set/get temperature correctly', () => {
    repo = TestBed.inject(TemperatureRepository);
    const temperature = 68;
    repo.setTemperature(temperature);
    expect(temperature).toEqual(service.getTemperature());
  });
});
