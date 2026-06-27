function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = false
        script.onload = () => resolve(src)
        script.onerror = () => reject(new Error(`Falha ao carregar ${src}`))
        document.body.appendChild(script)
    })
}

async function loadScriptsSequentially(sources) {
    for (const src of sources) {
        await loadScript(src)
    }
}
