import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureTableComponent } from './temperature-table.component';

describe('TemperatureTableComponent', () => {
  let component: TemperatureTableComponent;
  let fixture: ComponentFixture<TemperatureTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemperatureTableComponent]
    });
    fixture = TestBed.createComponent(TemperatureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
