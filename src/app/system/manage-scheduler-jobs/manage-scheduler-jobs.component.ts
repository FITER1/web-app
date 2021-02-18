/** Angular Imports */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { SystemService } from '../system.service';

/** rxjs Imports */
import { of } from 'rxjs';

/**
 * Manage scheduler jobs component.
 */
@Component({
  selector: 'mifosx-manage-scheduler-jobs',
  templateUrl: './manage-scheduler-jobs.component.html',
  styleUrls: ['./manage-scheduler-jobs.component.scss']
})
export class ManageSchedulerJobsComponent implements OnInit {

  /** Jobs data. */
  jobData: any;
  /** Scheduler data */
  schedulerData: any;
  /** Columns to be displayed in manage scheduler jobs table. */
  displayedColumns: string[] = ['run', 'displayName', 'nextRunTime', 'previousRunTime', 'previousRunStatus', 'currentlyRunning', 'errorLog'];
  /** Data source for manage scheduler jobs table. */
  dataSource: MatTableDataSource<any>;
  /** Initialize Selection */
  selection = new SelectionModel<any>(true, []);

  /** Paginator for table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  /** Sorter for manage scheduler jobs table. */
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * Retrieves the scheduler jobs data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              private systemService: SystemService) {
    this.route.data.subscribe((data: { jobsScheduler: any }) => {
      this.jobData = data.jobsScheduler[0];
      this.schedulerData = data.jobsScheduler[1];
    });
  }

  /**
   * Filters data in manage scheduler jobs table based on passed value.
   * @param {string} filterValue Value to filter data.
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Sets the manage scheduler jobs table.
   */
  ngOnInit() {
    this.setJobs();
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'previousRunStatus': return item.lastRunHistory.status;
        case 'errorLog': return item.lastRunHistory.status;
        case 'previousRunTime': return new Date(item.lastRunHistory.jobRunStartTime);
        case 'nextRunTime': return new Date(item.nextRunTime);
        default: return item[property];
      }
    };
  }

  /**
   * Initializes the data source, paginator and sorter for manage scheduler jobs table.
   */
  setJobs() {
    this.dataSource = new MatTableDataSource(this.jobData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  reload() {
    const url: string = this.router.url;
    this.router.navigateByUrl(`/system/scheduler-jobs`, {skipLocationChange: true})
      .then(() => this.router.navigate([url]));
  }

  runJob(jobId: string){
    this.systemService.runSelectedJob(jobId)
      .subscribe((response: any) => {
        this.reload();
      });
  }
}
