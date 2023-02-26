export function isShop(): boolean {
  let roles: any[] = JSON.parse(localStorage.getItem('roles'));
  let isShop = roles.includes('shop');
  return isShop;
}

export function isVender(): boolean {
  let roles: any[] = JSON.parse(localStorage.getItem('roles'));
  let isShop = roles.includes('vender');
  return isShop;
}

export function isAdmin(): boolean {
  let roles: any[] = JSON.parse(localStorage.getItem('roles'));
  let isShop = roles.includes('administrator');
  return isShop;
}
