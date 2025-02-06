"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.search;
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
        const queryObj = Object.assign({}, this.query);
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
                author: new mongoose_1.Types.ObjectId(this.query.filter),
            });
        }
        return this;
    }
    sort() {
        var _a, _b, _c;
        const sortBy = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy;
        const sortOrder = (_c = (_b = this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) === null || _c === void 0 ? void 0 : _c.toLowerCase();
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
        var _a, _b;
        const page = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    execute() {
        return this.modelQuery;
    }
}
exports.default = QueryBuilder;
