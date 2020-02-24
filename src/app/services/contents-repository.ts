import {Product} from './product';
import {Injectable} from '@angular/core';

export interface ContentDocument {
  productName: string;
  stock?: number;
}

/**
 * Web local storage accessor
 */
@Injectable({
  providedIn: 'root'
})
export class ContentsRepository {
  private readonly key = 'drinkit_contents';
  private storage = window.localStorage;

  constructor() {
  }

  offer(product: Product): boolean {
    const collection = this.retrieveCollection() || {};
    if (this.hasDocument(product)) {
      if (Number.isInteger(collection[product.name].stock)) {
        collection[product.name].stock -= 1;
        this.saveCollection(collection);
        return true;
      }
    }
    return false;
  }

  retrieveCollection() {
    return JSON.parse(this.storage.getItem(this.key)) || null;
  }

  saveCollection(collection) {
    return this.storage.setItem(this.key, JSON.stringify(collection));
  }

  getAllDocuments(): Array<ContentDocument> {
    const documents = new Array<ContentDocument>();
    const collection = this.retrieveCollection() || {};
    if (collection) {
      for (const key in collection) {
        if (collection.hasOwnProperty(key)) {
          const document = collection[key];
          documents.push(document);
        }
      }
    }
    return documents;
  }

  getDocument(product: Product): ContentDocument|null {
    const collection = this.retrieveCollection() || {};
    if (collection) {
      return collection[product.name] || null;
    }
    return null;
  }

  setDocument(product: Product, document: ContentDocument): void {
    const collection = this.retrieveCollection() || {};
    collection[product.name] = document;
    return this.saveCollection(collection);
  }

  hasDocument(product: Product): boolean {
    const collection = this.retrieveCollection() || {};
    if (collection) {
      return collection.hasOwnProperty(product.name);
    }
    return false;
  }

  getStock(product: Product): number|null {
    const document = this.getDocument(product);
    if (!document) {
      return null;
    }
    return document.stock;
  }

  setStock(product: Product, stock): void {
    let document: ContentDocument = this.getDocument(product);
    if (!document) {
      document = {
        productName: product.name
      };
    }
    document.stock = Number(stock);
    return this.setDocument(product, document);
  }
}
