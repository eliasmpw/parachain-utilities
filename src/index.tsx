import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import WebFont from "webfontloader"
import { Provider } from "react-redux"
import setupStore from "./store"
import { PersistGate } from "redux-persist/integration/react"

const { store, persistor } = setupStore()

WebFont.load({
  google: {
    families: [
      "Work Sans:300,400,700,300italic,400italic,700italic",
      "sans-serif",
    ],
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
