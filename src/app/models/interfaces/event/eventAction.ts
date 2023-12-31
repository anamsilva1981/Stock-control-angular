export interface EventAction {
  action: string;
  id?: string;
}

export interface DeleteProductionAction {
  product_id: string;
  productName: string;
}
