import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

const HomeHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-blue-800" />
            <span className="ml-2 text-xl font-bold text-blue-900">WhistleGuard</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-800 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-800 font-medium">
              About
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-blue-800 font-medium">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Link to="/admin-login">
              <Button variant="outline" className="text-blue-800 border-blue-800">
                Admin Login
              </Button>
            </Link>
            <Link to="/investigator-login">
              <Button className="bg-blue-800 hover:bg-blue-900 text-white">Investigator Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HomeHeader
