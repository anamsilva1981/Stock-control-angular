export interface DeleteProductAction {
  product_id: string;
  productName: string;
}

export interface EventAction {
  action: string;
  id?: string;
}

export interface CreateProductRequest {
  name: string;
  price: string;
  description: string;
  category_id: string;
  amount: number;
}

export interface EditProductRequest {
  name: string;
  price: string;
  description: string;
  product_id: string;
  amount: number;
}

export interface SaleProductRequest {
  amount: number;
  product_id: string;
}
