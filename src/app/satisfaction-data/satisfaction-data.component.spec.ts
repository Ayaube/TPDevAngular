import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionDataComponent } from './satisfaction-data.component';

describe('SatisfactionDataComponent', () => {
  let component: SatisfactionDataComponent;
  let fixture: ComponentFixture<SatisfactionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatisfactionDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SatisfactionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
