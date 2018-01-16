import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductoryContentComponent } from './introductory-content.component';

describe('IntroductoryContentComponent', () => {
  let component: IntroductoryContentComponent;
  let fixture: ComponentFixture<IntroductoryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductoryContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
