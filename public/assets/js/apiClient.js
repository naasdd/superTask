function apiReadCookie(name) {
    const cookiePrefix = `${name}=`
    return document.cookie.split(';').map(part => part.trim()).find(part => part.startsWith(cookiePrefix))?.slice(cookiePrefix.length) || ''
}

function apiBuildHeaders(headers = {}, method = 'GET') {
    const mergedHeaders = new Headers(headers)
    const safeMethods = new Set(['GET', 'HEAD', 'OPTIONS'])

    if (!safeMethods.has(method.toUpperCase())) {
        const csrfToken = apiReadCookie('st_csrf')

        if (csrfToken) {
            mergedHeaders.set('x-csrf-token', csrfToken)
        }
    }

    return mergedHeaders
}

async function apiRequest(path, options = {}) {
    const {
        headers = {},
        body,
        method = 'GET'
    } = options

    const requestInit = {
        method,
        headers: apiBuildHeaders(headers, method),
        credentials: 'include'
    }

    if (body !== undefined) {
        requestInit.body = body
    }

    const response = await fetch(path, requestInit)

    return response
}

async function apiRequestJson(path, options = {}) {
    const response = await apiRequest(path, options)
    const contentType = response.headers.get('content-type') || ''

    let payload = null

    if (contentType.includes('application/json')) {
        payload = await response.json()
    }
    else {
        payload = await response.text()
    }

    if (!response.ok) {
        const error = new Error(
            (payload && (payload.err || payload.Message || payload.Error)) ||
            `Request failed with status ${response.status}`
        )

        error.status = response.status
        error.payload = payload
        throw error
    }

    return payload
}
