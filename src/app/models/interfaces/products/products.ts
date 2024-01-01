export interface Products {
  id: string;
  name: string;
  amount: number;
  description: string;
  price: string;
  category: {
    id: string;
    name: string;
  }
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  amount: number;
  category_id: string;
}

export interface CreateProductResponse {
  id: string;
  name: string;
  price: string;
  description: string;
  amount: number;
  category_id: string;
}

export interface CreateProductRequest {
  name: string;
  price: string;
  description: string;
  category_id: string;
  amount: number;
}

export interface EditProductResponse {
  name: string;
  price: string;
  description: string;
  product_id: string;
  amount: number;
  category_id: string;

}



