import { TestBed } from '@angular/core/testing';

import { ContentsService } from './contents.service';
import {HttpClientModule} from '@angular/common/http';
import {ContentsRepository} from './contents-repository';
import {environment} from '../../environments/environment';

describe('ContentsService', () => {
  let service: ContentsService;
  let repo: ContentsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ContentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize correct stock', () => {
    service = TestBed.inject(ContentsService);
    service.initStocks();

    repo = TestBed.inject(ContentsRepository);
    for (const initialStock of environment.initialStocks) {
      const document = repo.getDocument(initialStock.product);
      expect(initialStock.stocks).toEqual(document.stock);
    }
  });

  it('should offer coffee', () => {
    service = TestBed.inject(ContentsService);
    service.initStocks();
    const coffee = service.resolveProductByName('coffee');
    try {
      service.offer(coffee);
    } catch (e) {
      console.log(e);
    }

    let coffeeInitialStock;
    for (const initialStock of environment.initialStocks) {
      if (initialStock.product === coffee) {
        coffeeInitialStock = initialStock;
        break;
      }
    }

    repo = TestBed.inject(ContentsRepository);
    expect(repo.getDocument(coffee).stock).toEqual(coffeeInitialStock.stocks - 1);
  });

  it('should offer tea with milk', () => {
    service = TestBed.inject(ContentsService);
    service.initStocks();
    const coffee = service.resolveProductByName('coffee');
    const milk = service.resolveProductByName('milk');
    service.offer(coffee, milk);

    let coffeeInitialStock;
    for (const initialStock of environment.initialStocks) {
      if (initialStock.product === coffee) {
        coffeeInitialStock = initialStock;
        break;
      }
    }
    let milkInitialStock;
    for (const initialStock of environment.initialStocks) {
      if (initialStock.product === milk) {
        milkInitialStock = initialStock;
        break;
      }
    }

    repo = TestBed.inject(ContentsRepository);
    expect(repo.getDocument(coffee).stock).toEqual(coffeeInitialStock.stocks - 1);
    expect(repo.getDocument(milk).stock).toEqual(milkInitialStock.stocks - 1);
  });
});
