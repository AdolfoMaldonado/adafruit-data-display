import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuminityTableComponent } from './luminity-table.component';

describe('LuminityTableComponent', () => {
  let component: LuminityTableComponent;
  let fixture: ComponentFixture<LuminityTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LuminityTableComponent]
    });
    fixture = TestBed.createComponent(LuminityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
