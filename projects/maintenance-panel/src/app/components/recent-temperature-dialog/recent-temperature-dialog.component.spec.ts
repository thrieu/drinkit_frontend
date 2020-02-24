import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTemperatureDialogComponent } from './recent-temperature-dialog.component';

describe('RecentTemperatureDialogComponent', () => {
  let component: RecentTemperatureDialogComponent;
  let fixture: ComponentFixture<RecentTemperatureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentTemperatureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTemperatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
