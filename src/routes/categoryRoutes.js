"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const router = express_1.default.Router();
router.post('/', categoryController_1.createCategory);
router.get('/categories', categoryController_1.getCategory);
router.put('/:categoryId', categoryController_1.updateCategory);
router.delete('/:categoryId', categoryController_1.deleteCategory);
exports.default = router;
