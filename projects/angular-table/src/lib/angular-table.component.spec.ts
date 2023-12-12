import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTableComponent } from './angular-table.component';

describe('AngularTableComponent', () => {
  let component: AngularTableComponent;
  let fixture: ComponentFixture<AngularTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
