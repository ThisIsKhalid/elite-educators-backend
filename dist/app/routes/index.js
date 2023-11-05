"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const service_route_1 = require("../modules/service/service.route");
const user_route_1 = require("../modules/user/user.route");
const booking_route_1 = require("../modules/bookings/booking.route");
const serviceReview_route_1 = require("../modules/serviceReview/serviceReview.route");
const order_route_1 = require("../modules/paymentOrder/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/services',
        routes: service_route_1.ServiceRoutes,
    },
    {
        path: '/bookings',
        routes: booking_route_1.BookingRoutes,
    },
    {
        path: '/reviews',
        routes: serviceReview_route_1.CourseReviewRoutes,
    },
    {
        path: '/orders',
        routes: order_route_1.OrderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
