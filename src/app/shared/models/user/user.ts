import { Job } from './job';
import { Education } from './education';
import { Technology } from './technologies';
import { Language } from './language';

export class User {
    public id: number;
    public username = 'Jon2';
    public name: string;
    public surname: string;
    public password: string;
    public email: string;
    public phonenumber: string;
    public active: boolean;

    // EDIT PART
    public city: string;
    public coutry: string;
    public headline: string;

    public jobs: Job[];
    public educations: Education[];
    public technologies: Technology[];
    public languages: Language[];
}
