import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaildComponent } from './faild.component';

describe('FaildComponent', () => {
  let component: FaildComponent;
  let fixture: ComponentFixture<FaildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
