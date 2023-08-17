import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainTableComponent } from './rain-table.component';

describe('RainTableComponent', () => {
  let component: RainTableComponent;
  let fixture: ComponentFixture<RainTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RainTableComponent]
    });
    fixture = TestBed.createComponent(RainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
