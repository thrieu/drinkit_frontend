import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDataGridComponent } from './machine-data-grid.component';

describe('MachineDataGridComponent', () => {
  let component: MachineDataGridComponent;
  let fixture: ComponentFixture<MachineDataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineDataGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
