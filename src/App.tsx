import { RouterProvider } from "react-router"
import router from "./routes"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
         <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
