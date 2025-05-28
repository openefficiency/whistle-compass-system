"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function HomeHeader() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-teal-600"
            >
              <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
              <path d="M12 9v4" />
              <path d="M12 16h.01" />
            </svg>
            <span className="text-xl font-bold">Aegis Whistle</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/follow-up" className="text-sm font-medium hover:underline">
            Follow Up
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link to="/signup" className="hidden md:block">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
