export class ResultMessage<T> {
    public IsValid: boolean;
    public CorrelationId: string;
    public Errors: any[]; // ValidationError[];
    public Data: T;
}
