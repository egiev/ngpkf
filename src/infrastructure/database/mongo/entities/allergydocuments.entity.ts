import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'allergydocuments' })
export class AllergyDocumentOrmEntity extends BaseDocumentOrmEntity {}
