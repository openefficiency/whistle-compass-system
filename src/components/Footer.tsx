import { Link } from "react-router-dom"
import { Shield } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold text-white">WhistleGuard</span>
            </div>
            <p className="mt-4 max-w-xs">
              Empowering individuals to speak up against misconduct with confidence and security.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-teal-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-teal-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-teal-400">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="hover:text-teal-400">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-teal-400">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-teal-400">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Login</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/admin-login" className="hover:text-teal-400">
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link to="/investigator-login" className="hover:text-teal-400">
                    Investigator Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} WhistleGuard. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-teal-400">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
