export class ResultMessage<T> {
    public isValid: boolean;
    public correlationId: string;
    public errors: any[]; // ValidationError[];
    public data: T;
}
