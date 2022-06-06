/**
 * Office Node model.
 */
export class OfficeNode {

    /** GL Account Node children. */
  children: OfficeNode[];

  id: number
  officeName: string;
  externalId: string;
  parentOffice: string;
  openedOn: string;

  constructor(officeName: string,
              externalId: string = '',
              parentOffice: string = '',
              openedOn: string = '',
              id:number=0
              ) {
    this.id = id
    this.officeName = officeName;
    this.externalId = externalId;
    this.parentOffice = parentOffice;
    this.openedOn = openedOn;
    this.children = [];
  }
}
