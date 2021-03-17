import { TestBed } from '@angular/core/testing';

import { MakerChekerInterceptor } from './maker-cheker.interceptor';

describe('MakerChekerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MakerChekerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MakerChekerInterceptor = TestBed.inject(MakerChekerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
