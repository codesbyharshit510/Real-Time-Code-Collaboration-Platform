import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import AppProvider from "./context/AppProvider.tsx"
// This line fixes the "Broken UI" by bundling the styles correctly
import "tldraw/tldraw.css"
import "@/styles/global.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AppProvider>
        <App />
    </AppProvider>,
)