export class SellHouse {
    public userId: number;
    public price: number;
    public netAream2: number;
    public priceNetAream2: number;
    public grossAream2: number;
    public typology: string;
    public floor: number;
    public yearOfConstruction: number;
    public numberOfBathrooms: number;
    public enerergyCertificate: string;
    public country: string;
    public city: string;
    public address: string;
    public description: string;
    public imagesUrl?: File[];
    public characteristics?: string;

    public latitude: number;
    public longitude: number;

    public propertyTypeId: number;
    public operationTypeId: number;
}
