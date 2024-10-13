import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCorsoComponent } from './pagina-corso.component';

describe('PaginaCorsoComponent', () => {
  let component: PaginaCorsoComponent;
  let fixture: ComponentFixture<PaginaCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaCorsoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
