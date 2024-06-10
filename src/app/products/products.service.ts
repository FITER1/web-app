/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { SettingsService } from 'app/settings/settings.service';

/**
 * Products service.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   * @param {SettingsService} settingsService Settings Service.
   */
  constructor(private http: HttpClient,
              private settingsService: SettingsService) { }

  /**
   * @returns {Observable<any>} Loan products data
   */
  getLoanProducts(): Observable<any> {
    return this.http.get('/loanproducts');
  }

  createLoanProduct(loanProduct: string): Observable<any> {
    return this.http.post('/loanproducts', loanProduct);
  }

  getLoanProductsTemplate(): Observable<any> {
    return this.http.get('/loanproducts/template');
  }

  getLoanProduct(loanProductId: string, template: boolean = false): Observable<any> {
    const httpParams = new HttpParams().set('template', template.toString());
    return this.http.get(`/loanproducts/${loanProductId}`, { params: httpParams });
  }

  updateLoanProduct(loanProductId: string, loanProduct: any): Observable<any> {
    return this.http.put(`/loanproducts/${loanProductId}`, loanProduct);
  }

  /**
   * @returns {Observable<any>} Saving products data
   */
  getSavingProducts(): Observable<any> {
    return this.http.get('/savingsproducts');
  }

  createSavingProduct(savingProduct: string): Observable<any> {
    return this.http.post('/savingsproducts', savingProduct);
  }

  getSavingProductsTemplate(): Observable<any> {
    return this.http.get('/savingsproducts/template');
  }

  getSavingProduct(savingProductId: string, template: boolean = false): Observable<any> {
    const httpParams = new HttpParams().set('template', template.toString());
    return this.http.get(`/savingsproducts/${savingProductId}`, { params: httpParams });
  }

  updateSavingProduct(savingProductId: string, savingProduct: any): Observable<any> {
    return this.http.put(`/savingsproducts/${savingProductId}`, savingProduct);
  }

  /**
   * @returns {Observable<any>} Share products data
   */
  getShareProducts(): Observable<any> {
    return this.http.get('/products/share');
  }

  createShareProduct(shareProduct: string): Observable<any> {
    return this.http.post('/products/share', shareProduct);
  }

  getShareProductsTemplate(): Observable<any> {
    return this.http.get('/products/share/template');
  }

  getShareProduct(shareProductId: string, template: boolean = false): Observable<any> {
    const httpParams = new HttpParams().set('template', template.toString());
    return this.http.get(`/products/share/${shareProductId}`, { params: httpParams });
  }

  updateShareProduct(shareProductId: string, shareProduct: any): Observable<any> {
    return this.http.put(`/products/share/${shareProductId}`, shareProduct);
  }

  getDividends(shareProductId: string): Observable<any> {
    return this.http.get(`/shareproduct/${shareProductId}/dividend`);
  }

  /**
   * Create Dividend.
   * @param shareProductId Share Product Id.
   * @param dividendData Dividend Data.
   * @returns {Observable<any>}
   */
  createDividend(shareProductId: string, dividendData: any): Observable<any> {
    return this.http.post(`/shareproduct/${shareProductId}/dividend`, dividendData);
  }

  getDividendData(shareProductId: any, dividendId: any): Observable<any> {
    const httpParams = new HttpParams().set('dateFormat', this.settingsService.dateFormat)
                                       .set('limit', '10')
                                       .set('locale', this.settingsService.language.code)
                                       .set('offset', '0');
    return this.http.get(`/shareproduct/${shareProductId}/dividend/${dividendId}`, { params: httpParams });
  }

  approveDividend(shareProductId: any, dividendId: any, data: any): Observable<any> {
    const httpParams = new HttpParams().set('command', 'approve');
    return this.http.put(`/shareproduct/${shareProductId}/dividend/${dividendId}`, data, { params: httpParams });

  }

  /**
   * @returns {Observable<any>} Recurring deposit products data
   */
  getRecurringDepositProducts(): Observable<any> {
    return this.http.get('/recurringdepositproducts');
  }

  /**
   * @param {string} recurringDepositProductId Product Id of recurring Deposit
   * @param {boolean} template Template
   * @return {Observable<any>} Recurring Deposit Product Details
   */
  getRecurringDepositProduct(recurringDepositProductId: string, template: boolean = false): Observable<any> {
    const httpParams = new HttpParams().set('template', template.toString());
    return this.http.get(`/recurringdepositproducts/${recurringDepositProductId}`, { params: httpParams });
  }

  getRecurringDepositProductsTemplate(): Observable<any> {
    return this.http.get('/recurringdepositproducts/template');
  }

  /**
   * @returns {Observable<any>} Charges data.
   */
  getCharges(): Observable<any> {
    return this.http.get('/charges');
  }

  getChargesTemplate(): Observable<any> {
    return this.http.get('/charges/template');
  }

  /**
   * @param {string} chargeId Charge ID of charge.
   * @returns {Observable<any>} Charge.
   */
  getCharge(selectedCharge: string, template: boolean = false): Observable<any> {
    const httpParams = new HttpParams().set('template', template.toString());
    return this.http.get(`/charges/${selectedCharge}`, { params: httpParams });
  }

  /**
   * @param chargeId Charge Id to be updated.
   * @param charges  Charge Data to be updated.
   */
  updateCharge(chargeId: string, charges: any): Observable<any> {
    return this.http.put(`/charges/${chargeId}`, charges);
  }

  /**
   * @param {string} chargeId  Charge ID of Charge to be deleted.
   * @returns {Observable<any>}
   */
  deleteCharge(chargeId: string): Observable<any> {
    return this.http.delete(`/charges/${chargeId}`);
  }

  /**
   * @param {any} charge Charge to be created.
   * @returns {Observable<any>}
   */
  createCharge(charge: any): Observable<any> {
    return this.http.post('/charges', charge);
  }

  /**
   * @returns {Observable<any>} Fixed deposit products data
   */
  getFixedDepositProducts(): Observable<any> {
    return this.http.get('/fixeddepositproducts');
  }

  createFixedDepositProduct(fixedDepositProduct: string): Observable<any> {
    return this.http.post('/fixeddepositproducts', fixedDepositProduct);
  }

  getFixedDepositProductsTemplate(): Observable<any> {
    return this.http.get('/fixeddepositproducts/template');
  }

  /**
   * @param {string} fixedDepositProductId fixed deposit product ID of fixed deposit product.
   * @returns {Observable<any>} Fixed deposit product.
   */
  getFixedDepositProduct(fixedDepositProductId: string): Observable<any> {
    return this.http.get(`/fixeddepositproducts/${fixedDepositProductId}`);
  }

  getFixedDepositProductAndTemplate(fixedDepositProductId: any) {
    const httpParams = new HttpParams().set('template', 'true');
    return this.http.get(`/fixeddepositproducts/${fixedDepositProductId}`, { params: httpParams });
  }

  updateFixedDepositProduct(fixedDepositProductId: any, fixedDepositProduct: any): Observable<any> {
    return this.http.put(`/fixeddepositproducts/${fixedDepositProductId}`, fixedDepositProduct);
  }

  /**
   * @returns {Observable<any>} Tax Components data
   */
  getTaxComponents(): Observable<any> {
    return this.http.get('/taxes/component');
  }

  /**
   * @param {string} taxComponentId tax Component ID of tax Component.
   * @returns {Observable<any>} Tax Component.
   */
  getTaxComponent(taxComponentId: string): Observable<any> {
    return this.http.get(`/taxes/component/${taxComponentId}`);
  }

  /**
   * @returns {Observable<any>} Tax Components Template data.
   */
  getTaxComponentTemplate(): Observable<any> {
    return this.http.get('/taxes/component/template');
  }

  /**
   * @param {any} taxComponent Tax Component to be created.
   * @returns {Observable<any>}
   */
  createTaxComponent(taxComponent: any): Observable<any> {
    return this.http.post('/taxes/component', taxComponent);
  }

  /*
   * @param {string} taxComponentId tax Component ID of tax Component to be edited.
   * @returns {Observable<any>}
   */
  updateTaxComponent(taxComponentId: string, taxComponent: any): Observable<any> {
    return this.http.put(`/taxes/component/${taxComponentId}`, taxComponent);
  }

  /*
 * @param {any} maximumCreditRate maximumCreditRate payload.
 * @returns {Observable<any>}
 */
  updateMaximumCreditRate(maximumCreditRate: any): Observable<any> {
    return this.http.put('/loanproducts/maximumCreditRate', maximumCreditRate);
  }

  updateAdvanceQuotaConfiguration(advanceQuotaConfiguration: any): Observable<any> {
    return this.http.put('/loanproducts/advanceQuotaConfiguration', advanceQuotaConfiguration);
  }

  /**
   * @returns {Observable<any>} Tax Groups data
   */
  getTaxGroups(): Observable<any> {
    return this.http.get('/taxes/group');
  }

  /**
   * @param {string} taxGroupId Tax Component ID of Tax Component.
   * @param {string} template Template
   * @returns {Observable<any>} Tax Component.
   */
  getTaxGroup(taxGroupId: string, template: string): Observable<any> {
    const httpParams = new HttpParams().set('template', template);
    return this.http.get(`/taxes/group/${taxGroupId}`, { params: httpParams });
  }

  /**
   * @returns {Observable<any>} Tax Group Template
   */
  getTaxGroupTemplate(): Observable<any> {
    return this.http.get('/taxes/group/template');
  }

  /**
   * @param {any} taxGroup Tax Group
   * @returns {Observable<any>} Tax Group Resource Id
   */
  createTaxGroup(taxGroup: any): Observable<any> {
    return this.http.post('/taxes/group', taxGroup);
  }

  /**
   * @param {any} taxGroupId Tax Group ID
   * @param {any} taxGroup Tax Group
   * @returns {Observable<any>} Changes in the Tax Group
   */
  updateTaxGroup(taxGroupId: any, taxGroup: any): Observable<any> {
    return this.http.put(`/taxes/group/${taxGroupId}`, taxGroup);
  }

  /**
   * @returns {Observable<any>} Delinquency Range data
   */
  getDelinquencyRanges(): Observable<any> {
    return this.http.get('/delinquency/ranges');
  }

  /**
   * @param {any} delinquencyRateId Delinquency Range Id.
   * @returns {Observable<any>} Delinquency Range data.
   */
   getDelinquencyRange(delinquencyRateId: any): Observable<any> {
    return this.http.get(`/delinquency/ranges/${delinquencyRateId}`);
  }

  /**
   * @param {any} payload Delinquency Range data
   * @returns {Observable<any>} Delinquency Range Resource Id
   */
   createDelinquencyRange(payload: any): Observable<any> {
    return this.http.post('/delinquency/ranges', payload);
  }

  /**
   * @param {any} delinquencyRateId Delinquency Range ID
   * @param {any} payload Delinquency Range data
   * @returns {Observable<any>} Changes in the Delinquency Range
   */
  updateDelinquencyRange(delinquencyRateId: any, payload: any): Observable<any> {
    return this.http.put(`/delinquency/ranges/${delinquencyRateId}`, payload);
  }

  /**
   * @param {any} delinquencyRateId Delinquency Range ID
   * @returns {Observable<any>} Changes in the Delinquency Range
   */
  deleteDelinquencyRange(delinquencyRateId: any): Observable<any> {
    return this.http.delete(`/delinquency/ranges/${delinquencyRateId}`);
  }

  /**
   * @returns {Observable<any>} Delinquency Bucket data
   */
  getDelinquencyBuckets(): Observable<any> {
    return this.http.get('/delinquency/buckets');
  }

  /**
   * @param {any} delinquencyBucketId Delinquency Bucket Id.
   * @returns {Observable<any>} Delinquency Bucket data.
   */
  getDelinquencyBucket(delinquencyBucketId: any): Observable<any> {
    return this.http.get(`/delinquency/buckets/${delinquencyBucketId}`);
  }

  /**
   * @param {any} payload Delinquency Bucket data
   * @returns {Observable<any>} Delinquency Bucket Resource Id
   */
  createDelinquencyBucket(payload: any): Observable<any> {
    return this.http.post('/delinquency/buckets', payload);
  }

  /**
   * @param {any} delinquencyBucketId Delinquency Bucket ID
   * @param {any} payload Delinquency Bucket data
   * @returns {Observable<any>} Changes in the Delinquency Bucket
   */
  updateDelinquencyBucket(delinquencyBucketId: any, payload: any): Observable<any> {
    return this.http.put(`/delinquency/buckets/${delinquencyBucketId}`, payload);
  }

  /**
   * @param {any} delinquencyBucketId Delinquency Bucket ID
   * @returns {Observable<any>} Changes in the Delinquency Bucket
   */
  deleteDelinquencyBucket(delinquencyBucketId: any): Observable<any> {
    return this.http.delete(`/delinquency/buckets/${delinquencyBucketId}`);
  }

  /**
   * @returns {Observable<any>} Product mixes data
   */
  getProductMixes(): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('associations', 'productMixes');
    return this.http.get('/loanproducts', { params: httpParams });
  }

  /**
   * @returns {Observable<any>} Floating Rates data.
   */
  getFloatingRates(): Observable<any> {
    return this.http.get('/floatingrates');
  }

  /**
   * @param {any} floatingRate Floating Rate.
   * @returns {Observable<any>}
   */
  createFloatingRate(floatingRate: any): Observable<any> {
    return this.http.post('/floatingrates', floatingRate);
  }

  /**
   * @param {string} floatingRateId Floating Rate ID.
   * @returns {Observable<any>}
   */
  getFloatingRate(floatingRateId: string): Observable<any> {
    return this.http.get(`/floatingrates/${floatingRateId}`);
  }

  /**
   * @param {string} floatingRateId Floating Rate ID.
   * @param {any} floatingRate Changes in Floating Rate.
   * @returns {Observable<any>}
   */
  updateFloatingRate(floatingRateId: string, floatingRate: any): Observable<any> {
    return this.http.put(`/floatingrates/${floatingRateId}`, floatingRate);
  }

  /**
   * @param {string} productId Id of the product.
   * @returns {Observable<any>} Product.
   */
  getProductMix(productId: string): Observable<any> {
    return this.http.get(`/loanproducts/${productId}/productmix`);
  }

  /*
   * @returns {Observable<any>} Products mix Template data
   */
  getProductsMixTemplate(): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('isProductMixTemplate', 'true');
    return this.http.get('/loanproducts/template', { params: httpParams });
  }

  /**
   * @param {string} productMixId product mix ID of product mix.
   * @returns {Observable<any>} Product mix Template data
   */
  getProductMixTemplate(productMixId: string): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('template', 'true');
    return this.http.get(`/loanproducts/${productMixId}/productmix`, { params: httpParams });
  }

  /**
   * @param {string} productMixId product mix ID of product mix.
   * @param {any} productMix Product mix to be created.
   * @returns {Observable<any>}
   */
  createProductMix(productMix: any, productMixId: string): Observable<any> {
    return this.http.post(`/loanproducts/${productMixId}/productmix`, productMix);
  }

  /**
   * @param {string} productMixId product mix ID of product mix.
   * @param {any} productMix Product mix to be updaated.
   * @returns {Observable<any>}
   */
  updateProductMix(productMix: any, productMixId: string): Observable<any> {
    return this.http.put(`/loanproducts/${productMixId}/productmix`, productMix);
  }

  /**
   * @param {string} productMixId product mix ID of product mix.
   * @returns {Observable<any>}
   */
  deleteProductMix(productMixId: string): Observable<any> {
    return this.http.delete(`/loanproducts/${productMixId}/productmix`);
  }

  /*
   * @param {string} productId Product ID
   * @returns {Observable<any>}
   */
  getAllInterestRateCharts(productId: string): Observable<any> {
    const httpParams = new HttpParams().set('productId', productId);
    return this.http.get(`/interestratecharts`, { params: httpParams });
  }

  createRecurringDepositProduct(recurringDepositProduct: any): Observable<any> {
    return this.http.post('/recurringdepositproducts', recurringDepositProduct);
  }

  getRecurringDepositProductAndTemplate(recurringDepositProductId: any) {
    const httpParams = new HttpParams().set('template', 'true');
    return this.http.get(`/recurringdepositproducts/${recurringDepositProductId}`, { params: httpParams });
  }

  updateRecurringDepositProduct(recurringDepositProductId: any, recurringDepositProduct: any): Observable<any> {
    return this.http.put(`/recurringdepositproducts/${recurringDepositProductId}`, recurringDepositProduct);
  }

  /**
   * @returns {Observable<any>} Collateral data.
   */
  getCollaterals(): Observable<any> {
    return this.http.get('/collateral-management');
  }

  /**
   * @returns {Observable<any>} Collateral Template.
   */
  getCollateralTemplate(): Observable<any> {
    return this.http.get('/collateral-management/template');
  }

  /**
   * @param {string} collateralId Collateral ID of Collateral.
   * @returns {Observable<any>} Collateral.
   */
  getCollateral(collateralId: string, template: boolean = false): Observable<any> {
    const httpParams = new HttpParams().set('template', template.toString());
    return this.http.get(`/collateral-management/${collateralId}`, { params: httpParams });
  }

  /**
   * @param collateralId Collateral Id to be updated.
   * @param collateral  Collateral Data to be updated.
   */
  updateCollateral(collateralId: string, collateral: any): Observable<any> {
    return this.http.put(`/collateral-management/${collateralId}`, collateral);
  }

  /**
   * @param {string} collateralId  Collateral ID of Collateral to be deleted.
   * @returns {Observable<any>}
   */
  deleteCollateral(collateralId: string): Observable<any> {
    return this.http.delete(`/collateral-management/${collateralId}`);
  }

  /**
   * @param {any} collateral Collateral to be created.
   * @returns {Observable<any>}
   */
  createCollateral(collateral: any): Observable<any> {
    return this.http.post('/collateral-management', collateral);
  }

  /**
   * @param {string} product Product type.
   * @returns {Observable<any>}
   */
  getProductDatatables(product: string): Observable<any> {
    const httpParams = new HttpParams().set('apptable', product);
    return this.http.get(`/datatables`, { params: httpParams });
  }

  /**
   * @param {string} productId Product Id.
   * @returns {Observable<any>}
   */
  getProductDatatable(productId: string, datatableName: string) {
    const httpParams = new HttpParams().set('genericResultSet', 'true');
    return this.http.get(`/datatables/${datatableName}/${productId}`, { params: httpParams });
  }

  /**
   * @param {string} productId Product Id.
   * @param {string} datatableName Datatable name
   * @param {any} data Payload.
   * @returns {Observable<any>}
   */
  addProductDatatableEntry(productId: string, datatableName: string, data: any) {
    const httpParams = new HttpParams().set('genericResultSet', 'true');
    return this.http.post(`/datatables/${datatableName}/${productId}`, data, { params: httpParams });
  }

  /**
   * @param {string} productId Product Id.
   * @param {string} datatableName Datatable name
   * @param {any} data Payload.
   * @returns {Observable<any>}
   */
  editProductDatatableEntry(productId: string, datatableName: string, data: any) {
    const httpParams = new HttpParams().set('genericResultSet', 'true');
    return this.http.put(`/datatables/${datatableName}/${productId}`, data, { params: httpParams });
  }

  /**
   * @param {string} productId Product Id.
   * @param {string} datatableName Datatable name
   * @returns {Observable<any>}
   */
  deleteDatatableContent(productId: string, datatableName: string) {
    const httpParams = new HttpParams().set('genericResultSet', 'true');
    return this.http.delete(`/datatables/${datatableName}/${productId}`, { params: httpParams });
  }

  /**
   * @returns {Observable<any>} Maximum Credit Rate data.
   */
  getMaximumCreditRate(): Observable<any> {
    return this.http.get('/loanproducts/maximumCreditRate');
  }

  getAdvanceQuotaConfiguration(): Observable<any> {
    return this.http.get('/loanproducts/advanceQuotaConfiguration');
  }


  getChannels(): Observable<any> {
    return this.http.get('/channels');
  }

  getSubChannels(channelId: number): Observable<any> {
    return this.http.get(`/channels/${channelId}/subchannels`);
  }

  getInterestRate(interestRateId: string): Observable<any> {
    const httpParams = new HttpParams().set('template', 'true');
    return this.http.get(`/interestRates/${interestRateId}`, { params: httpParams });
  }

  getInterestRates(): Observable<any> {
    return this.http.get('/interestRates');
  }

  getInterestRateTemplate(): Observable<any> {
    return this.http.get('/interestRates/template');
  }

  createInterestRate(interestRate: any): Observable<any> {
    return this.http.post('/interestRates', interestRate);
  }
  updateInterestRate(interateRateId: string, interestRate: any): Observable<any> {
    return this.http.put(`/interestRates/${interateRateId}`, interestRate);
  }

  getInterestRateHistory(interestRateId: string, limit?: number, offset?: number): Observable<any> {
    let httpParams = new HttpParams()
      .set('orderBy', 'mirh.appliedon_date')
      .set('sortOrder', 'DESC');
    if (limit != null && offset != null) {
      httpParams = httpParams
        .set('limit', limit)
        .set('offset', offset);
    }
    return this.http.get(`/interestRates/${interestRateId}/history`, { params: httpParams });
  }
}
