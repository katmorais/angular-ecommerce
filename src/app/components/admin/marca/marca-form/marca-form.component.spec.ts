import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaFormComponent } from './marca-form.component';

describe('MarcaFormComponent', () => {
  let component: MarcaFormComponent;
  let fixture: ComponentFixture<MarcaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcaFormComponent]
    });
    fixture = TestBed.createComponent(MarcaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
