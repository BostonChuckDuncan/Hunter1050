import { User } from './User';

export class Project {
  public id: number;
  public title: string;
  public description: string;
  public teamMembers: Array<User>;
  public popId: number;
  public popuation: Population;
}

export class Population {
  public id: number;
  public templateId: number;
  public opParmsId: number;
  public individualId: number;
  public popSize: number;
  public popMax: number;
  public popMin: number;
}

export class OperationParms {
  public id: number;
  public templateName: string;

  public gapOccur: number;
  public gapPointA: string;
  public gapPointB: string;

  public mutationOccur: number;
  public mutationPointA: string;
  public mutationPointB: string;

  public virusOccur: number;
  public virusPointA: string;
  public virusPointB: string;

  public parentOccur: number;
  public parentPointA: string;
  public parentPointB: string;

  public parentSimOccur: number;
  public parentSimPointA: string;
  public parentSimPointB: string;

  public parentContribOccur: number;
  public parentContribPointA: string;
  public parentContribPointB: string;

  public childSurviveOccur: number;
  public childSurvivePointA: string;
  public childSurvivePointB: string;
}

export class Individual {
  public id: number;
  public rating: number;
  public attributeId: Attribute[];
}

export class Attribute {
  public id: number;
  public attributeType: string;
}
