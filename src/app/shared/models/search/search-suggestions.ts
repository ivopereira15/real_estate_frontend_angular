import { SearchSuggestion } from "./search-suggestion";

export interface SearchSuggestions {
    query: string;
    results: SearchSuggestion[];
  }