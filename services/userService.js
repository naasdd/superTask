const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Users = require('../model/users.js')
const { jwtKey } = require('../middleware/verifyJWT.js')
const { DomainError } = require('./domainError.js')
const { requireTrimmedString } = require('./domainUtils.js')

async function getAuthenticatedAccount(userId) {
    const user = await Users.findByPk(userId, {
        attributes: ['email', 'username']
    })

    if (!user) {
        throw new DomainError('Usuário não encontrado.', 404)
    }

    return user
}

async function signUp({ email, username, password }) {
    const normalizedEmail = requireTrimmedString(email, 'Email', { maxLength: 100 })
    const normalizedUsername = requireTrimmedString(username, 'Usuário', { maxLength: 60 })
    const normalizedPassword = requireTrimmedString(password, 'Senha', { maxLength: 100 })

    const searchOnDatabase = await Users.findOne({ where: { email: normalizedEmail }, raw: true })

    if (searchOnDatabase != null) {
        throw new DomainError('Email already used.', 403)
    }

    const hash = await bcrypt.hash(normalizedPassword, 10)
    const createdUser = await Users.create({
        email: normalizedEmail,
        username: normalizedUsername,
        password: hash
    })

    return {
        id: createdUser.id,
        email: createdUser.email,
        username: createdUser.username
    }
}

async function logIn({ email, password }) {
    const normalizedEmail = requireTrimmedString(email, 'Email', { maxLength: 100 })
    const normalizedPassword = requireTrimmedString(password, 'Senha', { maxLength: 100 })

    const searchOnDatabase = await Users.findOne({ where: { email: normalizedEmail }, raw: true })

    if (searchOnDatabase == null) {
        throw new DomainError('Usuário não encontrado.', 404)
    }

    const result = await bcrypt.compare(normalizedPassword, searchOnDatabase.password)

    if (!result) {
        throw new DomainError('Senha incorreta.', 401)
    }

    const token = jwt.sign(
        { userId: searchOnDatabase.id, email: searchOnDatabase.email },
        jwtKey,
        { expiresIn: '7d' }
    )

    const csrfToken = crypto.randomBytes(32).toString('hex')

    return { token, csrfToken }
}

module.exports = {
    getAuthenticatedAccount,
    logIn,
    signUp
}
