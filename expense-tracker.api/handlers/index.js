module.exports = {
    ...require('./user'),
    ...require('./auth'),
    ...require('./account')


}

module.exports.notFound = (req, res, next) => {
    const err = new Error('not found')
    err.status = 404

    next(err)
}

module.exports.errors = (err, req, res, next) => {
    res.status(err.status || 400).json({
        message: err.message || 'Something went wrong',
        error: true
    })
}