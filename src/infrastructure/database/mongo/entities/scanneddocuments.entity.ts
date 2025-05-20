import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'scanneddocuments' })
export class ScannedDocumentOrmEntity extends BaseDocumentOrmEntity {}
