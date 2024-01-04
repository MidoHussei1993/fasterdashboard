// export const BaseURL = 'http://api.faster.sa:5005';
export const BaseURL = 'https://api.faster.sa:5001';

export const FasterAPI = BaseURL + '/api';

enum OperationEnum {
  SEARCH = '/Search',
  GET_DDL = '/GetDDL',
  GET_BY_ID = '/GetById/',
  ADD = '/Add',
  UPDATE = '/Update',
  DELETE = '/Delete/',
  DEACTIVE = '/ChangeCoboneActivation',
  DeactivateCategory = '/changeActivation',
}

export class END_POINTS {
  // faster login

  public static Identity = {
    login: FasterAPI + '/Identity/dashBoardLogin',
    refreshToken: FasterAPI + '/Identity/refreshToken',
    getUsers: FasterAPI + '/Identity/users',
    password: FasterAPI + '/Identity/changePassword',
    reset: FasterAPI + '/Identity/resetPassword',
    newPass: FasterAPI + '/Identity/forgetPassword/resetPassword',
    forgetPassword: FasterAPI + '/Identity/forgetPassword',
    getProviderRigesterTypeDDL:
      FasterAPI + '/Identity/getProviderRigesterTypeDDL',
    getCustomers: FasterAPI + '/Identity/customers',
    getProfile: FasterAPI + '/Identity/profile',
    getExistRoles: FasterAPI + '/Identity/getExistRoles',
    updateUserRoles: FasterAPI + '/Identity/updateUserRoles',
    uploadImage: FasterAPI + '/Identity/uploadImage',
    createDashboardUser: FasterAPI + '/Identity/createDashboardUser',
    updateDashBoardUserProfile:
      FasterAPI + '/Identity/updateDashBoardUserProfile',
    updateProfileImage: FasterAPI + '/Identity/updateProfileImage',
    getUserRoles: (userId: string) =>
      FasterAPI + `/Identity/getUserRoles/${userId}`,
    setUserActive: (userId: string) =>
      FasterAPI + `/Identity/setUserActive/${userId}`,
    setUserDeActive: (userId: string) =>
      FasterAPI + `/Identity/setUserDeActivate/${userId}`,
    getProviders: FasterAPI + '/Identity/providers',
    getFullProviderProfile: (userId: string) =>
      FasterAPI + `/Identity/getFullProviderProfile/${userId}`,
    updateProvider: (userId: string) =>
      FasterAPI + `/Identity/updateProvider/${userId}`,
    approveProvider: (userId: string) =>
      FasterAPI + `/Identity/approveProvider/${userId}`,
    changeUserActivate: (userId: string) =>
      FasterAPI + `/Identity/changeUserActivate/${userId}`,
    getUserById: (userId: string) =>
      FasterAPI + `/Identity/getUserById/${userId}`,
    createProvider: FasterAPI + '/Identity/provider/register',
    GetPaymentTypesDDL: FasterAPI + '/Identity/GetPaymentTypesDDL',
    getPriviledge: (userId: string) =>
      FasterAPI + `/Identity/getUserRoleAndPrivileges/${userId}`,
    addUserPrivileges: (userId: string, privilegeId: string) =>
      FasterAPI + `/Identity/addUserPrivileges/${userId}/${privilegeId}`,
    ChangeUserPrivilegesStatus: (userId: string, privilegeId: string) =>
      FasterAPI +
      `/Identity/ChangeUserPrivilegesStatus/${userId}/${privilegeId}`,
    updateFirebaseToken: FasterAPI + '/Identity/updateFirebaseToken',
  };

  // faster profile
  public static profile = FasterAPI + '/Identity/profile';

  public static Shop = {
    search: FasterAPI + '/Shop' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/Shop' + OperationEnum.GET_DDL,
    UploadImage: FasterAPI + '/Shop/UploadImage',
    DownloadExcelSample: FasterAPI + '/Shop/DownloadExcelSample',
    AddByExcel: FasterAPI + '/Shop/AddByExcel',
    getById: FasterAPI + '/Shop' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/Shop' + OperationEnum.ADD,
    update: FasterAPI + '/Shop' + OperationEnum.UPDATE,
    getShopBranchsOrderReport: FasterAPI + '/Shop/ShopBranchsOrderReport',
    changePartnerStatus: (shopId: number) =>
      FasterAPI + `/Shop/ChangePartnerStatus/${shopId}`,
    GetFoodTypesByShopId: (shopId: number) =>
      FasterAPI + `/Shop/GetFoodTypesByShopId/${shopId}`,
    ChangeAllShopBranchesActivation: (shopId: number, status: boolean) =>
      FasterAPI + `/Shop/ChangeAllShopBranchesActivation/${shopId}/${status}`,
    GetDispatchTypeDDL: FasterAPI + '/Shop/GetDispatchTypeDDL',
    ChangeDispatchType: (shopId: number) =>
      FasterAPI + `/Shop/ChangeDispatchType/${shopId}`,
  };

