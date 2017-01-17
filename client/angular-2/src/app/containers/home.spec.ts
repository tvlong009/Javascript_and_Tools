import { TestBed, inject, async } from '@angular/core/testing';

import { HomeContainer } from './home';

describe('HomeContainer', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [HomeContainer]
    });
  }));

  it('should have a name', inject([HomeContainer], (home) => {
    expect(home.name).toEqual('angular2-assignment');
  }));

});