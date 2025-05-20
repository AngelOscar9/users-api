export const getHealthStatus = async (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: 'API is healthy',
        timestamp: new Date().toISOString(),
    });
};
