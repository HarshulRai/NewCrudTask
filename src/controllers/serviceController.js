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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.getServices = exports.createService = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'codefortommorow',
    password: '12345',
    port: 5432,
});
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id, service_name, type, price } = req.body;
        const result = yield pool.query('INSERT INTO services (category_id, service_name, type, price) VALUES ($1, $2, $3, $4) RETURNING *', [category_id, service_name, type, price]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createService = createService;
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const result = yield pool.query('SELECT * FROM services WHERE category_id = $1', [categoryId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error getting services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getServices = getServices;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.serviceId;
        const { category_id, service_name, type, price } = req.body;
        const result = yield pool.query('UPDATE services SET category_id = $1, service_name = $2, type = $3, price = $4 WHERE id = $5 RETURNING *', [category_id, service_name, type, price, serviceId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.serviceId;
        const result = yield pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [serviceId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteService = deleteService;
