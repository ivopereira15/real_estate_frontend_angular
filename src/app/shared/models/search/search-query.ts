import { SearchResults } from "./search-results";
import { SearchStateEnum } from "./search-state-enum";

export interface SearchQuery {
    state: SearchStateEnum;
    data: SearchResults;
    error: string;
  }