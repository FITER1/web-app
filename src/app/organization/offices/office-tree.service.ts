import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OfficeNode } from './office-node.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeTreeService {

  /** Office data. */
  officeData: any;
  /** Office tree data behavior subject to represent office tree nodes. */
  treeDataChange = new BehaviorSubject<OfficeNode[]>([]);

  /**
   * Gets the office tree nodes.
   */
  get treeData(): OfficeNode[] { return this.treeDataChange.value; }

  constructor(private datePipe: DatePipe) {  }

  /**
   * Builds the office tree and emits the value.
   * @param {any} officeData Office data.
   */
  initialize(officeData: any) {
    const treeData = this.buildGLAccountTree(officeData);
    this.treeDataChange.next(treeData);
  }

  /**
   * Builds and returns the offices tree.
   * @param {any} officeData office data.
   * @returns {GLAccountNode[]} office tree nodes.
   */
  buildGLAccountTree(officeData: any): OfficeNode[] {
    const officeTree: OfficeNode[] = [];

    // Header nodes
    officeTree.push(new OfficeNode('OFFICES'));
  

    // Sort by parent id (so that child nodes can be added properly)
    officeData.sort((officeOne: any, officeTwo: any) => {
      if (!officeOne.parentId) {
        officeOne.parentId = 0;
      }
      return officeOne.parentId - officeTwo.parentId;
    });

    const offices: OfficeNode[] = [];

    // Add offices to any array where index for each is denoted by its id
    for (const office of officeData) {
      console.log(office, "office for");
      offices[office.id] =
        new OfficeNode(office.name, office.externalId, office.parentName, this.datePipe.transform(office.openingDate, 'dd-MM-yy'), office.id);
    }

    // Construct office tree by adding all nodes belonging to headers (with parent id = 0) by their type,
    // and rest as children to respective parent nodes.
    for (const office of officeData) {
      let i=0;
      if (!office.parentId) {
        if (office.name === 'Head Office') {
          officeTree[i].children.push(offices[office.id]);
          i++;
        } 
      } else {
        if(office.parentId)
        {
          if(offices[office.parentId]){
            offices[office.parentId].children.push(offices[office.id]);
          }else{officeTree[i].children[0].children.push(offices[office.id]);i++;}
         
        }
      }
    }

    return officeTree;
  }
}
