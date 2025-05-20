import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'clinicalscanneddocuments' })
export class ClinicalScannedDocumentOrmEntity extends BaseDocumentOrmEntity {}