  public static Country = {
    search: FasterAPI + '/Country' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/Country' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/Country' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/Country' + OperationEnum.ADD,
    update: FasterAPI + '/Country' + OperationEnum.UPDATE,
  };
  public static City = {
    search: FasterAPI + '/City' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/City' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/City' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/City' + OperationEnum.ADD,
    update: FasterAPI + '/City' + OperationEnum.UPDATE,
  };
  public static Cobone = {
    search: FasterAPI + '/Cobone' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/Cobone' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/Cobone' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/Cobone' + OperationEnum.ADD,
    update: FasterAPI + '/Cobone' + OperationEnum.UPDATE,
    deactive: FasterAPI + '/Cobone' + OperationEnum.DEACTIVE,
    GetCoboneTypeDDL: FasterAPI + '/Cobone/GetCoboneTypeDDL',
    ChangeActivation: (id: string) =>
      FasterAPI + `/Cobone/ChangeCoboneActivation/${id}`,
  };
  public static category = {
    search: FasterAPI + '/Category' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/Category' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/Category' + OperationEnum.GET_BY_ID,

    add: FasterAPI + '/Category' + OperationEnum.ADD,
    update: FasterAPI + '/Category' + OperationEnum.UPDATE,
    deactive: FasterAPI + '/Category' + OperationEnum.DeactivateCategory,
    uploadImage: FasterAPI + '/Category/uploadImage',
  };

  public static Addition = {
    search: FasterAPI + '/AdditionalOption' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/AdditionalOption' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/AdditionalOption' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/AdditionalOption' + OperationEnum.ADD,
    update: FasterAPI + '/AdditionalOption' + OperationEnum.UPDATE,
  };

  public static bundle = {
    search: FasterAPI + '/BundlesOffer' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/BundlesOffer' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/BundlesOffer' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/BundlesOffer' + OperationEnum.ADD,
    update: FasterAPI + '/BundlesOffer' + OperationEnum.UPDATE,
    ChangeActivation: (id: string) =>
      FasterAPI + `/BundlesOffer/ChangeActivation/${id}`,
  };

  public static offer = {
    search: FasterAPI + '/Offer' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/Offer' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/Offer' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/Offer' + OperationEnum.ADD,
    update: FasterAPI + '/Offer' + OperationEnum.UPDATE,
  };

  public static ShopType = {
    search: FasterAPI + '/ShopType' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/ShopType' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/ShopType' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/ShopType' + OperationEnum.ADD,
    update: FasterAPI + '/ShopType' + OperationEnum.UPDATE,
    delete: FasterAPI + '/ShopType' + OperationEnum.DELETE,
    UploadImage: FasterAPI + '/ShopType/UploadImage',
    ChangeActivation: (id: string) =>
      FasterAPI + `/ShopType/ChangeActivation/${id}`,
  };

  public static shopBranch = {
    search: FasterAPI + '/ShopBranch' + OperationEnum.SEARCH,
    getById: FasterAPI + '/ShopBranch' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/ShopBranch' + OperationEnum.ADD,
    update: FasterAPI + '/ShopBranch' + OperationEnum.UPDATE,
    ChangeActivation: (id: string) =>
      FasterAPI + `/ShopBranch/changeActivation/${id}`,
    AddByExcel: (id: string) =>
      FasterAPI + `/ShopBranch/AddByExcel?shopId=${id}`,
    BusyChange: (id: string) => FasterAPI + `/ShopBranch/BusyChange/${id}`,
  };

  public static ShopBranchWorkTime = {
    search: FasterAPI + '/ShopBranchWorkTime/GetByShopBranchId/',
    getById: FasterAPI + '/ShopBranchWorkTime' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/ShopBranchWorkTime' + OperationEnum.ADD,
    update: FasterAPI + '/ShopBranchWorkTime' + OperationEnum.UPDATE,
    delete: FasterAPI + '/ShopBranchWorkTime' + OperationEnum.DELETE,
    UpdateAllShopBranchsWorkTime:
      FasterAPI + '/ShopBranchWorkTime/UpdateAllShopBranchsWorkTime',
  };
  public static GeneralSuggest = {
    search: FasterAPI + '/GeneralSuggest' + OperationEnum.SEARCH,
    getById: FasterAPI + '/GeneralSuggest' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/GeneralSuggest' + OperationEnum.ADD,
    update: FasterAPI + '/GeneralSuggest/UpdateNote',
    delete: FasterAPI + '/GeneralSuggest' + OperationEnum.DELETE,
    finish: (id: string) => FasterAPI + `/GeneralSuggest/Finish/${id}`,
    addReply: FasterAPI + '/GeneralSuggest/AddReply',
  };

  public static Provider = {
    search: FasterAPI + '/Provider' + OperationEnum.SEARCH,
    getById: FasterAPI + '/Provider' + OperationEnum.GET_BY_ID,
    getDropdown: FasterAPI + '/Provider' + OperationEnum.GET_DDL,
    getProviderWorkTimeReport: (id: string) =>
      FasterAPI + `/Provider/WorkTimeReport/${id}`,
    BusyProvidersInDeliveryOrders:
      FasterAPI + '/Provider/BusyProvidersInDeliveryOrders',
    BusyProvidersInTransportOrders:
      FasterAPI + '/Provider/BusyProvidersInTransportOrders',
    ProvidersHaveOneOrderAtLeast:
      FasterAPI + '/Provider/ProvidersHaveOneOrderAtLeast',
    carColor: FasterAPI + '/Provider/CarColor/GetDDL',
    providerNotes: (ProviderId: number) =>
      FasterAPI + `/Provider/ProviderNotes/${ProviderId}`,
    createProviderNotes: FasterAPI + '/Provider/ProviderNote',
    Nationality: FasterAPI + '/Provider/Nationality/GetDDL',
    GetProviderOrderRejectPercentage:
      FasterAPI + '/Provider/GetProviderOrderRejectPercentage',
    bankDropdown: FasterAPI + '/Provider/Banks/GetDDL',
    getProviderAcceptanceReport: (VendorId: string) =>
      FasterAPI + `/Provider/AcceptanceReport/${VendorId}`,
    sendToken: (ProviderId: string) =>
      FasterAPI + `/Provider/IntegrateToTookan/${ProviderId}`,
    sendToMeLink: (ProviderId: string) =>
      FasterAPI + `/Provider/IntegrateToTawseel/${ProviderId}`,
    getMapProviders: FasterAPI + '/Provider/GetMapProviders',
  };

