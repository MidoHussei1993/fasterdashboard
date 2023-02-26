export class Product {
  id: number;
  productName: string;
  productNameAr: string;
  imagePath: string;
  isOffer: boolean;
  shopId: number;
  categoryId: number;
  createAt: Date;
}

export class ProductList {
  id: number;
  productName: string;
  productNameAr: string;
  imagePath: string;
  isOffer: boolean;
  shopId: number;
  categoryId: number;
  createAt: Date;
  categoryName: string;
  categoryNameAr: string;
  shopName: string;
  shopNameAr: string;
  isActive: boolean;
  details: {
    id: number;
    title: string;
    titleAr: string;
    price: number;
    lastPrice: number;
    note: string;
    noteAr: string;
    coverImage: string;
    itemSizeId: number;
    productId: number;
    createAt: Date;
    healthInformation: string;
    healthInformationAr: string;
  }[];
}

