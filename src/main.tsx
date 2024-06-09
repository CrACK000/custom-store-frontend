import React from 'react'
import ReactDOM from 'react-dom/client'
import {ThemeProvider} from "@/components/theme-provider"
import './assets/styles.css'
import App from "@/App"
import {Toaster} from "@/components/ui/toaster"
import client from "@/hooks/apollo-client";
import {ApolloProvider} from "@apollo/client";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App/>
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
