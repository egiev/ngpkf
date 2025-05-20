import { Entity } from '@mikro-orm/core';
import { BaseDocumentOrmEntity } from './document';

@Entity({ collection: 'patientreferraldetaildocuments' })
export class PatientReferralDetailDocumentOrmEntity extends BaseDocumentOrmEntity {}
