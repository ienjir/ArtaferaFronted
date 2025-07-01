import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtdisplayComponent } from './artdisplay.component';

describe('ArtdisplayComponent', () => {
  let component: ArtdisplayComponent;
  let fixture: ComponentFixture<ArtdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtdisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
