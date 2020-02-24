import {Injectable} from '@angular/core';
import {TemperatureRepository} from './temperature-repository.service';
import {Observable} from 'rxjs';
import {
  ApiPostTemperatureResponse,
  TemperatureApiService
} from '../../../projects/common/src/lib/temperature-api.service';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(
    private temperatureRepository: TemperatureRepository,
    private temperatureApiService: TemperatureApiService
  ) {
  }

  getTemperature() {
    return this.temperatureRepository.getTemperature();
  }

  postTemperature = (): Observable<ApiPostTemperatureResponse> => {
    return this.temperatureApiService.postTemperature(this.getTemperature());
  }
}
