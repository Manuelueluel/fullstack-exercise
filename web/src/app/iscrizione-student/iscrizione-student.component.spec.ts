import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IscrizioneStudentComponent } from './iscrizione-student.component';

describe('IscrizioneStudentComponent', () => {
  let component: IscrizioneStudentComponent;
  let fixture: ComponentFixture<IscrizioneStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IscrizioneStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IscrizioneStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
