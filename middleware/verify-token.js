const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token

    if(token) {
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if(err) {
                res.json({
                    status: 2,
                    message: 'Failed to authenticate token.'
                })
            } else {
                //console.log('giris basarili - decoded :', decoded);
                req.decode = decoded;
                next();
            }
        })
    } else {
        res.json({
            status: 1,
            message: 'No token provided.'
        })
    }
};