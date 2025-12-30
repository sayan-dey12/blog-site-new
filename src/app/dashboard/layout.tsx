import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";


export default function DashboardLayout({children}:{children:ReactNode}){
    return(
            <AuthProvider>
                <ThemeProvider 
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <main className="flex-1 pt-2">{children}</main>
                    <Toaster position="top-center" />
                </ThemeProvider>
            </AuthProvider>  
    );
}