  public static ProviderWallet = {
    GetProviderWalletSum: (id: number) =>
      FasterAPI + `/ProvidersWallet/GetProviderWalletSum/${id}`,
    GetProviderWallet: (id: number) =>
      FasterAPI + `/ProvidersWallet/Search/${id}`,
    add: FasterAPI + '/ProvidersWallet' + OperationEnum.ADD,
    WalletsAddjestmentsNotApproved:
      FasterAPI + '/ProvidersWallet/WalletsAddjestmentsNotApproved',
    uploadTransferImage: FasterAPI + '/ProvidersWallet/uploadTransferImage',
    approve: (id: number) =>
      FasterAPI + `/ProvidersWallet/approveWalletAddjestment/${id}`,
    notApprove: (id: number) =>
      FasterAPI + `/ProvidersWallet/notApproveWalletAddjestment/${id}`,
    WalletDiscountByExcel: FasterAPI + '/ProvidersWallet/WalletDiscountByExcel',
    GetWalletNotesDDL: FasterAPI + '/ProvidersWallet/GetWalletNotesDDL',
  };

  public static CustomerWallet = {
    GetCustomerWalletSum: (id: number) =>
      FasterAPI + `/CustomerWallet/Sum/${id}`,
    get: (id: number) => FasterAPI + `/CustomerWallet/Search/${id}`,
    add: FasterAPI + '/CustomerWallet',
    WalletsAddjestmentsNotApproved:
      FasterAPI + '/CustomerWallet/WalletsAddjestmentsNotApproved',
    approve: (id: number) =>
      FasterAPI + `/CustomerWallet/approveWalletAddjestment/${id}`,
    notApprove: (id: number) =>
      FasterAPI + `/CustomerWallet/notApproveWalletAddjestment/${id}`,
    uploadTransferImage: FasterAPI + '/CustomerWallet/uploadTransferImage',
    RefundRequestSearch: FasterAPI + '/CustomerWallet/RefundRequestSearch',
    RejectRefund: (id: number) =>
      FasterAPI + `/CustomerWallet/RejectRefund/${id}`,
    RefundAmountRequest: (id: number) =>
      FasterAPI + `/CustomerWallet/RefundAmountRequest/${id}`,
  };

  // report
  public static Report = {
    CoponeReport: FasterAPI + '/Report/CoponeReport',
    ProviderCountsReport: FasterAPI + '/Report/ProviderCountsReport',
    ActiveProviderCount: FasterAPI + '/Report/ActiveProviderCount',
    NotActiveProviderCount: FasterAPI + '/Report/NotActiveProviderCount',
    CoponeTransportDetailsReport:
      FasterAPI + '/Report/CoponeTransportDetailsReport',
    CoponeDeliveryDetailsReport:
      FasterAPI + '/Report/CoponeDeliveryDetailsReport',
    TransportOrderStatusDetailsReport:
      FasterAPI + '/Report/TransportOrderStatusDetailsReport',
    DeliveryOrderStatusDetailsReport:
      FasterAPI + '/Report/DeliveryOrderStatusDetailsReport',
    DeliveryOrderStatusReport: FasterAPI + '/Report/DeliveryOrderStatusReport',
    TransportOrderStatusReport:
      FasterAPI + '/Report/TransportOrderStatusReport',
    ShopOrdersCountReport: FasterAPI + '/Report/ShopOrdersCountReport',
    SubscriptionsProfitsReport:
      FasterAPI + '/Report/SubscriptionsProfitsReport',
    TransportOrderDataReport: FasterAPI + '/Report/TransportOrderDataReport',
    DeliveryOrderDataReport: FasterAPI + '/Report/DeliveryOrderDataReport',
    TransportOrderDetailsDataReport: (id: number) =>
      FasterAPI + `/Report/TransportOrderDetailsDataReport/${id}`,
    DeliveryOrderDetailsDataReport: (id: number) =>
      FasterAPI + `/Report/DeliveryOrderDetailsDataReport/${id}`,
    TaxsReport: FasterAPI + '/Report/TaxsReport',
    CustomerOrderStatusReport: FasterAPI + '/Report/CustomerOrderStatusReport',
    AllProvidersWorkingTimeReport:
      FasterAPI + '/Report/AllProvidersWorkingTimeReport',
    CustomerWalletReport: FasterAPI + '/Report/CustomerWalletReport',
    ProviderWalletReport: FasterAPI + '/Report/ProviderWalletReport',
    IgnoredOrderReport: FasterAPI + '/Report/IgnoredOrderReport',
    ProviderWalletManualAdditionReport:
      FasterAPI + '/Report/ProviderWalletManualAdditionReport',
    CustomerWalletManualAdditionReport:
      FasterAPI + '/Report/CustomerWalletManualAdditionReport',
    RewardsAndCompensation: FasterAPI + '/Report/RewardsAndCompensation',
    DeliveryOrdersReport: FasterAPI + '/Report/DeliveryOrdersReport',
    AddedFromPaymentReport: FasterAPI + '/Report/AddedFromPaymentReport',
    ShopProfitReport: FasterAPI + '/Report/ShopProfitReport',
    DeliveryOrderStatistics: FasterAPI + '/Report/DeliveryOrderStatistics',
    NewOrdersReport: FasterAPI + '/Report/NewOrdersReport',
    AssignedOrdersReport: FasterAPI + '/Report/AssignedOrdersReport',
    OutForDeliveryOrdersReport:
      FasterAPI + '/Report/OutForDeliveryOrdersReport',
    DelayedNoDriverForOrdersReport:
      FasterAPI + '/Report/DelayedNoDriverForOrdersReport',
    DeliverdOrdersReport: FasterAPI + '/Report/DeliverdOrdersReport',
    NotPickedUpOrdersReport: FasterAPI + '/Report/NotPickedUpOrdersReport',
    OpenDeliveryOrderDataListReport:
      FasterAPI + '/Report/OpenDeliveryOrderDataListReport',
    ClosedDeliveryOrderDataListReport:
      FasterAPI + '/Report/ClosedDeliveryOrderDataListReport',
  };

