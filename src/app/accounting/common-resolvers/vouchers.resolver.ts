import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {AccountingService} from '../accounting.service';
import {Observable} from 'rxjs';

@Injectable()
export class VouchersResolver implements Resolve<Object>{

  /**
   * @param {AccountingService} accountingService Accounting service.
   */
  constructor(private accountingService: AccountingService) {}

  /**
   * Returns the accounting rules associations data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.accountingService.getVoucherTemplate();
  }

}
