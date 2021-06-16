import { SearchResult } from "./search-result";

export interface SearchResults {
    query: string;
    results: SearchResult[];
  }