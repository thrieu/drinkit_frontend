import {Injectable} from '@angular/core';
import {environment} from '../../../../src/environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ApiTemperatureRow {
  machine_id: string;
  timestamp: string;
  temperature: string;
}

export interface ApiGetTemperatureResponse {
  temp: Array<ApiTemperatureRow>;
}

export interface ApiPostTemperatureResponse {
  success: string;
}

export interface ApiPostTemperatureErrResponse {
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemperatureApiService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {}
  };

  constructor(
    private http: HttpClient
  ) {
  }

  postTemperature(temperature: number): Observable<ApiPostTemperatureResponse> {
    return this.http.post<ApiPostTemperatureResponse>(`${environment.baseApiUrl}/api/temperature`, {
      machine_id: environment.machineId,
      timestamp: (new Date()).getTime()?.toString(),
      temperature: temperature.toString(),
    }, this.httpOptions);
  }

  fetchRecentTemperatures(machineId: number): Observable<ApiGetTemperatureResponse> {
    this.httpOptions.params = {machine_id: machineId};
    return this.http.get<ApiGetTemperatureResponse>(`${environment.baseApiUrl}/api/temperature`, this.httpOptions);
  }
}
