import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfairComponent } from './addfair.component';

describe('AddfairComponent', () => {
  let component: AddfairComponent;
  let fixture: ComponentFixture<AddfairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
