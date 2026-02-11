// src/App.jsx
import "./App.css";
import AppRouter from "./router/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
        reverseOrder={false}
      />
    </>
  );
}

export default App;
