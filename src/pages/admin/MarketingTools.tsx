"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { QrCode, Download, Copy, Share } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const MarketingTools = () => {
  const [customUrl, setCustomUrl] = useState("acme.aegiswhistle.com")
  const [qrCodeText, setQrCodeText] = useState("Report concerns anonymously")
  const { toast } = useToast()

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${customUrl}`)
    toast({
      title: "URL copied!",
      description: "The whistleblower URL has been copied to your clipboard.",
    })
  }

  const handleDownloadQR = () => {
    // In a real app, this would generate and download a QR code
    toast({
      title: "QR Code downloaded!",
      description: "The QR code has been saved to your downloads folder.",
    })
  }

  const marketingMaterials = [
    {
      title: "Email Template",
      description: "Ready-to-use email template for company-wide announcements",
      content: `Subject: New Anonymous Reporting System Available

Dear Team,

We're committed to maintaining the highest ethical standards and creating a safe workplace for everyone. We're pleased to announce the launch of our new anonymous whistleblower reporting system.

🔒 Completely Anonymous
💰 Potential Rewards for Valid Reports
🤖 AI-Powered Voice Assistant
📱 Easy Access via QR Code

Report concerns at: ${customUrl}

Your voice matters, and your identity is protected.

Best regards,
Ethics Team`,
    },
    {
      title: "Poster Text",
      description: "Text for workplace posters and bulletin boards",
      content: `SPEAK UP ANONYMOUSLY

See something concerning?
Report it safely and securely.

✓ 100% Anonymous
✓ Potential Crypto Rewards
✓ AI Voice Assistant
✓ Secure & Confidential

Scan QR code or visit:
${customUrl}

Your voice matters.
Your identity is protected.`,
    },
    {
      title: "Intranet Announcement",
      description: "Content for company intranet or internal communications",
      content: `New Anonymous Reporting System Now Live

We've launched a state-of-the-art whistleblower platform to ensure our workplace remains ethical and safe for everyone.

Key Features:
• Complete anonymity guaranteed
• AI-powered voice assistant for easy reporting
• Potential cryptocurrency rewards for valid reports
• Secure, encrypted communications
• 24/7 availability

Access the platform: ${customUrl}

Questions? Contact our Ethics Team at ethics@company.com`,
    },
  ]

  return (
    <DashboardLayout title="Marketing Tools">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Marketing Tools</h1>
          <p className="text-gray-600">Promote your whistleblower platform to employees and stakeholders</p>
        </div>

        {/* QR Code Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              QR Code Generator
            </CardTitle>
            <CardDescription>Generate QR codes for easy access to your whistleblower platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customUrl">Platform URL</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="customUrl"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={handleCopyUrl}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qrCodeText">QR Code Text</Label>
                  <Input
                    id="qrCodeText"
                    value={qrCodeText}
                    onChange={(e) => setQrCodeText(e.target.value)}
                    placeholder="Text to display with QR code"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleDownloadQR} className="bg-teal-600 hover:bg-teal-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                  <Button variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <QrCode className="h-24 w-24 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">QR Code Preview</p>
                  <p className="text-xs text-gray-400 mt-2">{qrCodeText}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Materials */}
        <div className="grid gap-6">
          {marketingMaterials.map((material, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{material.title}</CardTitle>
                <CardDescription>{material.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={material.content}
                  readOnly
                  className="min-h-[200px] font-mono text-sm"
                  onClick={(e) => e.currentTarget.select()}
                />
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(material.content)
                      toast({
                        title: "Copied!",
                        description: `${material.title} has been copied to your clipboard.`,
                      })
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Text
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default MarketingTools
