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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_model_1 = require("./user.model");
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { role, password } = payload, others = __rest(payload, ["role", "password"]);
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, others, {
        new: true,
    });
    return updatedUser;
});
const deleteUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'user' && user.id !== id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You cannot delete this user');
    }
    if (user.role === 'super_admin' && user.id === id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You cannot delete this user');
    }
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const getUserProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return result;
});
const getAllUser = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        if (sortOrder === 'asc' || sortOrder === 'desc') {
            sortConditions[sortBy] = sortOrder;
        }
    }
    const result = yield user_model_1.User.find().sort(sortConditions).skip(skip).limit(limit);
    const total = yield user_model_1.User.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//! super_admin----------------------------------------------------------------
// change role user to admin, admin to user
const changeRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (isExist.role === 'super_admin') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You cannot change role this user');
    }
    // console.log(isExist);
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { role: isExist.role === 'admin' ? 'user' : 'admin' }, {
        new: true,
    });
    return updatedUser;
});
exports.UserServices = {
    updateUser,
    getUserProfile,
    getAllUser,
    deleteUser,
    changeRole,
};
