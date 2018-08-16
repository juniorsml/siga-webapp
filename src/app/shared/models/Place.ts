import { FeatureCollection } from 'geojson';

import { FeatureStyle } from './FeatureStyle';
import { EntityType } from './EntityType';
import { Tag } from './Tag';

export class Place {
  constructor(name, description, clientIds, featureStyle, entityType, documentId, tags, featureCollection) {
    this.name = name;
    this.description = description;
    this.clientIds = clientIds;
    this.featureStyle = featureStyle;
    this.entityType = entityType;
    this.documentId = documentId;
    this.tags = tags;
    this.featureCollection = featureCollection;
  }

  name: string;
  description: string;
  clientIds: Object;
  featureStyle: FeatureStyle;
  entityType: EntityType;
  documentId: string;
  tags: Array<Tag>;
  featureCollection: FeatureCollection;

  public static create(name, description, clientIds, featureStyle, entityType, documentId, tags, featureCollection) {
    return new Place(name, description, clientIds, featureStyle, entityType, documentId, tags, featureCollection);
  }
}
