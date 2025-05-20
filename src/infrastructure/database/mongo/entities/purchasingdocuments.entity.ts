import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'purchasingdocuments' })
export class PurchasingDocumentOrmEntity extends BaseDocumentOrmEntity {}
