import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragLightComponent } from './drag-light.component';

describe('DragLightComponent', () => {
  let component: DragLightComponent;
  let fixture: ComponentFixture<DragLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragLightComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
