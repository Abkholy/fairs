import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservComponent } from './reserv.component';

describe('ReservComponent', () => {
  let component: ReservComponent;
  let fixture: ComponentFixture<ReservComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
