import { FormArray } from '@angular/forms';

export interface FormState {
    location: string;
    purposeType: number;
    propertyType: string;
    priceFrom: number;
    priceTo: number;
    bedrooms: string;
    bathrooms: string;
    conditions: string;
    sizeTo: number;
    sizeFrom: number;
    yearBuiltFrom: number;
    yearBuiltTo: number;
}

export const initialState: FormState =
{
    location: '',
    purposeType: 0,
    propertyType: null,
    priceFrom: 0,
    priceTo: 0,
    bedrooms: '',
    bathrooms: '',
    conditions: '',
    sizeTo:  0,
    sizeFrom:  0,
    yearBuiltFrom: 0,
    yearBuiltTo: 0,
};
