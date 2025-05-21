export class LabDocumentEntity {
  id: string;
  patientuid: string;
  documents: {
    document: string;
    documentname: string;
    documenttype: string;
  }[];
}
