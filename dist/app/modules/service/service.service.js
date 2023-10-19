"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const service_constant_1 = require("./service.constant");
const service_model_1 = require("./service.model");
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield service_model_1.Service.create(payload)).populate('instructorId');
    return result;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield service_model_1.Service.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const result = yield service_model_1.Service.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById(id).populate('instructorId');
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield service_model_1.Service.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const result = yield service_model_1.Service.findByIdAndDelete(id);
    return result;
});
const getAllService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, rating: ratingData, isAvailable, level } = filters, filtersData = __rest(filters, ["searchTerm", "rating", "isAvailable", "level"]);
    const andConditions = [];
    // if (minPrice) {
    //   andConditions.push({
    //     price: {
    //       $gte: parseFloat(minPrice.toString()),
    //     },
    //   });
    // }
    // if (maxPrice) {
    //   andConditions.push({
    //     price: {
    //       $lte: parseFloat(maxPrice.toString()),
    //     },
    //   });
    // }
    if (level) {
        andConditions.push({
            level: level,
        });
    }
    if (ratingData) {
        const minRating = parseFloat(ratingData.toString());
        const maxRating = minRating + 1;
        andConditions.push({
            $and: [{ rating: { $gte: minRating } }, { rating: { $lt: maxRating } }],
        });
    }
    //  partial match
    if (searchTerm) {
        andConditions.push({
            $or: service_constant_1.serviceSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (isAvailable !== undefined) {
        andConditions.push({
            isAvailable: isAvailable,
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        if (sortOrder === 'asc' || sortOrder === 'desc') {
            sortConditions[sortBy] = sortOrder;
        }
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield service_model_1.Service.find(whereConditions)
        .populate('instructorId')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .lean();
    const total = yield service_model_1.Service.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.ServiceServices = {
    createService,
    updateService,
    getSingleService,
    deleteService,
    getAllService,
};
