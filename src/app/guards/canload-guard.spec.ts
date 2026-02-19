import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
// Importación vital para que el test reconozca al guardia
import { canloadGuard } from './canload-guard'; 

describe('canloadGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canloadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});