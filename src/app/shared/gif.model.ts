export interface GiphyResult {
  data: Array<GifData>;
  pagination: {
    count: number;
    offset: number;
    total_count:number;
  };
}

export interface GifData {
  images: {
    fixed_width: {
      url: string;
    };
  };
  title: string;
}

export interface SearchReqeust {
  searchTerm: string;
  offset: number;
  pageSize: number;
}
export interface PaginationEvent {
  length: number;
  pageIndex :number;
  pageSize : number;
  previousPageIndex : number
}
