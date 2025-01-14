'use client'
import Timeline from "../components/timeline"
import { createTheme } from "@mui/material"
import  ThemeProvider  from "@mui/material/styles/ThemeProvider"
import { Geist_Mono } from "next/font/google"


const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  }); 
  
export default function Page() {

    const theme = createTheme({
        typography: {
          fontFamily: geistMono.className
        },
      });
      
    return (
        <ThemeProvider theme={theme}>

        <Timeline/>

        </ThemeProvider>
    )
    
  }