"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const CompanySettings = () => {
  const [settings, setSettings] = useState({
    companyName: "Acme Corporation",
    subdomain: "acme",
    themeColor: "#0d9488",
    bountyMin: "1000",
    bountyMax: "50000",
    welcomeMessage: "Welcome to our secure whistleblower platform. Your voice matters.",
    contactEmail: "ethics@acme.com",
  })

  const { toast } = useToast()

  const handleSave = () => {
    // In a real app, this would save to the database
    toast({
      title: "Settings saved!",
      description: "Your company settings have been updated successfully.",
    })
  }

  return (
    <DashboardLayout title="Company Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Company Settings</h1>
          <p className="text-gray-600">Manage your organization's whistleblower platform configuration</p>
        </div>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your company's basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomain</Label>
                  <div className="flex items-center">
                    <Input
                      id="subdomain"
                      value={settings.subdomain}
                      onChange={(e) => setSettings({ ...settings, subdomain: e.target.value })}
                      className="rounded-r-none"
                    />
                    <div className="bg-gray-100 border border-l-0 px-3 py-2 rounded-r-md text-sm text-gray-600">
                      .aegiswhistle.com
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Ethics Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bounty Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Bounty Configuration</CardTitle>
              <CardDescription>Set the reward range for valid whistleblower reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bountyMin">Minimum Bounty ($)</Label>
                  <Input
                    id="bountyMin"
                    type="number"
                    value={settings.bountyMin}
                    onChange={(e) => setSettings({ ...settings, bountyMin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bountyMax">Maximum Bounty ($)</Label>
                  <Input
                    id="bountyMax"
                    type="number"
                    value={settings.bountyMax}
                    onChange={(e) => setSettings({ ...settings, bountyMax: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customization */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Customization</CardTitle>
              <CardDescription>Customize the look and feel of your whistleblower platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="themeColor">Theme Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="themeColor"
                    type="color"
                    value={settings.themeColor}
                    onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.themeColor}
                    onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                    placeholder="#0d9488"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  value={settings.welcomeMessage}
                  onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                  placeholder="Enter a welcome message for whistleblowers"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CompanySettings
