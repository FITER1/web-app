/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { SavingsService } from '../savings.service';

/**
 * Savings Account Transaction data resolver.
 */
@Injectable()
export class SavingsAccountOnHoldResolver implements Resolve<Object> {

  /**
   * @param {SavingsService} SavingsService Savings service.
   */
  constructor(private savingsService: SavingsService) { }

  /**
   * Returns the Savings Account guaranteed loans data.
   * @param {ActivatedRouteSnapshot} route Route Snapshot
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const savingAccountId = route.parent.paramMap.get('savingAccountId');
    return this.savingsService.getGuarateedLoansForSavingsAccount(savingAccountId);
  }

}