import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIndicatorComponent } from './stock-indicator.component';
import {HttpClientModule} from '@angular/common/http';

describe('StockIndicatorComponent', () => {
  let component: StockIndicatorComponent;
  let fixture: ComponentFixture<StockIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [ StockIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
