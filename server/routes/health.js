import express from 'express';

const router = express.Router();

/**
 * @route   GET /api/health/ping
 * @desc    Ping endpoint for health check
 * @access  Public
 */
router.get('/ping', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'pong',
        timestamp: new Date().toISOString()
    });
});

export default router;
