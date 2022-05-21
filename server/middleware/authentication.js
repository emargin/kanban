const onlyAuthenticated = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return next()
        }
        return res.status(401).send()
    } catch (error) {
        console.log(error)
    }
}

const onlyNotAuthenticated = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) {
            return next()
        }
        return res.status(403).send()
    } catch (error) {
        console.log(error)
    }
}

export { onlyAuthenticated, onlyNotAuthenticated }
