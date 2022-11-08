import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrprComponent } from './errpr.component';

describe('ErrprComponent', () => {
  let component: ErrprComponent;
  let fixture: ComponentFixture<ErrprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrprComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
