import { Router } from 'express';
import {
  convertCurrency,
  getHistory,
} from '../controllers/currencyController.js';
import { validateCurrencyInput } from '../middlewares/validationMiddleware.js';

const router = Router();

router.post('/convert', validateCurrencyInput, convertCurrency);
router.get('/history', getHistory);

export default router;
