import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPhoto2012Component } from './album-photo-2012.component';

describe('AlbumPhoto2012Component', () => {
  let component: AlbumPhoto2012Component;
  let fixture: ComponentFixture<AlbumPhoto2012Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPhoto2012Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPhoto2012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
