import {Component, OnInit} from '@angular/core';
import {ContentsService} from '../services/contents.service';
import {Product} from '../services/product';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ContentsRepository} from '../services/contents-repository';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TemperatureRepository} from '../services/temperature-repository.service';


/**
 * Settings panel provides an UI for setting stocks and temperature
 */
@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.less']
})
export class SettingsPanelComponent implements OnInit {
  products: Array<Product> = new Array<Product>();
  stockForm: FormGroup;
  temperatureForm: FormGroup;

  constructor(
    public contentsService: ContentsService,
    public contentsRepository: ContentsRepository,
    public temperatureRepository: TemperatureRepository,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    for (const drink of environment.providedDrinks) {
      if (this.products.indexOf(drink) !== -1) {
        continue;
      }
      this.products.push(drink);
      for (const additive of drink.additives) {
        if (this.products.indexOf(additive) === -1) {
          this.products.push(additive);
        }
      }
    }
  }

  ngOnInit(): void {
    const formControls = {};
    for (const product of this.products) {
      formControls[product.name] = this.contentsService.getContentDocument(product).stock;
    }
    this.stockForm = this.formBuilder.group(formControls);

    this.temperatureForm = this.formBuilder.group({
      temperature: this.temperatureRepository.getTemperature()
    });
  }

  onSubmitStockForm(formData) {
    for (const name in formData) {
      if (formData.hasOwnProperty(name) && formData[name]) {
        const product = this.contentsService.resolveProductByName(name);
        this.contentsRepository.setStock(product, formData[name]);
      }
    }

    this.snackBar.open(`Updated stocks!`, 'OK', {
      duration: 5000
    });
  }

  onSubmitTemperatureForm(formData) {
    this.temperatureRepository.setTemperature(formData.temperature);

    this.snackBar.open(`Updated temperature!`, 'OK', {
      duration: 5000
    });
  }
}
