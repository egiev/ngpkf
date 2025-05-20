export class PatientEntity {
  id: any;
  mrn: string;
  contact: {
    homephone?: string;
    mobilephone?: string;
    alternatephone?: string;
    emailid?: string;
  };
}
