
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class USerService {
  baseUrl='';
  managedByApiSegment = {
    get: {
      managedBy: 'ManagedBy',
      managedByById: 'ManagedBy',
      OwnedManagedBys: 'OwnedManagedBys',
      customerChoices: "CustomerChoices",
      managedBysBasicInfo: "ManagedBysBasicInfo"
    },
    post: {
      managedBy: 'ManagedBy'
    }
  };

  constructor(private http: HttpClient) {
  }

  getCustomerChoices(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + this.managedByApiSegment.get.customerChoices);
  }

  getOwnedManagedBys(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + this.managedByApiSegment.get.OwnedManagedBys);
  }

  getManagedByById(id:number): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.managedByApiSegment.get.managedByById+"/"+id);
  }

  getManagedBys(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + this.managedByApiSegment.get.managedBy);
  }

  addManagedBy(managedbyRequest: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.managedByApiSegment.post.managedBy, managedbyRequest);
  }

  mapManagebyResponseDataToManagedbyModelsData(data: any[]) {
    let managedbyModels: any[] = [];
    data.forEach(element => {

      managedbyModels.push(this.getManagedByModel(element));
    });
    return managedbyModels
  }
  getManagedByModel(managedByModel:any)
  {
    return ({
        id: managedByModel.id,
        ManagedBy: managedByModel.ManagedByDescription + (managedByModel.ManagedByNumber ? " " + managedByModel.ManagedByNumber : "") + (managedByModel.Status ? " " + managedByModel.Status : ""),
        ManagedByNumber: managedByModel.ManagedByNumber,
        ManagedByDescription: managedByModel.ManagedByDescription,
        HouseNo: managedByModel.HouseNo,
        Street: managedByModel.Street,
        Suite: managedByModel.Suite,
        City: managedByModel.City,
        StateId: managedByModel.StateId,
        ZipCode: managedByModel.ZipCode,
        StoreNameMask: managedByModel.StoreNameMask,
        IsNationalChain: managedByModel.IsNationalChain,
        ManagementId: managedByModel.ManagementId,
        ContactPersonFirstName: managedByModel.ContactPersonFirstName,
        ContactPersonLastName: managedByModel.ContactPersonLastName,
        ContactPersonTelephoneNumber: managedByModel.ContactPersonTelephoneNumber,
        ContactEmail: managedByModel.ContactEmail,
        CustomerTypePricingInfo: this.getCustomerTypePricingInfo(managedByModel.ManagedByCustomerTypePriceInfo),
        CustomerTypesIds: this.getCustomerTypesIds(managedByModel.ManagedByCustomerType),
        CustomerTypeSalesInfo: this.getCustomerTypeSalesInfo(managedByModel.ManagedByCustomerTypeSalesInfoAML, managedByModel.ManagedByCustomerTypeSalesInfoSubTradeChannel, managedByModel.ManagedByCustomerType),
        ManagedByCustomerTypePayers: this.getCustomerTypePayers(managedByModel.ManagedByCustomerTypePayers),
        deliveryInvoiceInfo: managedByModel.DeliveryInvoiceInfo,
        Status: managedByModel.Status,
        HasManagedByNumber: managedByModel.HasManagedByNumber,
        ElectronicPurchaseOrderInfo: managedByModel.ElectronicPurchaseOrderInfo,
        ElectronicInvoiceInfo: managedByModel.ElectronicInvoiceInfo,
        AdvanceShipNoticeInfo: managedByModel.AdvanceShipNoticeInfo,
        DeliveryInfoDex: managedByModel.DeliveryInfoDex
      } );
  }
  private getCustomerTypesIds(customerTypes: any[]) {

    let customerTypesIds: number[] = [];
    customerTypes.forEach(element => {
      customerTypesIds.push(element.CustomerTypeID);
    });

    let UniqueCustomerTypeIds = customerTypesIds.filter((x, i, a) => a.indexOf(x) == i);
    return UniqueCustomerTypeIds;
  }

  getCustomerTypeSalesInfo(amls: any[], subTradeChannels: any[], customerTypes: any[]) {
    let customerTypeSalesInfo: any[] = [];
    customerTypes.forEach(customerType => {
      let model: any = {
        customerTypeId: customerType.CustomerTypeID,
        salesInfo: {
          SelectedAmls: [],
          SelectedSubTradeChannels: [],
          AmlsNotManagedByMDM: false,
          SubTradeChannelNotManagedByMDM: false
        }
      };

      let subTradechannelsList = subTradeChannels.filter(s => s.CustomerTypeId == customerType.CustomerTypeID);
      let amlsList = amls.filter(a => a.CustomerTypeId == customerType.CustomerTypeID);

      model.salesInfo.SubTradeChannelNotManagedByMDM = subTradechannelsList.some(s => s.NotManagedByMDM);
      subTradechannelsList.forEach(element => {
        if (!!element.SubTradeChannelId) {
          model.salesInfo.SelectedSubTradeChannels.push({
            id: element.SubTradeChannelId,
            SuperChannelId: element.SuperChannelId,
            TradeChannelId: element.TradeChannelId,
          } )
        }
      });

      model.salesInfo.AmlsNotManagedByMDM = amlsList.some(a => a.NotManagedByMDM);
      amlsList.forEach(element => {
        if (!!element.AMLId) {
          model.salesInfo.SelectedAmls.push({
            id: element.AMLId,
          } )
        }
      });
      customerTypeSalesInfo.push(model);
    });
    return customerTypeSalesInfo
  }

  getCustomerTypePricingInfo(pricingInfo: any[]) {
    let customerTypePricingInfo: any[] = [];

    pricingInfo.forEach(price => {

      let model: any = {
        customerTypeId: price.CustomerTypeId,
        pricingInfo: {
          primaryGroupNotManagedByMDM: price.PrimaryGroups.some(p => p.NotManagedByMDM),
          secondaryGroupNotManagedByMDM: price.SecondaryGroups.some(s => s.NotManagedByMDM),
          tradeNameNotManagedByMDM: price.TradeNames.some(t => t.NotManagedByMDM),
          localPricing: price.LocalPrimaryPricing,
          fountainLocalPricing: price.LocalFountainPricing,
          primaryGroups: price.PrimaryGroups
            .filter(p => !p.NotManagedByMDM)
            .map(primaryGroup => ({
              id: primaryGroup.PrimaryGroupId
            }) ),
          secondaryGroups: price.SecondaryGroups
            .filter(s => !s.NotManagedByMDM)
            .map(secondaryGroup => ({
              id: secondaryGroup.SecondaryGroupId
            }) ),
          tradeNames: price.TradeNames
            .filter(t => !t.NotManagedByMDM)
            .map(tradeName => ({
              id: tradeName.TradeNameId
            }) )
        }
      };

      customerTypePricingInfo.push(model);
    });

    return customerTypePricingInfo;
  }

  getCustomerTypePayers(payerInfo: any[]) {
    let customerTypePayerInfo: any[] = [];
    payerInfo.forEach(payer => {
      let model: any = {
        ManagedById: payer.ManagedById,
        CustomerTypeId: payer.CustomerTypeId,
        HasSeparatePayers: payer.HasSeparatePayers,
        CustomerTypePayerInfo: payer.CustomerTypePayerInfo.map(payerInfo => ({
          PayerId: payerInfo.PayerId,
          State: null,
          Street: null,
          ZipCode: null,
          PayerName: null,
          PayerNumber: null,
          City: null,
          HouseNumber: null,
          IsBid: null,
          AlternatePayerId: payerInfo.AlternatePayerId,
          EligibilityIndicatorId: payerInfo.EligibilityIndicatorId,
          PayTypeId: payerInfo.PayTypeId,
          PaymentTermId: payerInfo.PaymentTermId,
          PaymentOptions: payerInfo.PaymentOptionIds.map(option => ({
            id: option
          }) )
        }) )
      };
      customerTypePayerInfo.push(model);
    });

    return customerTypePayerInfo;
  }

  getManagedBysBasicInfo() {
    return this.http.get<any[]>(this.baseUrl + this.managedByApiSegment.get.managedBysBasicInfo);
  }

  mapOwnedManagedBysResponseToModel(response: any[]) {
    let managedByBasicInfoModels: any[] = [];
    response.forEach(element => {
      managedByBasicInfoModels.push({
        ...element,
        ManagedBy: element.ManagedByDescription + (element.ManagedByNumber ? " " + element.ManagedByNumber : "") + (element.StatusDescription ? " " + element.StatusDescription : "")
      } )
    });

    return managedByBasicInfoModels;
  }
  mapManagedBysBasicInfoResponseToModel(response: any[]) {
    let MBBasicInfoModels: any[] = [];
    response.forEach(element => {
      MBBasicInfoModels.push({
        ...element,
        ManagedBy: (element?.ManagedByNumber || '') + ' ' + element.ManagedByDescription + ' ' + (element?.ContributorFirstName || '') + ' ' + (element?.ContributorLastName || '') + ' ' + (element?.StatusDescription || '')
      } )
    });

    return MBBasicInfoModels;
  }
}


