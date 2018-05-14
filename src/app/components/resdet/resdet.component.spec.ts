import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResdetComponent } from './resdet.component';

describe('ResdetComponent', () => {
  let component: ResdetComponent;
  let fixture: ComponentFixture<ResdetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResdetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
