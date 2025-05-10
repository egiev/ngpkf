export class PatientEntity {
  _id?: string;
  mrn: string;
  fullName: string;
  contact: { email: string; mobile: string };
  results?: {
    _id?: string;
    base64: string;
  }[];
}
