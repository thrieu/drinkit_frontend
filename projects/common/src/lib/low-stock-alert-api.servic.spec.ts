import { TestBed } from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {LowStockAlertApiService} from './low-stock-alert-api.service';

describe('LowStockAlertApiService', () => {
  let service: LowStockAlertApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
    });
    service = TestBed.inject(LowStockAlertApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should low stock alert correctly', () => {
    const machineId = '64';
    const stock = [
      {
        product: 'tea',
        stock: 13
      },
      {
        product: 'sugar',
        stock: 22
      }
    ];
    const requestBody = {
      machine_id: machineId,
      timestamp: (new Date()).getTime().toString(),
      stock
    };

    service.postLowStockAlert(requestBody).subscribe(() => {
      service.fetchLowStockAlert(Number(machineId)).subscribe((data) => {
        expect(data[0]).toEqual(requestBody);
      }, (e) => {
        throw e;
      });
    }, (e) => {
      throw e;
    });
  });
});

