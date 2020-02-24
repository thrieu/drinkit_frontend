import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../src/environments/environment';
import {Observable} from 'rxjs';

export interface ApiLowAlertStockProductStock {
  product: string;
  stock: number;
}

export interface ApiGetLowStockAlertResponse {
  machine_id: string;
  timestamp: string;
  stock: Array<ApiLowAlertStockProductStock>;
}

export interface ApiPostLowStockAlertResponse {
  success: string;
}

export interface ApiPostLowStockAlertErrResponse {
  error: string;
}

export interface ProductStock {
  product: string;
  stock: number;
}

export interface ApiPostLowStockAlertReqBody {
  machine_id: string;
  timestamp: string;
  stock: Array<ProductStock>;
}


@Injectable({
  providedIn: 'root'
})
export class LowStockAlertApiService {
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

  public fetchLowStockAlert(machineId: number): Observable<Array<ApiGetLowStockAlertResponse>> {
    this.httpOptions.params = {machine_id: machineId};
    return this.http.get<Array<ApiGetLowStockAlertResponse>>(`${environment.baseApiUrl}/api/lowstockalert`, this.httpOptions);
  }

  public postLowStockAlert(requestBody: ApiPostLowStockAlertReqBody): Observable<ApiPostLowStockAlertResponse> {
    return this.http.post<ApiPostLowStockAlertResponse>(`${environment.baseApiUrl}/api/lowstockalert`, requestBody, this.httpOptions);
  }
}