  public static Banner = {
    search: FasterAPI + '/Banner' + OperationEnum.SEARCH,
    getById: FasterAPI + '/Banner' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/Banner' + OperationEnum.ADD,
    update: FasterAPI + '/Banner' + OperationEnum.UPDATE,
    delete: FasterAPI + '/Banner' + OperationEnum.DELETE,
    ChangeBannerActivation: FasterAPI + '/Banner/ChangeBannerActivation',
    UploadImage: FasterAPI + '/Banner/UploadImage',
  };

  public static Product = {
    search: FasterAPI + '/Product' + OperationEnum.SEARCH,
    GetProductById: (productId: number): string =>
      FasterAPI + `/Product/GetProductById/${productId}`,
    AddProduct: FasterAPI + '/Product/AddProduct',
    UpdateProduct: FasterAPI + '/Product/UpdateProduct',
    UploadProductImage: FasterAPI + '/Product/UploadProductImage',
    GetProductAdditionalOptions: (productId: number): string =>
      FasterAPI + `/Product/GetProductAdditionalOptions/${productId}`,
    GetDetailsById: (productDetailsId: number): string =>
      FasterAPI + `/Product/GetDetailsById/${productDetailsId}`,
    GetDetailsDDL: FasterAPI + '/Product/GetDetailsDDL',
    UpdateProductDetails: FasterAPI + '/Product/UpdateProductDetails',
    UploadDetailsImage: FasterAPI + '/Product/UploadDetailsImage',
    AddProductDetails: FasterAPI + '/Product/AddProductDetails',
    GetProductsDDL: FasterAPI + '/Product/GetProductsDDL',
    getProductDetailsByProductId: (productId: number): string =>
      FasterAPI + `/Product/getProductDetailsByProductId/${productId}`,
    GetDetailsSizeById: (ID: number): string =>
      FasterAPI + `/Product/GetDetailsSizeById/${ID}`,
    getProductDetailsSizesByProductDetailsId: (ID: number): string =>
      FasterAPI + `/Product/getProductDetailsSizesByProductDetailsId/${ID}`,
    AddProductDetailSize: FasterAPI + '/Product/AddProductDetailSize',
    UpdateProductDetailSize: FasterAPI + '/Product/UpdateProductDetailSize',
    changeProductActivation: (ID: number): string =>
      FasterAPI + `/Product/changeProductActivation/${ID}`,
    changeProductDetailsActivation: (ID: number): string =>
      FasterAPI + `/Product/changeProductDetailsActivation/${ID}`,
    ChangeProductDetailsSizeActivation: (ProductSizeId: number): string =>
      FasterAPI +
      `/Product/ChangeProductDetailsSizeActivation/${ProductSizeId}`,
    GetProductAvailability: (ProductDetailsId: string): string =>
      FasterAPI + `/Product/GetProductAvailability/${ProductDetailsId}`,
    GetProductDetailsDDLByShopId: (ProductDetailsId: string): string =>
      FasterAPI + `/Product/GetProductDetailsDDLByShopId/${ProductDetailsId}`,
  };

  public static App = {
    GetSocialMedia: FasterAPI + '/App/GetSocialMedia',
    GetVersion: FasterAPI + '/App/GetVersion',
    GetTermsAndPolicies: FasterAPI + '/App/GetTermsAndPolicies',
    GetPrices: FasterAPI + '/App/GetPrices',
    GetRadius: FasterAPI + '/App/GetRadius',
    UpdateSocialMedia: FasterAPI + '/App/UpdateSocialMedia',
    UpdateVersion: FasterAPI + '/App/UpdateVersion',
    UpdateTermsAndPolicies: FasterAPI + '/App/UpdateTermsAndPolicies',
    UpdatePrices: FasterAPI + '/App/UpdatePrices',
    UpdateRadius: FasterAPI + '/App/UpdateRadius',
    GetVat: FasterAPI + '/App/GetVat',
    UpdateVat: FasterAPI + '/App/UpdateVat',
    GetSchedulingInMinutes: FasterAPI + '/App/GetSchedulingInMinutes',
    UpdateSchedulingInMinutesDto:
      FasterAPI + '/App/UpdateSchedulingInMinutesDto',
    GetBonusData: FasterAPI + '/App/GetBonusData',
    UpdateBonusData: FasterAPI + '/App/UpdateBonusData',
    getProviderReciveOneOrder: FasterAPI + '/App/isProviderReciveOneOrder',
    UpdateProviderReciveOneOrder:
      FasterAPI + '/App/UpdateProviderReciveOneOrder',
    BackupDB: FasterAPI + '/App/BackupDB',
    UserActionTracking: FasterAPI + '/App/UserActionTracking',
    getLimitationOrderValue: FasterAPI + '/App/getLimitationOrderValue',
    updateLimitationOrderValue: FasterAPI + '/App/updateLimitationOrderValue',
    getDispatchSystemDDL: FasterAPI + '/App/getDispatchSystemDDL',
    UpdateDispatchSystem: FasterAPI + '/App/UpdateDispatchSystem',
    getDispatchSystem: FasterAPI + '/App/getDispatchSystem',
  };

