import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryEvent } from 'app/models/enums/categories/CategoryEvent';
import { DeleteCategoryAction } from 'app/models/interfaces/categories/event/DeleteCategoryAction';
import { EditCategoryAction } from 'app/models/interfaces/categories/event/EditCategoryAction';
import { GetCategoriesResponse } from 'app/models/interfaces/categories/responses/GetCategoriesResponse';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';




@Component({
    selector: 'app-categories-table',
    templateUrl: './categories-table.component.html',
    styleUrls: [],
    standalone: true,
    imports: [ConfirmDialogModule, TableModule, ButtonModule, CardModule],
})
export class CategoriesTableComponent {
  @Input() public categories: Array<GetCategoriesResponse> = [];
  @Output() public categoryEvent = new EventEmitter<EditCategoryAction>();
  @Output() public deleteCategoryEvent =
    new EventEmitter<DeleteCategoryAction>();
  public categorySelected!: GetCategoriesResponse;
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  handleDeleteCategoryEvent(category_id: string, categoryName: string): void {
    if (category_id !== '' && categoryName !== '') {
      this.deleteCategoryEvent.emit({ category_id, categoryName });
    }
  }

  handleCategoryEvent(
    action: string,
    id?: string,
    categoryName?: string
  ): void {
    if (action && action !== '') {
      this.categoryEvent.emit({ action, id, categoryName });
    }
  }
}
