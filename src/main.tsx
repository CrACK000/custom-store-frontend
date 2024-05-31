import React from 'react'
import ReactDOM from 'react-dom/client'
import {ThemeProvider} from "@/components/theme-provider"
import './assets/styles.css'
import App from "@/App"
import {Toaster} from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App/>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>,
)
