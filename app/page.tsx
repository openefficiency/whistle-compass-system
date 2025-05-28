import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Users, Award, Phone, MessageSquare, FileText } from "lucide-react"
import Link from "next/link"

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">WhistleGuard</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">
                How It Works
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/admin-login">
                <Button variant="outline">Admin Login</Button>
              </Link>
              <Link href="/investigator-login">
                <Button>Investigator Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Speak Up Safely with <span className="text-blue-600">AI-Powered</span> Whistleblowing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Report misconduct confidentially through our advanced voice AI system. Your identity is protected while
            ensuring your voice is heard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Voice Report
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              <Phone className="mr-2 h-5 w-5" />
              Call Hotline
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              <FileText className="mr-2 h-5 w-5" />
              Written Report
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WhistleGuard?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Lock className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Complete Anonymity</CardTitle>
                <CardDescription>
                  Your identity is fully protected with end-to-end encryption and anonymous reporting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>AI Voice Assistant</CardTitle>
                <CardDescription>
                  Natural conversation with our AI that guides you through the reporting process.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Crypto Rewards</CardTitle>
                <CardDescription>
                  Receive cryptocurrency rewards for verified reports that lead to positive outcomes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Expert Investigation</CardTitle>
                <CardDescription>
                  Professional investigators review and act on your reports with complete confidentiality.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Legal Protection</CardTitle>
                <CardDescription>
                  Full legal protection for whistleblowers under applicable laws and regulations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-teal-600 mb-4" />
                <CardTitle>Case Tracking</CardTitle>
                <CardDescription>
                  Track the progress of your report with secure case ID and regular updates.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Your Method</h3>
              <p className="text-gray-600">Select voice AI, phone call, or written report</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Your Concern</h3>
              <p className="text-gray-600">Provide details about the misconduct safely and anonymously</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Review</h3>
              <p className="text-gray-600">Expert investigators review and validate your report</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Action & Rewards</h3>
              <p className="text-gray-600">Appropriate action is taken and you receive crypto rewards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Your voice matters. Report misconduct safely and help create a better workplace for everyone.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Your Report Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold text-white">WhistleGuard</span>
              </div>
              <p className="text-sm">
                Empowering individuals to speak up against misconduct with confidence and security.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-white">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} WhistleGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Page
