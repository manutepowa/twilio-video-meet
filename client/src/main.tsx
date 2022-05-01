import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

// const element: Element | DocumentFragment | null =
//   document.getElementById("root")
// ReactDOM.createRoot(element).render(<App />)
const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
