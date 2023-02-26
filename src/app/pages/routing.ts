import { Routes } from '@angular/router';
import { RoleGuard } from '../core/Auth/Guards';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      role: ['vendor', 'administrator'],
    },
  },
  {
    path: 'offer',
    loadChildren: () =>
      import('./offer/offer.module').then((m) => m.OfferModule),
    data: {
      role: ['administrator'],
    },
  },

  {
    path: 'country',
    loadChildren: () =>
      import('../pages/country/country.module').then((m) => m.CountryModule),
    // canActivate: [RoleGuard],
    data: {
      role: ['administrator'],
    },
  },

  {
    path: 'cobone',
    loadChildren: () =>
      import('../pages/cobone/cobone.module').then((m) => m.CoboneModule),
    data: {
      role: ['administrator'],
    },
  },

  {
    path: 'category',
    loadChildren: () =>
      import('../pages/Category/category.module').then((m) => m.CategoryModule),
    data: {
      role: ['administrator'],
    },
  },

  {
    path: 'addition',
    loadChildren: () =>
      import('../pages/Additionoptiion/addition.module').then(
        (m) => m.AdditionModule
      ),
  },

  {
    path: 'bundle',
    loadChildren: () =>
      import('../pages/BundlesOffer/Bundle.module').then((m) => m.BundleModule),
    data: {
      role: ['administrator'],
    },
  },

  {
    path: 'city',
    loadChildren: () =>
      import('../pages/city/city.module').then((m) => m.CityModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'shop',
    // canActivate: [RoleGuard],
    loadChildren: () =>
      import('../pages/shop/shop.module').then((m) => m.ShopModule),
    data: {
      role: ['administrator', 'shop_branch', 'shop'],
    },
  },
  {
    path: 'shop-branch-work-time/:branch',
    loadChildren: () =>
      import(
        '../pages/shop-branch-work-time/shop-branch-work-time.module'
      ).then((m) => m.ShopBranchWorkTimeModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'shop-branch',
    // canActivate: [RoleGuard],
    loadChildren: () =>
      import('../pages/shop-branch/shop-branch.module').then(
        (m) => m.ShopBranchModule
      ),
    data: {
      role: ['administrator', 'shop_branch', 'shop'],
    },
  },
  {
    path: 'shop-type',
    loadChildren: () =>
      import('./shop-type/shop-type.module').then((m) => m.ShopTypeModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'general-suggest',
    loadChildren: () =>
      import('../pages/general-suggest/general-suggest.module').then(
        (m) => m.GeneralSuggestModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'identity',
    loadChildren: () =>
      import('../pages/identity/identity.module').then((m) => m.IdentityModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'providers',
    loadChildren: () =>
      import('../pages/provider/provider.module').then((m) => m.ProviderModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'provider-wallet/:id',
    loadChildren: () =>
      import('../pages/provider-wallet/provider-wallet.module').then(
        (m) => m.ProviderWalletModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'provider-tricking/:userId',
    loadChildren: () =>
      import('./provider-tracking/provider-tracking.module').then(
        (m) => m.ProviderTrackingModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'cobone-report',
    loadChildren: () =>
      import('../pages/reports/modules/reports.module').then(
        (m) => m.ReportsModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'report',
    loadChildren: () =>
      import('../pages/reports/reports.module').then((m) => m.ReportsModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'banner',
    loadChildren: () =>
      import('../pages/banner/banner.module').then((m) => m.BannerModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'product',
    loadChildren: () =>
      import('../pages/product/product.module').then((m) => m.ProductModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'item-size',
    loadChildren: () =>
      import('../pages/item-size/item-size.module').then(
        (m) => m.ItemSizeModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'app',
    loadChildren: () =>
      import('../pages/setting/setting.module').then((m) => m.SettingModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'subscription',
    loadChildren: () =>
      import('./subscription/subscription.module').then(
        (m) => m.SubscriptionModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then((m) => m.FaqsModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'branch-product',
    loadChildren: () =>
      import('./product-branch/product-branch.module').then(
        (m) => m.ProductBranchModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'provider-subscription',
    loadChildren: () =>
      import('./provider-subscription/provider-subscription.module').then(
        (m) => m.ProviderSubscriptionModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'car-name',
    loadChildren: () =>
      import('./car-name/car-name.module').then((m) => m.CarNameModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'car-class',
    loadChildren: () =>
      import('./car-class/car-class.module').then((m) => m.CarClassModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'car-model',
    loadChildren: () =>
      import('./car-model/car-model.module').then((m) => m.CarModelModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'manufacturing-year',
    loadChildren: () =>
      import('./manufacturing-year/manufacturing-year.module').then(
        (m) => m.ManufacturingYearModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'vendor',
    loadChildren: () =>
      import('./vendor/vendor.module').then((m) => m.VendorModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'transport-order-notification',
    loadChildren: () =>
      import(
        './transport-order-notification/transport-order-notification.module'
      ).then((m) => m.TransportOrderNotificationModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'delivery-order-notification',
    loadChildren: () =>
      import(
        './delivery-order-notification/delivery-order-notification.module'
      ).then((m) => m.DeliveryOrderNotificationModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./notification/notification.module').then(
        (m) => m.NotificationModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'motivation',
    loadChildren: () =>
      import('./motivations/motivations.module').then(
        (m) => m.MotivationsModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'approve-wallet',
    loadChildren: () =>
      import('./approve-wallet/approve-wallet.module').then(
        (m) => m.ApproveWalletModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'salaries',
    loadChildren: () =>
      import('./salary/salary.module').then((m) => m.SalaryModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'customer-orders-bonus',
    loadChildren: () =>
      import('./customer-bonus/customer-bonus.module').then(
        (m) => m.CustomerBonusModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'faster-wallet',
    loadChildren: () =>
      import('./wallet/wallet.module').then((m) => m.WalletModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'polygon',
    loadChildren: () =>
      import('./polygon/polygon.module').then((m) => m.PolygonModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'additional-component-title',
    loadChildren: () =>
      import(
        './additional-component-title/additional-component-title.module'
      ).then((m) => m.AdditionalComponentTitleModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'food-type',
    loadChildren: () =>
      import('./food-type/food-type.module').then((m) => m.FoodTypeModule),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'additional-component',
    loadChildren: () =>
      import('./additional-component/additional-component.module').then(
        (m) => m.AdditionalComponentModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'additional-option',
    loadChildren: () =>
      import('./additional-option/additional-option.module').then(
        (m) => m.AdditionalOptionModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'fixed-shop-amount',
    loadChildren: () =>
      import('./fixed-shop-amount/fixed-shop-amount.module').then(
        (m) => m.FixedShopAmountModule
      ),
    data: {
      role: ['administrator'],
    },
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
