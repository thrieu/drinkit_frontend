// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Coffee, Milk, Sugar, Tea} from '../app/services/product';

export const environment = {
  production: false,

  machineId: '123',
  baseApiUrl: 'http://localhost:3000',
  providedDrinks: [Tea, Coffee],
  initialStocks: [
    {
      product: Tea,
      stocks: 100,
    },
    {
      product: Coffee,
      stocks: 90,
    },
    {
      product: Milk,
      stocks: 150,
    },
    {
      product: Sugar,
      stocks: 120,
    },
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
