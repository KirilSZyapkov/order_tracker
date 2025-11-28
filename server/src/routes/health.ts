import { Router } from 'express';
const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

export default router;

// routes/health.ts - за търсене в чат джи пи ти