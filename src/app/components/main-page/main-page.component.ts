import { Component, OnInit } from '@angular/core';
import { GifData } from 'src/app/shared/gif.model';
import { GiphyService } from 'src/app/shared/gyphy.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public searchText: string;
  totalCount = 0;
  pageSize = this.giphyService.pageSize;
  pageIndex = 0;
    searchResult: GifData[];



  constructor(public giphyService: GiphyService) {
    this.giphyService.searchResults$.subscribe(data => {
      this.searchResult = data;
      this.totalCount = this.giphyService.totalCount;
    }
    )
   }

  ngOnInit(): void {
    this.giphyService.search('');
  }
  search() {
    this.giphyService.search(this.searchText);
  }
  resetSearch () {
    this.giphyService.search('')
  }
  handlePageEvent(event:any) {
    this.giphyService.pagination(event);
  }
}
