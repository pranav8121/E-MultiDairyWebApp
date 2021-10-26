import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmemComponent } from './addmem.component';

describe('AddmemComponent', () => {
  let component: AddmemComponent;
  let fixture: ComponentFixture<AddmemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
