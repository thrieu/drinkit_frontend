import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPortComponent } from './delivery-port.component';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContentsService} from '../../services/contents.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

describe('DeliveryPortComponent', () => {
  let service: ContentsService;
  let component: DeliveryPortComponent;
  let fixture: ComponentFixture<DeliveryPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatSnackBarModule
      ],
      declarations: [ DeliveryPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPortComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(ContentsService);
    service.initStocks();
    const coffee = service.resolveProductByName('coffee');
    component.drink = coffee;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
