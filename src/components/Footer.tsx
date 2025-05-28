import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-950">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/follow-up" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Follow Up
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
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
          </div>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Aegis Whistle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
