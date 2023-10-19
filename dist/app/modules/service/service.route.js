"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_controller_1 = require("./service.controller");
const service_validation_1 = require("./service.validation");
const router = express_1.default.Router();
router.post('/add-service', (0, validateRequest_1.default)(service_validation_1.ServiceValidations.addServiceSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), service_controller_1.ServiceControllers.createService);
router.patch('/update-service/:id', (0, validateRequest_1.default)(service_validation_1.ServiceValidations.updateServiceSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), service_controller_1.ServiceControllers.updateService);
router.get('/:id', service_controller_1.ServiceControllers.getSingleService);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), service_controller_1.ServiceControllers.deleteService);
router.get('/', service_controller_1.ServiceControllers.getAllService);
exports.ServiceRoutes = router;
