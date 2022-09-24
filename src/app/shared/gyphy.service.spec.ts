import { GiphyService } from './gyphy.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchReqeust } from './gif.model';

describe('GiphyService', () => {
  let service: GiphyService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GiphyService);
  });

  it('should create GiphyService', () => {
    expect(service).toBeTruthy();
  });

  it('should emit SearchReqeust', (done) => {
    let data = { searchTerm: 'text', offset: 1, pageSize: 2 };
    service.searchRequest.subscribe(value => {
      expect(value).toEqual(jasmine.objectContaining(data));
      done();
    })
    service.searchRequest.next(data);
  });
});
