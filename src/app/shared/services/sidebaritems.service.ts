import { Injectable } from '@angular/core';
import { isVender } from 'src/app/util/access-storge';
import { menuItems } from '../modules/sidebarItemsDto';

@Injectable({
  providedIn: 'root',
})
export class SidebaritemsService {
  private menuItems: menuItems[] = [
    //** City Country links */

    {
      role: ['administrator'],
      icon: 'technology/teh003',
      menuTitle: 'Admin',

      childern: [
        {
          title: 'users',
          link: '/identity/users',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'approveTransaction',
          link: '/approve-wallet',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'app',
          link: '/app',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'Shop_Resturant',
          link: '/cobone-report/Shop_Resturant',
        },
        {
          title: 'heatMap',
          link: '/report/heat-map',
        },
        {
          title: 'userActionTracking',
          link: '/app/user-action-tracking',
          childern: [],
        },
        {
          title: 'polygon',
          link: '/polygon',
          childern: [],
        },
        {
          title: 'City',
          link: '/city',
          childern: [],
        },
        {
          title: 'Country',
          link: '/country',
          childern: [],
        },
        {
          title: 'DeliveryOrderNotification',
          link: '/delivery-order-notification',
          childern: [],
        },
        {
          title: 'faqs',
          link: '/faqs',
          childern: [],
        },
        {
          title: 'tracking',
          link: '/providers/tracking',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'giftCards',
          link: '/gift-card',
          childern: [],
          role: ['administrator'],
        },
      ],
    },
    {
      role: ['administrator', 'vender'],
      icon: 'general/gen017',
      menuTitle: 'ops_logistics',
      childern: [
        {
          title: 'DeliveryOrderDataReport',
          link: '/report/delivery-order',
          role: ['administrator'],
        },
        {
          title: 'providerAmountRequests',
          link: '/providers/amount-request',
          role: ['administrator'],
        },
        {
          title: 'openOrders',
          link: '/report/open-delivery-order',
          role: ['administrator'],
        },
        {
          title: 'closedOrder',
          link: '/report/closed-delivery-order',
          role: ['administrator'],
        },
        {
          title: 'general_suggest',
          link: '/general-suggest',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'walletManualAddition',
          link: '/report/wallet-manual-addition',
          role: ['administrator'],
        },
        {
          title: 'motivations',
          link: '/motivation',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'salary',
          link: '/salaries',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'providerWalletReport',
          link: '/report/provider-wallet',
          role: ['administrator'],
        },
        {
          title: 'DriversTransfers',
          link: '/providers/files',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'providers',
          link: '/identity/providers',
          childern: [],
          role: ['administrator', 'vender'],
        },
        {
          title: 'vendor',
          link: '/vendor',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'driversOpenRegistration',
          link: '/providers/drivers-open-registration',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'carName',
          link: '/car-name',
          role: ['administrator'],
        },
        {
          title: 'carModel',
          link: '/car-model',
          role: ['administrator'],
        },
        {
          title: 'manufacturingYear',
          link: '/manufacturing-year',
          role: ['administrator'],
        },
        {
          title: 'moyaser',
          link: '/moyaser',
          role: ['administrator'],
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'ecommerce/ecm011',
      menuTitle: 'Customers_Marketing',
      childern: [
        {
          title: 'customers',
          link: '/identity/customers',
        },
        {
          title: 'RefundRequestSearch',
          link: '/identity/refund-request-search',
        },
        {
          title: 'customerOrderBonus',
          link: '/customer-orders-bonus',
        },
        {
          title: 'Cobone',
          link: '/cobone',
          childern: [],
        },
        {
          title: 'banner',
          link: '/banner',
        },
        {
          title: 'notifications',
          link: '/notification',
        },
        {
          title: 'Cobone_Report',
          link: '/cobone-report',
        },
        {
          title: 'customerWalletReport',
          link: '/report/customer-wallet',
        },
        {
          title: 'walletManualAdditionCustomer',
          link: '/report/customer-wallet-manual-addition',
        },
        {
          title: 'RewardsAndCompensation',
          link: '/report/rewards-compensation',
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'finance/fin010',
      menuTitle: 'Finance',
      childern: [
        {
          title: 'users',
          link: '/identity/users',
        },
        {
          title: 'FasterWallet',
          link: '/faster-wallet',
        },
      ],
    },
    {
      menuTitle: 'shop_data',
      icon: 'ecommerce/ecm004',
      role: ['administrator', 'shop_branch', 'shop'],
      childern: [
        // {
        //   title: 'additionalComponentTitle',
        //   link: '/additional-component-title',
        //   role: ['administrator'],
        // },
        // {
        //   title: 'additionalComponent',
        //   link: '/additional-component',
        //   role: ['administrator'],
        // },
        {
          title: 'additionalOption',
          link: '/additional-option',
          role: ['administrator'],
        },
        {
          title: 'category',
          link: '/category',
          role: ['administrator'],
        },
        {
          title: 'Addition_Option',
          link: '/addition',
          role: ['administrator'],
        },

        {
          title: 'products',
          link: '/product',
          role: ['administrator', 'shop'],
        },
        {
          title: 'itemSize',
          link: '/item-size',
          role: ['administrator'],
        },
        {
          title: 'branchProduct',
          link: '/branch-product',
          role: ['administrator'],
        },
        {
          title: 'Offers',
          link: '/offer',
          role: ['administrator', 'shop'],
        },
        {
          title: 'Bundle_Offer',
          link: '/bundle',
          role: ['administrator'],
        },
        {
          title: 'foodType',
          link: '/food-type',
          role: ['administrator'],
        },
      ],
    },

    {
      role: ['administrator'],
      icon: 'general/gen032',
      menuTitle: 'Report',
      childern: [
        {
          title: 'Sub_report',
          link: '/cobone-report/SubScription',
        },
        {
          title: 'taxs',
          link: '/report/taxs',
        },
        {
          title: 'customerOrderStatus',
          link: '/report/customer-order-status',
        },
        {
          title: 'providersWorkingTimeReport',
          link: '/report/providers-working-time',
        },

        {
          title: 'IgnoredOrder',
          link: '/report/ignored-order',
        },

        {
          title: 'DriversAcceptanceRateReport',
          link: '/providers/acceptance-report',
        },
        {
          title: 'customerLastLoginReport',
          link: '/report/customer-last-login',
        },
        {
          title: 'giftCardsReport',
          link: '/report/send-search',
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'ecommerce/ecm001',
      menuTitle: 'order',
      childern: [
        {
          title: 'customers',
          link: '/report/delivery-order-status',
          childern: [
            {
              title: 'Sub_report',
              link: '/cobone-report/SubScription',
            },
          ],
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'customer',
      menuTitle: 'customers',
      childern: [
        {
          title: 'customers',
          link: '/report/delivery-order-status',
          childern: [
            {
              title: 'Sub_report',
              link: '/cobone-report/SubScription',
            },
          ],
        },
      ],
    },
    {
      role: ['administrator', 'shop_branch', 'shop'],
      icon: 'food1',
      menuTitle: 'Shop',
      childern: [
        {
          title: 'List',
          link: '/food-type',
          role: ['administrator'],
        },
        {
          title: 'Shop',
          link: '/shop',
          role: ['administrator', 'shop_branch', 'shop'],
        },
        {
          title: 'Shop_Branch',
          link: '/shop-branch',
          role: ['administrator', 'shop_branch', 'shop'],
        },
        {
          title: 'Shop_Type',
          link: '/shop-type',
          role: ['administrator'],
        },
        {
          title: 'Shop_Branch_Wallet',
          link: '/faster-wallet/branch-wallet',
        },
        {
          title: 'bulkBranchWallet',
          link: '/shop/bulk-branch-wallet',
        },
        {
          title: 'shopProfit',
          link: '/report/shop-profit',
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'customer2',
      menuTitle: 'users',
      childern: [
        {
          title: 'customers',
          link: '/report/delivery-order-status',
          childern: [
            {
              title: 'Sub_report',
              link: '/cobone-report/SubScription',
            },
          ],
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'coding/cod001',
      menuTitle: 'configuration',
      childern: [
        {
          title: 'customers',
          link: '/report/delivery-order-status',
          childern: [
            {
              title: 'Sub_report',
              link: '/cobone-report/SubScription',
            },
          ],
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'general/gen013',
      menuTitle: 'actifityLog',
      childern: [
        {
          title: 'customers',
          link: '/report/delivery-order-status',
          childern: [
            {
              title: 'Sub_report',
              link: '/cobone-report/SubScription',
            },
          ],
        },
      ],
    },

    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'dashboard',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'orders',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'customers',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'shops',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'logistics',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'finance',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'reports',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'support',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'users',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'configuration',
    //   childern: [],
    // },
    // {
    //   role: ['administrator'],
    //   icon: 'general/gen032',
    //   menuTitle: 'activityLog',
    //   childern: [],
    // },

    // {
    //   role: ['administrator'],
    //   icon: 'communication/com003',
    //   menuTitle: 'TransportOrderNotification',
    //   childern: [
    //     {
    //       title: 'List',
    //       link: '/transport-order-notification',
    //       childern: [],
    //     },
    //   ],
    // },
    // {
    //   role: ['administrator', 'vender'],
    //   icon: 'ecommerce/ecm006',
    //   menuTitle: 'TransportOrderDataReport',
    //   childern: [
    //     {
    //       title: 'List',
    //       link: '/report/transport-order',
    //     },
    //   ],
    // },

    // {
    //   role: ['administrator'],
    //   icon: 'communication/com001',
    //   menuTitle: 'subscription',
    //   childern: [
    //     {
    //       title: 'List',
    //       link: '/subscription',
    //       childern: [],
    //     },
    //   ],
    // },

    // {
    //   role: ['administrator'],
    //   icon: 'general/gen025',
    //   menuTitle: 'car',
    //   childern: [
    //     {
    //       title: 'carClass',
    //       link: '/car-class',
    //     },
    //   ],
    // },

    // {
    //   role: ['developer'],
    //   icon: 'technology/teh004',
    //   menuTitle: 'logger',
    //   childern: [
    //     {
    //       title: 'List',
    //       link: '/logger',
    //       childern: [],
    //     },
    //   ],
    // },
  ];
  constructor() {}

  get menu() {
    return this.menuItems;
  }
}
