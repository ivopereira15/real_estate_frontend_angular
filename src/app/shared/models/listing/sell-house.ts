import { Characteristics } from "../listing/characteristics";

export class SellHouse {
    public UserId: number;
    public Price: number;
    public NetAream2: number;
    public PriceNetAream2: number;
    public GrossAream2: number;
    public Typology: string;
    public Floor: number;
    public Rooms: number;
    public YearOfConstruction: number;
    public NumberOfBathrooms: number;
    public EnerergyCertificate: string;
    public Country: string;
    public City: string;
    public Address: string;
    public Description: string;
    public ImagesUrl?: File[];
    public Characteristics?: Characteristics[];

    public Latitude: number;
    public Longitude: number;

    public PropertyTypeId: number;
    public OperationTypeId: number;

    public photos: any[];
}
