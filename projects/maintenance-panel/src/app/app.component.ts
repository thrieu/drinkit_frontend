import {Component} from '@angular/core';

/**
 * The maintenance panel should be an sub-app, divided from the main app
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maintenance-panel';

  constructor(
  ) {
  }
}
