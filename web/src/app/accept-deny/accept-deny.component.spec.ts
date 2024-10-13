import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDenyComponent } from './accept-deny.component';

describe('AcceptDenyComponent', () => {
  let component: AcceptDenyComponent;
  let fixture: ComponentFixture<AcceptDenyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptDenyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptDenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
