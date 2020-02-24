import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {RecentTemperatureDialogComponent} from '../recent-temperature-dialog/recent-temperature-dialog.component';
import {environment} from '../../../environments/environment';
import {
  ApiGetLowStockAlertResponse,
  LowStockAlertApiService
} from '../../../../../common/src/lib/low-stock-alert-api.service';
import {ApiGetTemperatureResponse, TemperatureApiService} from '../../../../../common/src/lib/temperature-api.service';

export interface GridRow {
  machineId: string;
  lastStockAlert: string;
  lastStockAlertAt: string;
  lastTemperature: string;
  lastTemperatureAt: string;
}

/**
 * The grid view for displaying machines
 */
@Component({
  selector: 'app-machine-data-grid',
  templateUrl: './machine-data-grid.component.html',
  styleUrls: ['./machine-data-grid.component.css']
})
export class MachineDataGridComponent implements OnInit {
  displayedColumns: string[] = ['machineId', 'lastTemperature', 'lastTemperatureAt', 'lastStockAlert', 'lastStockAlertAt', 'actions'];
  dataSource: Array<GridRow> = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private temperatureApiService: TemperatureApiService,
    private stockAlertApiService: LowStockAlertApiService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.loadMachineData(environment.machineIds);
  }

  openDialog(machineId: number) {
    this.dialog.open(RecentTemperatureDialogComponent, {
      data: {
        machineId
      }
    });
  }

  /**
   * Load temperature and low stock alert for the machine
   */
  private async loadMachineData(machineIds: Array<number>) {
    const rows = [];
    for (const machineId of machineIds) {
      let lastTemperature = '';
      let lastTemperatureAt = '';
      try {
        // Fetch temperature
        const data = await new Promise<ApiGetTemperatureResponse>((resolve, reject) => {
          this.temperatureApiService.fetchRecentTemperatures(machineId)
            .subscribe((resp: ApiGetTemperatureResponse): void => {
              if (!resp.hasOwnProperty('temp')) {
                reject(new Error('Invalid response'));
                return;
              }
              resolve(resp);
            }, (error: HttpErrorResponse): void => {
              reject(error);
            });
        });
        if (data.temp.length > 0) {
          const firstRow = data.temp[0];
          lastTemperature = `${firstRow.temperature}℃`;
          lastTemperatureAt = new Date(Number(firstRow.timestamp)).toLocaleString();
        } else {
          lastTemperature = `No data`;
          lastTemperatureAt = `No data`;
        }
      } catch (e) {
        this.snackBar.open(`Error occurred while fetching temperature: ${e.message}`, 'OK', {
          duration: 5000,
        });
      }

      let lastStockAlert = '';
      let lastStockAlertAt = '';
      try {
        // Fetch low stock alert
        const data = await new Promise<Array<ApiGetLowStockAlertResponse>>((resolve, reject) => {
          this.stockAlertApiService.fetchLowStockAlert(machineId)
            .subscribe((resp: Array<ApiGetLowStockAlertResponse>): void => {
              resolve(resp);
            }, (error: HttpErrorResponse): void => {
              reject(error);
            });
        });
        if (data.length > 0) {
          const firstRow = data[0];
          const strings: Array<string> = new Array<string>();
          for (const stock of firstRow.stock) {
            strings.push(`${stock.product}: ${stock.stock}`);
          }
          lastStockAlert = strings.join(', ');
          lastStockAlertAt = new Date(Number(firstRow.timestamp)).toLocaleString();
        } else {
          lastStockAlert = 'No data';
          lastStockAlertAt = 'No data';
        }
      } catch (e) {
        this.snackBar.open(`Error occurred while fetching low stock alert: ${e.message}`, 'OK', {
          duration: 5000,
        });
      }

      rows.push({
        machineId,
        lastTemperature,
        lastTemperatureAt,
        lastStockAlert,
        lastStockAlertAt
      });
      this.dataSource = [...rows];
    }
  }
}
