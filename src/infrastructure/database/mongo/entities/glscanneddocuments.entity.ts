import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'glscanneddocuments' })
export class GlScannedDocumentOrmEntity extends BaseDocumentOrmEntity {}
