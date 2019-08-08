import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Advanced } from './advanced';

describe('Advanced', () => {
  let component: Advanced;
  let fixture: ComponentFixture<Advanced>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Advanced],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Advanced);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
