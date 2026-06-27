const userService = require('../services/userService.js')
const { isDomainError } = require('../services/domainError.js')

const cookieBaseOptions = {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production'
}


const validateAccount = async (req, res) => {
    try {
        const info = await userService.getAuthenticatedAccount(req.authenticatedUserId)
        res.status(200).json({ email: info.email, username: info.username })
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ Message: err.message })
        }

        return res.status(500).json({ Message: 'Internal server error' })
    }
}

const signIn = async (req, res) => {
    try {
        await userService.signUp(req.body)
        res.status(200).json({ Message: "User signed in." })
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ Message: err.message })
        }

        return res.status(500).json({ Message: 'Internal server error' })
    }
}

const logIn = async (req, res) => {
    try {
        const { token, csrfToken } = await userService.logIn(req.body)

        res.cookie('st_auth', token, {
            ...cookieBaseOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.cookie('st_csrf', csrfToken, {
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ auth: true })
    }
    catch (err) {
        if (isDomainError(err)) {
            return res.status(err.statusCode).json({ auth: false, Message: err.message })
        }

        return res.status(500).json({ Message: 'Internal server error' })
    }
}

const logOut = async (req, res) => {
    res.clearCookie('st_auth', {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    })
    res.clearCookie('st_csrf', {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(200).json({ Message: 'Logged out' })
}

module.exports = { validateAccount, signIn, logIn, logOut }
