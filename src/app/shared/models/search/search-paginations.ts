export class SearchPagination<T> {
    public RestrictionCriteria: T;
    public OrderBy: string;
    public OrderDescending: boolean = true;
    public PageNumber: number;
    public RowsPerPage: number;
}