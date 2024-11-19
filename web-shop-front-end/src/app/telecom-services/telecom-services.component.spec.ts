import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecomServicesComponent } from './telecom-services.component';

describe('TelecomServicesComponent', () => {
  let component: TelecomServicesComponent;
  let fixture: ComponentFixture<TelecomServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelecomServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelecomServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
