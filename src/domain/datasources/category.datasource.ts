export abstract class CategoryDatasource {
  abstract getCategories: () => Promise<void>;
  abstract createCategory: () => Promise<void>;
}
