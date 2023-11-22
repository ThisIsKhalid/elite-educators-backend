"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const PriceSchema = new mongoose_1.Schema({
    amountPerWeek: {
        type: Number,
        required: true,
    },
    daysPerWeek: {
        type: Number,
        required: true,
    },
});
const serviceSchema = new mongoose_1.Schema({
    instructorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    price: [PriceSchema],
    level: {
        type: String,
        enum: ['junior', 'secondary', 'higher-secondary'],
        required: true,
    },
    rating: {
        type: Number,
        default: 3,
    },
    location: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    enrolled: {
        type: Number,
        default: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    classtime: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
