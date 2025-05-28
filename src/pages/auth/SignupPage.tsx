"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import PublicLayout from "@/components/layout/PublicLayout"

const SignupPage = () => {
  const [companyName, setCompanyName] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bountyRange, setBountyRange] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signup(adminEmail, password, companyName, bountyRange)
      toast({
        title: "Account created successfully!",
        description: `Welcome to AegisWhistle! Your company portal: ${subdomain}.aegiswhistle.com`,
      })
      navigate("/admin/dashboard")
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateSubdomain = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .substring(0, 20)
  }

  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value)
    setSubdomain(generateSubdomain(value))
  }

  return (
    <PublicLayout>
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Company Account</CardTitle>
            <CardDescription className="text-center">Set up AegisWhistle for your organization</CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Acme Corporation"
                  value={companyName}
                  onChange={(e) => handleCompanyNameChange(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Company Portal URL</Label>
                <div className="flex items-center">
                  <Input
                    id="subdomain"
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    className="rounded-r-none"
                    placeholder="company"
                    required
                  />
                  <div className="bg-gray-100 border border-l-0 px-3 py-2 rounded-r-md text-sm text-gray-600">
                    .aegiswhistle.com
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@company.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bountyRange">Bounty Plan Range</Label>
                <Select value={bountyRange} onValueChange={setBountyRange} required>
                  <SelectTrigger id="bountyRange">
                    <SelectValue placeholder="Select bounty range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000-10000">$1,000 - $10,000</SelectItem>
                    <SelectItem value="10000-50000">$10,000 - $50,000</SelectItem>
                    <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100000-500000">$100,000 - $500,000</SelectItem>
                    <SelectItem value="500000+">$500,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-teal-600 hover:underline">
                  Sign in
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PublicLayout>
  )
}

export default SignupPage
