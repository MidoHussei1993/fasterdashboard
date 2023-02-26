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
          title: 'Shop_Type',
          link: '/shop-type',
          childern: [],
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
      ],
    },
    {
      role: ['administrator'],
      icon: 'general/gen017',
      menuTitle: 'ops_logistics',
      childern: [
        {
          title: 'DeliveryOrderDataReport',
          link: '/report/delivery-order',
        },
        {
          title: 'general_suggest',
          link: '/general-suggest',
          childern: [],
        },
        {
          title: 'walletManualAddition',
          link: '/report/wallet-manual-addition',
        },
        {
          title: 'motivations',
          link: '/motivation',
          childern: [],
        },
        {
          title: 'salary',
          link: '/salaries',
          childern: [],
        },
        {
          title: 'providerWalletReport',
          link: '/report/provider-wallet',
        },
        {
          title: 'DriversTransfers',
          link: '/providers/files',
          childern: [],
        },
        {
          title: 'providers',
          link: '/identity/providers',
          childern: [],
        },
        {
          title: 'vendor',
          link: '/vendor',
          childern: [],
        },
        {
          title: 'driversOpenRegistration',
          link: '/providers/drivers-open-registration',
          childern: [],
        },
        {
          title: 'carName',
          link: '/car-name',
        },
        {
          title: 'carModel',
          link: '/car-model',
        },
        {
          title: 'manufacturingYear',
          link: '/manufacturing-year',
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
      menuTitle: 'shop_data',
      icon: 'ecommerce/ecm004',
      role: ['administrator', 'shop_branch', 'shop'],
      childern: [
        {
          title: 'List',
          link: '/food-type',
          role: ['administrator'],
        },
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
      ],
    },
    {
      role: ['shop'],
      icon: 'communication/com006',
      menuTitle: 'deliveryOrderStatusReport',
      childern: [
        {
          title: 'List',
          link: '/report/delivery-order-status',
          childern: [],
        },
      ],
    },
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
