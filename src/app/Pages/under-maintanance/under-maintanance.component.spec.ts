import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderMaintananceComponent } from './under-maintanance.component';

describe('UnderMaintananceComponent', () => {
  let component: UnderMaintananceComponent;
  let fixture: ComponentFixture<UnderMaintananceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderMaintananceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderMaintananceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
