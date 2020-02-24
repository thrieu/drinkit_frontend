import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiGetTemperatureResponse, TemperatureApiService} from '../../../../../common/src/lib/temperature-api.service';


export interface DialogData {
  machineId: number;
}

export interface TableRow {
  temperature: string;
  at: string;
}

/**
 * The dialog for displaying the most recent 30 temperature readings
 */
@Component({
  selector: 'app-recent-temperature-dialog',
  templateUrl: './recent-temperature-dialog.component.html',
  styleUrls: ['./recent-temperature-dialog.component.css']
})
export class RecentTemperatureDialogComponent implements OnInit {
  displayedColumns: string[] = ['temperature', 'at'];
  dataSource: Array<TableRow> = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private temperatureApiService: TemperatureApiService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  )  { }

  async ngOnInit() {
    await this.loadRecentTemperatures();
  }

  async loadRecentTemperatures() {
    try {
      const data = await new Promise<ApiGetTemperatureResponse>((resolve, reject) => {
          this.temperatureApiService.fetchRecentTemperatures(this.data.machineId)
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
      const rows = [];
      for (const respRow of data.temp) {
        rows.push({
          temperature: respRow.temperature + '℃',
          at: new Date(Number(respRow.timestamp)).toLocaleString()
        });
      }
      this.dataSource = [...rows];
    } catch (e) {
      this.snackBar.open(`Error occurred while fetching temperature: ${e.message}`, 'OK', {
        duration: 5000,
      });
    }
  }
}
