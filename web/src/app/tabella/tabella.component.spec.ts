import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabellaComponent } from './tabella.component';

describe('TabellaStudentComponent', () => {
  let component: TabellaComponent;
  let fixture: ComponentFixture<TabellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabellaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
