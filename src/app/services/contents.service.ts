import {Injectable} from '@angular/core';
import {Drink, Product} from './product';
import {ContentDocument, ContentsRepository} from './contents-repository';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {
  ApiPostLowStockAlertReqBody,
  LowStockAlertApiService, ProductStock
} from '../../../projects/common/src/lib/low-stock-alert-api.service';

@Injectable({
  providedIn: 'root'
})
class ContentsService {
  private drinks: Array<Drink> = environment.providedDrinks;
  private afterOffer: BehaviorSubject<Product> = new BehaviorSubject(null);
  private readonly lowStockThreshold = 25;
  public lowStockAlertErrorHandler: (error: HttpErrorResponse) => void;
  public lowStockAlertSuccessHandler: (data) => void;

  constructor(
    private repository: ContentsRepository,
    private lowStockAlertApiService: LowStockAlertApiService,
  ) {
    // Initialize stock data if there is no data in web local storage
    if (!this.repository.retrieveCollection()) {
      this.initStocks();
    }

    // Subscribe to event afterOffer
    this.afterOffer.subscribe(this.reportLowStock);
  }

  initStocks() {
    for (const initialStock of environment.initialStocks) {
      this.repository.setStock(initialStock.product, initialStock.stocks);
    }
  }

  getDrinks(): Array<Drink> {
    return this.drinks;
  }

  getContentDocument(drink: Product): ContentDocument {
    return this.repository.getDocument(drink);
  }

  offer(...drinks: Product[]): boolean {
    const toOffer: Product[] = new Array<Product>();
    // Validation
    for (const drink of drinks) {
      const contentDocument: ContentDocument = this.repository.getDocument(drink);
      if (contentDocument) {
        if (contentDocument.stock < 1) {
          throw new DrinkRunOutError(drink);
        }
      } else {
        throw new DrinkNotAvailableError();
      }
      toOffer.push(drink);
    }

    for (const drink of toOffer) {
      try {
        this.repository.offer(drink);

        // Trigger event afterOffer
        this.afterOffer.next(drink);
      } catch (e) {
        //
        return false;
      }
    }
    return true;
  }

  resolveProductByName(name: string): Product {
    for (const drink of this.drinks) {
      if (drink.name === name) {
        return drink;
      }
      for (const additive of drink.additives) {
        if (additive.name === name) {
          return additive;
        }
      }
    }
    return;
  }

  reportLowStock = ((product) => {
    const documents = this.repository.getAllDocuments();
    const productStocks = new Array<ProductStock>();
    for (const document of documents) {
      if (document.stock < this.lowStockThreshold) {
        productStocks.push({
          product: document.productName,
          stock: document.stock
        });
      }
    }

    if (productStocks.length < 1) {
      return;
    }

    const requestBody: ApiPostLowStockAlertReqBody = {
      machine_id: environment.machineId,
      timestamp: (new Date()).getTime().toString(),
      stock: productStocks
    };
    this.lowStockAlertApiService.postLowStockAlert(requestBody)
      .subscribe(this.lowStockAlertSuccessHandler, this.lowStockAlertErrorHandler);
  });
}

class DrinkRunOutError extends Error {
  product: Product;

  constructor(product) {
    super();

    this.product = product;
  }
}

class DrinkNotAvailableError extends Error {
}

export {ContentsService, DrinkRunOutError, DrinkNotAvailableError};
