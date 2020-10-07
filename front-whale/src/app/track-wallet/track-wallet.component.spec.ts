import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWalletComponent } from './track-wallet.component';

describe('TrackWalletComponent', () => {
  let component: TrackWalletComponent;
  let fixture: ComponentFixture<TrackWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
