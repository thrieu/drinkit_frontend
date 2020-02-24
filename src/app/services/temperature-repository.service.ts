import {Injectable} from '@angular/core';

/**
 * Web local storage accessor
 */
@Injectable({
  providedIn: 'root'
})
export class TemperatureRepository {
  private readonly key = 'drinkit_temperature';
  private storage = window.localStorage;
  private defaultTemperature = 100;

  constructor() {
    if (this.storage.getItem(this.key) === null) {
      this.setTemperature(this.defaultTemperature);
    }
  }

  setTemperature(temperature: number): void {
    this.storage.setItem(this.key, temperature?.toString());
  }

  getTemperature(): number {
    return Number(this.storage.getItem(this.key));
  }
}
