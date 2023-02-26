

export class CategoryAdd {
  id : number;
  categoryName :  string ;
  categoryNameAr :  string ;
  categoryImage :  string ;
  imageName :  string ;
  isActive : boolean;
  createAt :  Date;
}

export class Category extends CategoryAdd {
  id : number;
  categoryName :  string ;
  categoryNameAr :  string ;
  categoryImage :  string ;
  imageName :  string ;
  isActive : boolean;
  createAt :  Date;
}

export class GeneralSuggestFilter {
  PageNumber: number;
  PageSize: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  ApplicationUserId: string;
  categoryName :  string ;
  categoryNameAr: string;
}