  public static ItemSize = {
    search: FasterAPI + '/ItemSize' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/ItemSize' + OperationEnum.GET_DDL,
    getById: (id: number): string =>
      FasterAPI + '/ItemSize' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/ItemSize' + OperationEnum.ADD,
    update: FasterAPI + '/ItemSize' + OperationEnum.UPDATE,
  };

  public static BundlesOffer = {
    search: FasterAPI + '/BundlesOffer' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/BundlesOffer' + OperationEnum.GET_DDL,
    getById: (id: number): string =>
      FasterAPI + '/BundlesOffer' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/BundlesOffer' + OperationEnum.ADD,
    update: FasterAPI + '/BundlesOffer' + OperationEnum.UPDATE,
  };
  public static BundleProduct = {
    add: FasterAPI + '/BundleProduct' + OperationEnum.ADD,
    ChangeBundleProductActivation:
      FasterAPI + '/BundleProduct/ChangeBundleProductActivation',
  };
  public static AdditionalOption = {
    search: FasterAPI + '/AdditionalOption' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/AdditionalOption' + OperationEnum.GET_DDL,
    getById: (id: number): string =>
      FasterAPI + '/AdditionalOption' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/AdditionalOption' + OperationEnum.ADD,
    update: FasterAPI + '/AdditionalOption' + OperationEnum.UPDATE,
  };

  public static ProductAdditionalOption = {
    add: FasterAPI + '/ProductAdditionalOption' + OperationEnum.ADD,
    delete: (id: number): string =>
      FasterAPI + '/ProductAdditionalOption' + OperationEnum.DELETE + id,
    changeActivation: (id: number): string =>
      FasterAPI + '/ProductAdditionalOption/ChangeActivation/' + id,
  };
  public static Subscription = {
    search: FasterAPI + '/Subscription' + OperationEnum.SEARCH,
    getById: (id: number): string =>
      FasterAPI + '/Subscription' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/Subscription' + OperationEnum.ADD,
    ChangeSubscriptionActivation:
      FasterAPI + '/Subscription/ChangeSubscriptionActivation',
    getSubscriptionDDL: FasterAPI + '/Subscription/getSubscriptionDDL',
  };
  public static FAQs = {
    search: FasterAPI + '/FAQs' + OperationEnum.SEARCH,
    getById: (id: number): string =>
      FasterAPI + '/FAQs' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/FAQs' + OperationEnum.ADD,
    ChangeFAQsActivation: FasterAPI + '/FAQs/ChangeFAQsActivation',
    update: FasterAPI + '/FAQs' + OperationEnum.UPDATE,
    delete: FasterAPI + '/FAQs' + OperationEnum.DELETE,
  };
  public static ProductComponant = {
    getById: (id: number): string =>
      FasterAPI + '/ProductComponant' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/ProductComponant' + OperationEnum.ADD,
    update: FasterAPI + '/ProductComponant' + OperationEnum.UPDATE,
    delete: FasterAPI + '/ProductComponant' + OperationEnum.DELETE,
    ChangeActivation: (ID: number): string =>
      FasterAPI + `/ProductComponant/ChangeActivation/${ID}`,
  };

  public static BranchProduct = {
    search: FasterAPI + '/BranchProductDetails' + OperationEnum.SEARCH,
    add: FasterAPI + '/BranchProductDetails' + OperationEnum.ADD,
    ChangeActivationById:
      FasterAPI + '/BranchProductDetails/ChangeActivationById',
    getShopBranchDDL: FasterAPI + '/BranchProductDetails/getShopBranchDDL',
  };

  public static ProviderSubscriptions = {
    search: FasterAPI + '/ProviderSubscriptions',
    add: FasterAPI + '/ProviderSubscriptions/DriversSubscription',
    RenewDriversSubscriptionExpired:
      FasterAPI + '/ProviderSubscriptions/RenewDriversSubscriptionExpired',
    VendorDriversSubscription:
      FasterAPI + '/ProviderSubscriptions/VendorDriversSubscription',
    RemainingDays: (userId: number): string =>
      FasterAPI + `/ProviderSubscriptions/RemainingDays/${userId}`,
    getDriversSubscription: (userId: number): string =>
      FasterAPI + `/ProviderSubscriptions/getDriversSubscription/${userId}`,
    GetProviderByPhoneNumber: (PhoneNumber: string): string =>
      FasterAPI +
      `/ProviderSubscriptions/GetProviderByPhoneNumber/${PhoneNumber}`,
  };

