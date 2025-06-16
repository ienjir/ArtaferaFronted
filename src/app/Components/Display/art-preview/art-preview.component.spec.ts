import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtPreviewComponent } from './art-preview.component';

describe('ArtPreviewComponent', () => {
  let component: ArtPreviewComponent;
  let fixture: ComponentFixture<ArtPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
