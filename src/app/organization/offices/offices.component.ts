/** Angular Imports */
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';

/** rxjs Imports */
import { of } from 'rxjs';
import { OfficeNode } from './office-node.model';
import { OfficeTreeService } from './office-tree.service';

/**
 * Offices component.
 */
@Component({
  selector: 'mifosx-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss']
})
export class OfficesComponent implements OnInit {

  /** Offices data. */
  officesData: any;
  /** Columns to be displayed in offices table. */
  displayedColumns: string[] = ['name', 'externalId', 'parentName', 'openingDate'];
  /** Data source for offices table. */
  dataSource: MatTableDataSource<any>;

  /** Paginator for offices table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  /** Sorter for offices table. */
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /** Button toggle group form control for type of view. (list/tree) */
  viewGroup = new FormControl('listView');
  /** Nested tree control for chart of accounts tree. */
  nestedTreeControl: NestedTreeControl<OfficeNode>;
  /** Nested tree data source for chart of accounts tree. */
  nestedTreeDataSource: MatTreeNestedDataSource<OfficeNode>;
  /** Selected GL Account. */
  office: OfficeNode;

  /**
   * Retrieves the offices data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor(private route: ActivatedRoute, 
               private officeTreeService: OfficeTreeService) {
    this.route.data.subscribe(( data: { offices: any }) => {
      this.officesData = data.offices;
      this.officeTreeService.initialize(this.officesData);
    });
    this.nestedTreeControl = new NestedTreeControl<OfficeNode>(this._getChildren);
    this.nestedTreeDataSource = new MatTreeNestedDataSource<OfficeNode>();
    console.log(this.nestedTreeDataSource);
  }

  /**
   * Filters data in offices table based on passed value.
   * @param {string} filterValue Value to filter data.
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Sets the offices table.
   */
  ngOnInit() {
    this.setOffices();
    this.officeTreeService.treeDataChange.subscribe((officeTreeData: OfficeNode[]) => {
      this.nestedTreeDataSource.data = officeTreeData;
      this.nestedTreeControl.expand(this.nestedTreeDataSource.data[0]);
      this.nestedTreeControl.dataNodes = officeTreeData;
      console.log( this.nestedTreeDataSource.data, this.nestedTreeControl.dataNodes);
    });
  }

  /**
   * Initializes the data source, paginator and sorter for offices table.
   */
  setOffices() {
    this.dataSource = new MatTableDataSource(this.officesData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * View selected office.
   * @param {OfficeNode} office Office to be viewed.
   */
   viewOfficeNode(office: OfficeNode) {
    if (office.id) {
      this.office = office;
    } else {
      delete this.office;
    }
  }

   /**
   * Checks if selected node in tree has children.
   */
    hasNestedChild = (_: number, node: OfficeNode) => node.children.length;

    /**
     * Gets the children of selected node in tree.
     */
    private _getChildren = (node: OfficeNode) => of(node.children);

}