  public static CarName = {
    search: FasterAPI + '/CarName' + OperationEnum.SEARCH,
    getDell: (id: number): string =>
      FasterAPI + '/CarName' + OperationEnum.GET_DDL + '/' + id,
    getById: (id: number): string =>
      FasterAPI + '/CarName' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/CarName' + OperationEnum.ADD,
    update: FasterAPI + '/CarName' + OperationEnum.UPDATE,
    ChangeActivation: (id: string) =>
      FasterAPI + `/CarName/ChangeActivation/${id}`,
  };
  public static CarModel = {
    search: FasterAPI + '/CarModel' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/CarModel' + OperationEnum.GET_DDL,
    getById: (id: number): string =>
      FasterAPI + '/CarModel' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/CarModel' + OperationEnum.ADD,
    update: FasterAPI + '/CarModel' + OperationEnum.UPDATE,
    ChangeActivation: (id: string) =>
      FasterAPI + `/CarModel/ChangeActivation/${id}`,
  };
  public static CarClass = {
    search: FasterAPI + '/CarClass' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/CarClass' + OperationEnum.GET_DDL,
    getById: (id: number): string =>
      FasterAPI + '/CarClass' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/CarClass' + OperationEnum.ADD,
    update: FasterAPI + '/CarClass' + OperationEnum.UPDATE,
    uploadImage: FasterAPI + '/CarClass/UploadImage',
    ChangeActivation: (id: string) =>
      FasterAPI + `/CarClass/ChangeActivation/${id}`,
  };
  public static ManufacturingYear = {
    search: FasterAPI + '/ManufacturingYear' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/ManufacturingYear' + OperationEnum.GET_DDL,
    getById: (id: number): string =>
      FasterAPI + '/ManufacturingYear' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/ManufacturingYear' + OperationEnum.ADD,
    update: FasterAPI + '/ManufacturingYear' + OperationEnum.UPDATE,
    ChangeActivation: (id: string) =>
      FasterAPI + `/CarClass/ManufacturingYear/${id}`,
  };
  public static OrderStatus = {
    DeliveryOrderStatusDDL: FasterAPI + '/OrderStatus/DeliveryOrderStatusDDL',
    TransportOrderStatusDDL: FasterAPI + '/OrderStatus/TransportOrderStatusDDL',
    UpdateDeliveryOrderStatus:
      FasterAPI + '/OrderStatus/UpdateDeliveryOrderStatus',
    UpdateTransportOrderStatus:
      FasterAPI + '/OrderStatus/UpdateTransportOrderStatus',
  };

  public static Vendor = {
    search: FasterAPI + '/Vendor' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/Vendor' + OperationEnum.GET_DDL,
    getById: (id: number): string =>
      FasterAPI + '/Vendor' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/Vendor' + OperationEnum.ADD,
    update: FasterAPI + '/Vendor' + OperationEnum.UPDATE,
    UploadImage: FasterAPI + '/Vendor/UploadImage',
    ChangeActivation: (id: string) =>
      FasterAPI + `/Vendor/ChangeActivation/${id}`,
  };

  public static DeliveryOrderNotification = {
    search: FasterAPI + '/DeliveryOrderNotification' + OperationEnum.SEARCH,
    getById: (id: number): string =>
      FasterAPI + '/DeliveryOrderNotification' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/DeliveryOrderNotification' + OperationEnum.ADD,
    update: FasterAPI + '/DeliveryOrderNotification' + OperationEnum.UPDATE,
  };

  public static TransportOrderNotification = {
    search: FasterAPI + '/TransportOrderNotification' + OperationEnum.SEARCH,
    getById: (id: number): string =>
      FasterAPI + '/TransportOrderNotification' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/TransportOrderNotification' + OperationEnum.ADD,
    update: FasterAPI + '/TransportOrderNotification' + OperationEnum.UPDATE,
  };
  public static Customer = {
    search: FasterAPI + '/Customer' + OperationEnum.SEARCH,
    getById: (CustomerId: number): string =>
      FasterAPI + `/Customer/GetCustomerById/${CustomerId}`,
    addCustomerNote: FasterAPI + '/Customer/CustomerNote',
    getCustomerNote: (CustomerId: number): string =>
      FasterAPI + `/Customer/CusotmerNotes/${CustomerId}`,
    getLastLoginReport: FasterAPI + '/Customer/LastLoginReport',
    GetCustomerAddresses: FasterAPI + '/Customer/GetCustomerAddresses',
    GetReferrerReport: (CustomerId: number): string =>
      FasterAPI + `/Customer/GetReferrerReport/${CustomerId}`,
  };

  public static GoogleIntegration = {
    branches: FasterAPI + '/GoogleIntegration/Shop/Search',
  };

  public static TransportOrders = {
    UpdateNote: FasterAPI + '/TransportOrders/UpdateNote',
    getNote: (orderId: any): string =>
      FasterAPI + `/TransportOrders/getNote/${orderId}`,
    GetNearProviderToOrder: (orderId: any, radius: any): string =>
      FasterAPI +
      `/TransportOrders/getNearProviderToOrder/${orderId}/${radius}`,
    manualAssignment: (orderId: any, price: string, providerUserId): string =>
      FasterAPI +
      `/TransportOrders/manualAssignment/${orderId}/${price}/${providerUserId}`,
  };

