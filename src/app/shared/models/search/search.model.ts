import { FormArray } from '@angular/forms';

export interface FormState {
    location: string;
    purposeType: string;
    propertyType: string;
    priceFrom: number;
    priceTo: number;
    bedrooms: string;
    bathrooms: string;
    conditions: string;
    sizeTo: string;
    sizeFrom: string;
    yearBuiltFrom: number;
    yearBuiltTo: number;
}

export const initialState: FormState =
{
    location: '',
    purposeType: '',
    propertyType: '',
    priceFrom: 0,
    priceTo: 0,
    bedrooms: '',
    bathrooms: '',
    conditions: '',
    sizeTo: '',
    sizeFrom: '',
    yearBuiltFrom: 0,
    yearBuiltTo: 0,
};
