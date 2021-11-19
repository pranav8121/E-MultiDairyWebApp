import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyregComponent } from './dailyreg.component';

describe('DailyregComponent', () => {
  let component: DailyregComponent;
  let fixture: ComponentFixture<DailyregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
