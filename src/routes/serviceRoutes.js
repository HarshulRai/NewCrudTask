"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceController_1 = require("../controllers/serviceController");
const router = express_1.default.Router();
router.post('/:categoryId.service', serviceController_1.createService);
router.get('/:cateogryId/services', serviceController_1.getServices);
router.put('/:categoryId/service/:serviceId', serviceController_1.updateService);
router.delete('/:categoryId/service/:serviceId', serviceController_1.deleteService);
exports.default = router;
