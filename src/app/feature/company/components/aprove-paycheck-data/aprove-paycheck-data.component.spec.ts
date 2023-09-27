import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovePaycheckDataComponent } from './aprove-paycheck-data.component';

describe('AprovePaycheckDataComponent', () => {
  let component: AprovePaycheckDataComponent;
  let fixture: ComponentFixture<AprovePaycheckDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprovePaycheckDataComponent]
    });
    fixture = TestBed.createComponent(AprovePaycheckDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
