import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTrainingComponent } from './recent-training.component';

describe('RecentTrainingComponent', () => {
  let component: RecentTrainingComponent;
  let fixture: ComponentFixture<RecentTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
