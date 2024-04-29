import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoansService } from '../loans.service';

@Injectable({
  providedIn: 'root'
})
export class LoanRescheduleRepaymentScheduleResolver implements Resolve<any> {

    /**
     * @param {LoansService} LoansService Loans service.
     */
    constructor(private loansService: LoansService) { }

    /**
     * Returns the Loans data.
     * @returns {Observable<any>}
     */
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
      const rescheduleRequestId = route.paramMap.get('reschedulerequestId');
      return this.loansService.retrieveLoanRescheduleRepaymentSchedule(rescheduleRequestId);
    }

}
