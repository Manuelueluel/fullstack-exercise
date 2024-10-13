import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaStudentComponent } from './pagina-student.component';

describe('PaginaStudentComponent', () => {
  let component: PaginaStudentComponent;
  let fixture: ComponentFixture<PaginaStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
