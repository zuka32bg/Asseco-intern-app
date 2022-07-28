import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitTransakcijeComponent } from './split-transakcije.component';

describe('SplitTransakcijeComponent', () => {
  let component: SplitTransakcijeComponent;
  let fixture: ComponentFixture<SplitTransakcijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitTransakcijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitTransakcijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