  public static DeliveryOrder = {
    UpdateNote: FasterAPI + '/DeliveryOrder/UpdateNote',
    getNote: (orderId: any): string =>
      FasterAPI + `/DeliveryOrder/getNote/${orderId}`,
    GetNearProviderToOrder: (orderId: any, radius: string): string =>
      FasterAPI + `/DeliveryOrder/GetNearProviderToOrder/${orderId}/${radius}`,
    manualAssignment: (orderId: any, price: string, providerUserId): string =>
      FasterAPI +
      `/DeliveryOrder/manualAssignment/${orderId}/${price}/${providerUserId}`,
    ChangeOrderAmountPrice: (orderId: any, price: string): string =>
      FasterAPI + `/DeliveryOrder/ChangeOrderAmountPrice/${orderId}/${price}`,
    getOrderCart: (orderId: any): string =>
      FasterAPI + `/DeliveryOrder/getOrderCart/${orderId}`,
    acceptOrder: (orderId: any): string =>
      FasterAPI + `/DeliveryOrder/acceptOrder/${orderId}`,
    rejectOrder: (orderId: any): string =>
      FasterAPI + `/DeliveryOrder/rejectOrder/${orderId}`,
    SendOrderToLyve: (orderId: any): string =>
      FasterAPI + `/Lyve/SendOrderToLyve/${orderId}`,
  };

  public static LoggerService = {
    search: FasterAPI + '/LoggerService' + OperationEnum.SEARCH,
  };

  public static AppNotifications = {
    getAll: FasterAPI + '/AppNotifications/getAllPagination',
    getById: (id: number): string =>
      FasterAPI + '/AppNotifications' + OperationEnum.GET_BY_ID + id,
    delete: (id: number): string =>
      FasterAPI + '/AppNotifications' + OperationEnum.DELETE + id,
    add: FasterAPI + '/AppNotifications' + OperationEnum.ADD,
    update: FasterAPI + '/AppNotifications' + OperationEnum.UPDATE,
    reSend: (orderId: any): string =>
      FasterAPI + `/AppNotifications/reSend/${orderId}`,
    getNotificationTypeDDL:
      FasterAPI + '/AppNotifications/getNotificationTypeDDL',
    getNotificationUserTypeDDL:
      FasterAPI + '/AppNotifications/getNotificationUserTypeDDL',
    UploadProviderIdsExcel:
      FasterAPI + '/AppNotifications/UploadProviderIdsExcel',
    UploadCustomerIdsExcel:
      FasterAPI + '/AppNotifications/UploadCustomerIdsExcel',
    DownloadExcelSample: FasterAPI + '/AppNotifications/DownloadExcelSample',
  };

  public static Motivations = {
    UploadProviderIdsExcel: FasterAPI + '/Motivations/UploadProviderIdsExcel',
    getAll: FasterAPI + '/Motivations' + OperationEnum.SEARCH,
    getSalary: FasterAPI + '/Motivations/salary' + OperationEnum.SEARCH,
    getMotivationTypeDDL: FasterAPI + '/Motivations/getMotivationTypeDDL',
    getById: (motivationId: number): string =>
      FasterAPI + '/Motivations' + OperationEnum.GET_BY_ID + motivationId,
    delete: (motivationId: number): string =>
      FasterAPI + '/Motivations' + OperationEnum.DELETE + motivationId,
    add: FasterAPI + '/Motivations' + OperationEnum.ADD,
    ChangeActivation: (motivationId: string) =>
      FasterAPI + `/Motivations/changeActivation/${motivationId}`,
    evaluate: (motivationId: any): string =>
      FasterAPI + `/Motivations/evaluate/${motivationId}`,
    GetProviderMotivations: (providerId: any): string =>
      FasterAPI + `/Motivations/GetProviderMotivations/${providerId}`,
    GetProviderMotivationProgress: (
      providerId: any,
      motivationId: any
    ): string =>
      FasterAPI +
      `/Motivations/GetProviderMotivationProgress/${providerId}/${motivationId}`,
    DownloadExcelSample: FasterAPI + '/Motivations/DownloadExcelSample',
  };

  public static CustomerOrderBonus = {
    search: FasterAPI + '/CustomerOrderBonus' + OperationEnum.SEARCH,
    getById: (id: number): string =>
      FasterAPI + '/CustomerOrderBonus' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/CustomerOrderBonus' + OperationEnum.ADD,
    ChangeActivation: (id: string) =>
      FasterAPI + `/CustomerOrderBonus/ChangeActivation/${id}`,
  };

  public static fasterWallet = {
    search: FasterAPI + '/FasterWallet' + OperationEnum.SEARCH,
    add: FasterAPI + '/FasterWallet' + OperationEnum.ADD,
    GetFasterWalletSum: FasterAPI + '/FasterWallet/GetFasterWalletSum',
  };

  public static ShopBranchWallet = {
    add: FasterAPI + '/ShopBranchWallet' + OperationEnum.ADD,
    search: FasterAPI + '/ShopBranchWallet' + OperationEnum.SEARCH,
    GetShopBranchWalletSum: (shopBranchId: any): string =>
      FasterAPI + `/ShopBranchWallet/GetShopBranchWalletSum/${shopBranchId}`,
    WalletDiscountByExcel:
      FasterAPI + '/ShopBranchWallet/WalletDiscountByExcel',
    DownloadExcelSample: FasterAPI + '/ShopBranchWallet/DownloadExcelSample',
  };

  public static Polygon = {
    search: FasterAPI + '/Polygon' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/Polygon' + OperationEnum.GET_DDL,
    getById: (id: number): string =>
      FasterAPI + '/Polygon' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/Polygon' + OperationEnum.ADD,
    // update: FasterAPI + '/Vendor' + OperationEnum.UPDATE,
    GetOrderTypeDDL: FasterAPI + '/Polygon/GetOrderTypeDDL',
    delete: (id: number): string =>
      FasterAPI + '/Polygon' + OperationEnum.DELETE + id,
    ChangeActivation: (id: string) =>
      FasterAPI + `/Polygon/ChangeActivation/${id}`,
  };

