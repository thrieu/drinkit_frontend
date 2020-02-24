import {Component} from '@angular/core';
import {ContentsService} from './services/contents.service';
import {Drink} from './services/product';
import {TemperatureService} from './services/temperature.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'DrinKit';
  drinks: Array<Drink>;
  public temperatureReportInterval = 60000;

  constructor(
    private contentsService: ContentsService,
    public temperatureService: TemperatureService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.drinks = this.contentsService.getDrinks();

    // Report temperature at once
    this.reportTemperature();
    // Register temperature report timer
    this.registerTemperatureReporter();
  }

  registerTemperatureReporter() {
    window.setInterval(this.reportTemperature, this.temperatureReportInterval);
  }

  reportTemperature = () => {
    // Request POST api/temperature to report temperature
    this.temperatureService.postTemperature().subscribe((data) => {
      this.snackBar.open(`Reported temperature successfully`, 'OK', {
        duration: 5000,
      });
    }, (error: HttpErrorResponse) => {
      this.snackBar.open(`Error occurred while reporting temperature: ${error.message}`, 'OK', {
        duration: 5000,
      });
    });
  }
}
