import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadImagComponent } from './lazy-load-imag.component';

describe('LazyLoadImagComponent', () => {
  let component: LazyLoadImagComponent;
  let fixture: ComponentFixture<LazyLoadImagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyLoadImagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazyLoadImagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
