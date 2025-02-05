import { Query, Types } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.search;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    // Excluding fields that are not for filtering
    const excludeFields = [
      'search',
      'sort',
      'limit',
      'page',
      'sortBy',
      'sortOrder',
      'fields',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    // filter by author id
    if (this.query.filter) {
      this.modelQuery = this.modelQuery.find({
        author: new Types.ObjectId(this.query.filter as string),
      });
    }

    return this;
  }

  sort() {
    const sortBy = this.query?.sortBy as string;
    const sortOrder = (this.query?.sortOrder as string)?.toLowerCase();
    const order = sortOrder === 'asc' ? 1 : -1;

    // If sortBy is provided, sort by that field
    if (sortBy) {
      this.modelQuery = this.modelQuery.sort({ [sortBy]: order });
    }
    // If only sortOrder is provided, sort by createdAt
    else if (sortOrder) {
      this.modelQuery = this.modelQuery.sort({ createdAt: order });
    }

    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  execute() {
    return this.modelQuery;
  }
}

export default QueryBuilder;
