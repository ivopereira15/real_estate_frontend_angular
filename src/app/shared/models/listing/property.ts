import { PropertyImage } from "../images/property-image";

export class Property {
    public MySqlId: number;
    public UserId: number;
    public Price: number;
    public NetAream2: number;
    public PriceNetAream2: number;
    public GrossAream2: number;
    public Typology: string;
    public Rooms: number;
    public Floor: number;
    public YearOfConstruction: number;
    public NumberOfBathrooms: number;
    public EnergyCertificate: string;
    public Country: string;
    public City: string;
    public Address: string;
    public Description: string;
    public ImagesUrl?: File[];
    public Characteristics?: string;

    public Latitude: number;
    public Longitude: number;

    public PropertyTypeId: number;
    public OperationTypeId: number;

    public Images: PropertyImage[];
}