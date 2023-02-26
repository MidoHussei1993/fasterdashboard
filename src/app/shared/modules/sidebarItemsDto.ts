export interface menuItems {
  menuTitle: string;
  icon?: string;
  childern: menuItemsChilderen[];
  role?:string[];
}
export interface menuItemsChilderen {
  title: string;
  link?: string;
  childern?: menuItemsChilderen[];
  role?:string[];
}
