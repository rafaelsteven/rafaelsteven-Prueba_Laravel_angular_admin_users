import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUserModalComponent } from './crear-user-modal.component';

describe('CrearUserModalComponent', () => {
  let component: CrearUserModalComponent;
  let fixture: ComponentFixture<CrearUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearUserModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
