import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GifData } from 'src/app/shared/gif.model';
import { GiphyService } from 'src/app/shared/gyphy.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public searchText: string;
  public totalCount = 0;
  public pageSize = this.giphyService.pageSize;
  public pageIndex = 0;
  public searchResults$: Observable<GifData[]>

  constructor(public giphyService: GiphyService) {
  }

  ngOnInit(): void {
  }
  search() {
    this.giphyService.search(this.searchText);
  }
  handlePageEvent(event: any) {
    this.giphyService.pagination(event);
  }
}
