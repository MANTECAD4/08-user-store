export abstract class CategoryRepository {
  abstract getCategories: () => Promise<void>;
  abstract createCategory: () => Promise<void>;
}
