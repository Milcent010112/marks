class JWT {
    constructor (jwt) {
        if (JWT.instance == null) {
            this._jwt = jwt;
            
            JWT.instance = this;
        }

        return JWT.instance;
        
    };

    getRefreshToken = (data) => (
        this._jwt.sign(data, process.env.JWT_REFRESH_TKN)
    );

    getAccessToken = (data, expiresIn = '4h') => (
        this._jwt.sign(data, process.env.JWT_ACC_TKN, { expiresIn })
    );

    verify = (token, callback) => {
        this._jwt.verify(token, process.env.JWT_ACC_TKN, (err, data) => {
            callback(data);
        });
    };
}

module.exports = new JWT(require('jsonwebtoken'));