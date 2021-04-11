module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(200).json({
            error: false,
            message: 'Bonjour, mon ami',
        });
    });
    
    app.use('/', require('./auth/api'));
}