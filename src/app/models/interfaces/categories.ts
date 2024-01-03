export interface DeleteCategoryAction {
  category_id: string;
  categoryName: string;
}

export interface EditCategoryAction {
  action: string;
  id?: string;
  categoryName?: string;
}

export interface GetCategoriesResponse {
  id: string;
  name: string;
}
