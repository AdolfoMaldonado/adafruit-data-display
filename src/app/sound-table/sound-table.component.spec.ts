import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundTableComponent } from './sound-table.component';

describe('SoundTableComponent', () => {
  let component: SoundTableComponent;
  let fixture: ComponentFixture<SoundTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoundTableComponent]
    });
    fixture = TestBed.createComponent(SoundTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
