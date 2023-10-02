import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DairyRegisterComponent } from './dairy-register.component';

describe('DairyRegisterComponent', () => {
  let component: DairyRegisterComponent;
  let fixture: ComponentFixture<DairyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DairyRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DairyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
