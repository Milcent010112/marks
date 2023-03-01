class QueryBuilder {
    constructor (model) {
        this._model = model;
        this._find = null;
    };

    _getAllDocs = (condition) => (this._model.find(condition));

    _getSingleDoc = (condition) => (this._model.findOne(condition));

    _populate = (populate) => {
        if (!populate)
            return;

        populate.forEach(field => {
            this._find.populate(field[0], field[1]);
        })
    };

    _execFind = (query) => {
        const { find, select, populate, limit, skip, sort } = query;

        this._find = find;

        return new Promise ((resolve, reject) => {
            this._find.select(select);
            this._find.sort(sort);

            this._populate(populate);

            if (limit)
                this._find.limit(limit);

            if (skip)
                this._find.skip(skip);

            this._find.exec((err, documents) => {
                if (err == null)
                    resolve(documents);
                else
                    reject('Something went wrong, try again later');
            });
        });
    };

    findWithOr = ({ condition, populate, limit, skip, sort = { createdAt: -1 }, select }) => {
        return new Promise ((resolve, reject) => {
            let __find = this._model.find().or(condition);
            __find.select(select);
            __find.sort(sort);

            if (limit)
                __find.limit(limit);

            if (skip)
                __find.skip(skip);

            if (populate)
                populate.forEach(field => {
                    __find.populate(field[0], field[1]);
                })

            __find.select(select)
                .exec((err, data) => {
                    if (err == null)
                        resolve(data);
                    else 
                        reject(err);
                })
        });
    }

    add = (data) => new Promise((resolve, reject) => {
        new this._model(data).save((err, newDocument) => {
            if (err == null)
                resolve(newDocument);
            else
                reject(err);
        });
    });

    updateOne = (condition, data) => new Promise((resolve, reject) => {
        const update = this._model.updateOne(condition, data);

       if (update.nModified != 0)
            resolve(update);

        else
            reject('Something went wrong, try again later')
    });

    exists = (condition) => new Promise((resolve, reject) => {
        this._model.exists(condition, (err, bool) => {
            if (err == null)
                resolve(bool);
            else
                reject('Something went wrong, try again later');
        });
    });

    count = (condition) => new Promise((resolve, reject) => {
        this._model.where(condition).countDocuments((err, count) => {
            if (err == null)
                resolve(count);
            else
                reject('Something went wrong, try again later');
        });
    });

    find = (query) => this._execFind({
        find: this._getAllDocs(query.condition),
        select: query.select || '',
        populate: query.populate || null,
        limit: query.limit || null,
        skip: query.skip || null,
        sort: query.sort || { createdAt: -1 }
    });

    findOne = (query) => this._execFind({
        find: this._getSingleDoc(query.condition),
        select: query.select || '',
        populate: query.populate || null,
        limit: query.limit || null,
        skip: query.skip || null,
        sort: query.sort || { createdAt: -1 }
    });
};

module.exports = QueryBuilder;