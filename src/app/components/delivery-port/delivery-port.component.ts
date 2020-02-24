import {Component, Input, OnInit} from '@angular/core';
import {ContentsService, DrinkNotAvailableError, DrinkRunOutError} from '../../services/contents.service';
import {Drink, Product} from '../../services/product';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * The form for offering drinks
 */
@Component({
  selector: 'app-delivery-port',
  templateUrl: './delivery-port.component.html',
  styleUrls: ['./delivery-port.component.less']
})
export class DeliveryPortComponent implements OnInit {
  @Input() drink: Drink;
  portForm: FormGroup;

  constructor(
    private contentsService: ContentsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    const formControls = {};
    for (const additive of this.drink.additives) {
      formControls[additive.name] = false;
    }
    this.portForm = this.formBuilder.group(formControls);

    this.contentsService.lowStockAlertSuccessHandler = ((data) => {
      this.snackBar.open(`Low stock alert successfully`, 'OK', {
        duration: 5000,
      });
    });
    this.contentsService.lowStockAlertErrorHandler = ((error) => {
      this.snackBar.open(`Error occurred while low stock alert: ${error.message}`, 'OK', {
        duration: 5000,
      });
    });
  }

  onSubmit(formData): void {
    try {
      const additives: Array<Product> = new Array<Product>();
      for (const name in formData) {
        if (formData.hasOwnProperty(name) && formData[name]) {
          additives.push(this.contentsService.resolveProductByName(name));
        }
      }

      // Offer drink to user
      this.contentsService.offer(this.drink, ...additives);

      // Toast message text
      let additiveText = '';
      if (additives.length > 0) {
        additiveText = ' with ';
        const strings: Array<string> = new Array<string>();
        for (const additive of additives) {
          strings.push(additive.name);
        }
        additiveText += strings.join(' and ');
      }
      this.snackBar.open(`Here is your ${this.drink.name}${additiveText}. Thank you!`, 'OK', {
        duration: 5000
      });
    } catch (e) {
      if (e instanceof DrinkRunOutError) {
        this.snackBar.open(`The ${e.product.name} has been ran out, please come back next time.`, 'OK', {
          duration: 5000,
        });
      } else if (e instanceof DrinkNotAvailableError) {
        this.snackBar.open('The drink is not available', 'OK', {
          duration: 5000,
        });
      }
    }

    // Reset form
    this.portForm.reset();
  }
}
