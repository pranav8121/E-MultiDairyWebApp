import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DairytableComponent } from './dairytable.component';

describe('DairytableComponent', () => {
  let component: DairytableComponent;
  let fixture: ComponentFixture<DairytableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DairytableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DairytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