  public static AdditionalComponentTitle = {
    search: FasterAPI + '/AdditionalComponentTitle' + OperationEnum.SEARCH,
    getById: FasterAPI + '/AdditionalComponentTitle' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/AdditionalComponentTitle' + OperationEnum.ADD,
    update: FasterAPI + '/AdditionalComponentTitle' + OperationEnum.UPDATE,
    ChangeActivation: FasterAPI + `/AdditionalComponentTitle/changeActivation`,
    GetDDL: FasterAPI + `/AdditionalComponentTitle/GetDDL`,
  };

  public static additionalComponent = {
    search: FasterAPI + '/AdditionalComponent' + OperationEnum.SEARCH,
    getById: FasterAPI + '/AdditionalComponent' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/AdditionalComponent' + OperationEnum.ADD,
    update: FasterAPI + '/AdditionalComponent' + OperationEnum.UPDATE,
    delete: (id: number): string =>
      FasterAPI + '/AdditionalComponent' + OperationEnum.DELETE + id,
  };

  public static additionalOption = {
    search: FasterAPI + '/AdditionalOption' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/AdditionalOption' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/AdditionalOption' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/AdditionalOption' + OperationEnum.ADD,
    update: FasterAPI + '/AdditionalOption' + OperationEnum.UPDATE,
    delete: (id: number): string =>
      FasterAPI + '/AdditionalOption' + OperationEnum.DELETE + id,
  };

  public static foodType = {
    search: FasterAPI + '/FoodType' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/FoodType' + OperationEnum.GET_DDL,
    UploadImage: FasterAPI + '/FoodType/UploadImage',
    getById: FasterAPI + '/FoodType' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/FoodType' + OperationEnum.ADD,
    update: FasterAPI + '/FoodType' + OperationEnum.UPDATE,
    ChangeActivation: (id: string) =>
      FasterAPI + `/FoodType/ChangeActivation/${id}`,
  };

  public static foodTypeShop = {
    add: FasterAPI + '/FoodTypeShop' + OperationEnum.ADD,
    search: FasterAPI + '/FoodTypeShop' + OperationEnum.SEARCH,
    delete: (FoodTypeId: number): string =>
      FasterAPI + `/FoodTypeShop/Delete/${FoodTypeId}`,
  };

  public static FixedShopAmounts = {
    search: (shopId: number): string =>
      FasterAPI + `/FixedShopAmounts/Search/${shopId}`,
    getById: (id: number): string =>
      FasterAPI + '/FixedShopAmounts' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/FixedShopAmounts' + OperationEnum.ADD,
    update: FasterAPI + '/FixedShopAmounts' + OperationEnum.UPDATE,
    delete: (id: number): string =>
      FasterAPI + '/FixedShopAmounts' + OperationEnum.DELETE + id,
  };

  public static Moyaser = {
    getAll: FasterAPI + '/Moyaser/List',
    RefundPayment: FasterAPI + '/Moyaser/RefundPayment',
    getCustomerPhone: (description: string): string =>
      FasterAPI + `/Moyaser/GetCustomerPhone/${description}`,
  };

  public static Task = {
    SendOrderToTookan: (orderId: string): string =>
      FasterAPI + `/Task/SendOrderToTookan/${orderId}`,
  };
  public static SubAdditionalComponent = {
    search: FasterAPI + '/SubAdditionalComponent' + OperationEnum.SEARCH,
    getById: (id: number): string =>
      FasterAPI + '/SubAdditionalComponent' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/SubAdditionalComponent' + OperationEnum.ADD,
    update: FasterAPI + '/SubAdditionalComponent' + OperationEnum.UPDATE,
    getDropdown: FasterAPI + '/SubAdditionalComponent' + OperationEnum.GET_DDL,
  };
  public static SubAdditionalComponentTitle = {
    search: FasterAPI + '/SubAdditionalComponentTitle' + OperationEnum.SEARCH,
    getById: (id: number): string =>
      FasterAPI + '/SubAdditionalComponentTitle' + OperationEnum.GET_BY_ID + id,
    add: FasterAPI + '/SubAdditionalComponentTitle' + OperationEnum.ADD,
    update: FasterAPI + '/SubAdditionalComponentTitle' + OperationEnum.UPDATE,
    getDropdown:
      FasterAPI + '/SubAdditionalComponentTitle' + OperationEnum.GET_DDL,
  };

  public static firebase = {
    updateFirebaseToken: FasterAPI + '/Identity/updateFirebaseToken',
    getTestMessage: FasterAPI + 'AppNotifications/getTestMessage',
  };

  public static OrderDispatch = {
    GetDeliveryProviders: FasterAPI + '/OrderDispatch/GetDeliveryProviders',
  };

  public static GiftCard = {
    search: FasterAPI + '/GiftCard' + OperationEnum.SEARCH,
    getDell: FasterAPI + '/GiftCard' + OperationEnum.GET_DDL,
    getById: FasterAPI + '/GiftCard' + OperationEnum.GET_BY_ID,
    add: FasterAPI + '/GiftCard' + OperationEnum.ADD,
    update: FasterAPI + '/GiftCard' + OperationEnum.UPDATE,
    delete: FasterAPI + '/GiftCard' + OperationEnum.DELETE,
    UploadImage: FasterAPI + '/GiftCard/UploadImage',
    GetGiftCardTypesSendSearch: FasterAPI + '/GiftCard/GetGiftCardSendSearch',
    ChangeActivation: (id: string) =>
      FasterAPI + `/GiftCard/changeActivation/${id}`,
  };
}
