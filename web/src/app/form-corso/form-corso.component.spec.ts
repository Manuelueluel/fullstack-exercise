import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCorsoComponent } from './form-corso.component';

describe('FormCorsoComponent', () => {
  let component: FormCorsoComponent;
  let fixture: ComponentFixture<FormCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCorsoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
