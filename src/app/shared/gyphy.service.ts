import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import {
  GifData,
  GiphyResult,
  PaginationEvent,
  SearchReqeust,
} from './gif.model';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  static readonly giphyUrl = 'https://api.giphy.com/v1/gifs/search';
  static readonly giphyApiKey = 'xhqWdijRRnpg71E67dCm1hwiqAmY0REI';

  private readonly rating = 'R';
  private readonly lang = 'en';

  currentOffset = 0;
  currentSearchTerm = '';
  pageSize = 9;
  totalCount = 0;

  imageResult: any[] = [];

  private _searchResultsSubject = new Subject<Array<GifData>>();
  searchResults$ = new Observable<Array<GifData>>();

  searchRequest = new Subject<SearchReqeust>();
  resetSearch = new Subject<any>();

  constructor(private http: HttpClient) {
    this.searchResults$ = this._searchResultsSubject.asObservable();

    this.searchRequest.subscribe((request) => {
      this.getSearchResults(
        request.searchTerm,
        request.offset,
        request.pageSize
      );
    });
  }

  private getSearchResults(
    searchTerm: string,
    offset: number,
    pageSize: number
  ) {
    const params = {
      api_key: GiphyService.giphyApiKey,
      q: searchTerm,
      limit: pageSize.toString(),
      offset: offset.toString(),
      rating: this.rating,
      lang: this.lang,
    };

    this.http
      .get<GiphyResult>(GiphyService.giphyUrl, { params })
      .subscribe((giphyResult) => {
        this.imageResult = giphyResult.data;
        this.totalCount = giphyResult.pagination.total_count;
        this.currentOffset = giphyResult.pagination.offset;

        this._searchResultsSubject.next(this.imageResult);
      });
  }

  search(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
    this.currentOffset = 0;

    this.imageResult = [];
    this._searchResultsSubject.next(this.imageResult);

    this.resetSearch.next(null);

    this.searchRequest.next({
      searchTerm: this.currentSearchTerm,
      offset: this.currentOffset,
      pageSize: this.pageSize,
    });
  }

  pagination(paginationEvent: PaginationEvent) {
    this.currentOffset = paginationEvent.pageIndex * this.pageSize;
    this.searchRequest.next({
      searchTerm: this.currentSearchTerm,
      offset: this.currentOffset,
      pageSize: this.pageSize,
    });
  }

  setPageSize(size: number) {
    this.pageSize = size;
  }
}
