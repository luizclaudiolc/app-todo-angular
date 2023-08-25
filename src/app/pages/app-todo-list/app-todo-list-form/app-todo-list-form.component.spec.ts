import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTodoListFormComponent } from './app-todo-list-form.component';

describe('AppTodoListFormComponent', () => {
  let component: AppTodoListFormComponent;
  let fixture: ComponentFixture<AppTodoListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTodoListFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTodoListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
