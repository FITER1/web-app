/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ClientsService } from '../clients.service';

/**
 * Client Documents resolver.
 */
@Injectable()
export class ClientDocumentsTemplateResolver implements Resolve<Object> {

    /**
     * @param {ClientsService} ClientsService Clients service.
     */
    constructor(private clientsService: ClientsService) { }

    /**
     * Returns the Client's Documents template data.
     * @returns {Observable<any>}
     */
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const clientId = route.parent.paramMap.get('clientId');
        return this.clientsService.getClientDocumentsTemplate(clientId);
    }

}
