import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkupdateusersComponent } from './bulkupdateusers.component';

describe('BulkupdateusersComponent', () => {
  let component: BulkupdateusersComponent;
  let fixture: ComponentFixture<BulkupdateusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkupdateusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkupdateusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
