import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'taskdocuments' })
export class TaskDocumentOrmEntity extends BaseDocumentOrmEntity {}
