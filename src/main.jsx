import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import { App } from "./App"

// 🎀 Sparkle + trail cursor effects
import { enableSparkles, enableTrail } from "./assets/sparkleCursor"

// Enable effects once for the entire app
enableSparkles()
enableTrail()

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
