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
      icon: 'bussines',
      menuTitle: 'systemManagement',
      childern: [
        {
          title: 'users',
          link: '/identity/users',
          role: ['administrator'],
        },
        {
          title: 'ApplicationWorkTimes',
          link: '/identity/application-work-time-list',
          role: ['administrator'],
        },
        {
          title: 'polygon',
          link: '/polygon',
          childern: [],
        },
        {
          title: 'app',
          link: '/app',
          childern: [],
          role: ['administrator'],
        },

        {
          title: 'userActionTracking',
          link: '/app/user-action-tracking',
          childern: [],
        },
        {
          title: 'DeliveryOrderNotification',
          link: '/delivery-order-notification',
          childern: [],
        },
      ],
    },
    {
      role: ['administrator', 'shop_branch', 'shop'],
      icon: 'shop 2',
      menuTitle: 'stores',
      childern: [
        {
          title: 'Shop',
          link: '/shop',
          role: ['administrator', 'shop_branch', 'shop'],
        },
        {
          title: 'Shop_Type',
          link: '/shop-type',
          role: ['administrator'],
        },
        {
          title: 'Shop_Branch',
          link: '/shop-branch',
          role: ['administrator', 'shop_branch', 'shop'],
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'checkout',
      menuTitle: 'orders',
      childern: [
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
          title: 'DeliveryOrderDataReport',
          link: '/report/delivery-order',
          role: ['administrator'],
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'delivery-truck 2',
      menuTitle: 'logistics',
      childern: [
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
          title: 'RewardsAndCompensation',
          link: '/report/rewards-compensation',
        },
        {
          title: 'tracking',
          link: '/providers/tracking',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'heatMap',
          link: '/report/heat-map',
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'customer 2',
      menuTitle: 'customers',
      childern: [
        {
          title: 'customers',
          link: '/identity/customers',
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'money 2',
      menuTitle: 'finance',
      childern: [
        {
          title: 'RefundRequestSearch',
          link: '/identity/refund-request-search',
        },
        {
          title: 'moyaser',
          link: '/moyaser',
          role: ['administrator'],
        },
        {
          title: 'providerAmountRequests',
          link: '/providers/amount-request',
          role: ['administrator'],
        },
        {
          title: 'approveTransaction',
          link: '/approve-wallet',
          childern: [],
          role: ['administrator'],
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'image 67',
      menuTitle: 'markting',
      childern: [
        {
          title: 'Cobone',
          link: '/cobone',
          childern: [],
        },
        {
          title: 'customerOrderBonus',
          link: '/customer-orders-bonus',
        },
        {
          title: 'giftCards',
          link: '/gift-card',
          childern: [],
          role: ['administrator'],
        },
        {
          title: 'banner',
          link: '/banner',
        },
        {
          title: 'notifications',
          link: '/notification',
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'online-chat 2',
      menuTitle: 'support',
      childern: [
        {
          title: 'general_suggest',
          link: '/general-suggest',
          childern: [],
          role: ['administrator'],
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
      icon: 'report 2',
      menuTitle: 'reports',
      childern: [
        {
          title: 'Cobone',
          link: '/cobone-report',
        },
        {
          title: 'DriversAcceptanceRateReport',
          link: '/providers/acceptance-report',
        },
        {
          title: 'walletManualAdditionCustomer',
          link: '/report/customer-wallet-manual-addition',
        },
        {
          title: 'providerWalletReport',
          link: '/report/provider-wallet',
          role: ['administrator'],
        },
        {
          title: 'customerLastLoginReport',
          link: '/report/customer-last-login',
        },
        {
          title: 'customerOrderStatus',
          link: '/report/customer-order-status',
        },
        {
          title: 'giftCardsReport',
          link: '/report/send-search',
        },
      ],
    },
    {
      role: ['administrator'],
      icon: 'file',
      menuTitle: 'other',
      childern: [
        {
          title: 'providersWorkingTimeReport',
          link: '/report/providers-working-time',
        },
        {
          title: 'customerWalletReport',
          link: '/report/customer-wallet',
        },
        {
          title: 'Sub_report',
          link: '/cobone-report/SubScription',
        },
        {
          title: 'Shop_Resturant',
          link: '/cobone-report/Shop_Resturant',
        },
        {
          title: 'salary',
          link: '/salaries',
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
        },
        {
          title: 'carModel',
          link: '/car-model',
        },
        {
          title: 'manufacturingYear',
          link: '/manufacturing-year',
        },
        {
          title: 'FasterWallet',
          link: '/faster-wallet',
        },
        {
          title: 'DriversTransfers',
          link: '/providers/files',
          childern: [],
        },
        {
          title: 'IgnoredOrder',
          link: '/report/ignored-order',
        },
        {
          title: 'customerOrderStatus',
          link: '/report/customer-order-status',
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
          title: 'users',
          link: '/identity/users',
        },
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
        {
          title: 'taxs',
          link: '/report/taxs',
        },
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
        {
          title: 'List',
          link: '/food-type',
          role: ['administrator'],
        },
        {
          title: 'shopProfit',
          link: '/report/shop-profit',
        },
      ],
    },

    // {
    //   role: ['administrator', 'shop_branch', 'shop'],
    //   icon: 'food1',
    //   menuTitle: 'Shop',
    //   childern: [
    //     {
    //       title: 'List',
    //       link: '/food-type',
    //       role: ['administrator'],
    //     },

    //     {
    //       title: 'shopProfit',
    //       link: '/report/shop-profit',
    //     },
    //   ],
    // },
  ];
  constructor() {}

  get menu() {
    return this.menuItems;
  }
}
