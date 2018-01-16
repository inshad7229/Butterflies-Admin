import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesIconsComponent } from './hobbies-icons.component';

describe('HobbiesIconsComponent', () => {
  let component: HobbiesIconsComponent;
  let fixture: ComponentFixture<HobbiesIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HobbiesIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbiesIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
