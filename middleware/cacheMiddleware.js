const cache = {}

const TTL = 60 * 1000 

function cacheMiddleware(req, res, next) {

    const key = req.originalUrl

    const cachedEntry = cache[key]


    if (!cachedEntry) {

        res.setHeader('X-Cache', 'MISS')

        return saveResponseToCache(req, res, next)
    }

    const age = Date.now() - cachedEntry.createdAt

    if (age > TTL) {

        console.log('Cache expired:', key)

        delete cache[key]

        res.setHeader('X-Cache', 'MISS')

        return saveResponseToCache(req, res, next)
    }

    console.log('Cache HIT:', key)

    res.setHeader('X-Cache', 'HIT')

    return res.json(cachedEntry.data)
}


function saveResponseToCache(req, res, next) {

    const originalJson = res.json.bind(res)

    res.json = function (data) {

        const key = req.originalUrl

        cache[key] = {
            data: data,
            createdAt: Date.now()
        }

        console.log('Stored in cache:', key)

        return originalJson(data)
    }

    next()
}


function clearCache() {

    for (const key in cache) {
        delete cache[key]
    }

    console.log('Cache cleared')
}


module.exports = {
    cacheMiddleware,
    clearCache
}