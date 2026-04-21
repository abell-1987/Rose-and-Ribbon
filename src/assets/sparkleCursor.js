export const enableSparkles = () => {
    // Prevent duplicate listeners during Vite HMR
    if (window.__rrSparklesEnabled) return
    window.__rrSparklesEnabled = true

    document.addEventListener("click", (e) => {
        const sparkle = document.createElement("div")
        sparkle.className = "sparkle"
        sparkle.style.left = `${e.clientX}px`
        sparkle.style.top = `${e.clientY}px`

        document.body.appendChild(sparkle)

        setTimeout(() => sparkle.remove(), 700)
    })
}

export const enableTrail = () => {
    let last = 0

    document.addEventListener("mousemove", (e) => {
        const now = performance.now()
        if (now - last < 45) return // try 45–70
        last = now

        const star = document.createElement("div")
        star.className = "cursor-trail star-glitter"
        star.style.left = `${e.clientX}px`
        star.style.top = `${e.clientY}px`

        document.body.appendChild(star)
        setTimeout(() => star.remove(), 420) // longer life
    })
}



