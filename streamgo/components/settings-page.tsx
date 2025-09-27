"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { User, Settings, Palette, Bell, Youtube, Facebook, Twitch, Instagram, Plus, Monitor } from "lucide-react"

const overlayTemplates = [
  { id: 1, name: "Gaming Pro", preview: "/gaming-overlay.jpg", category: "Gaming" },
  { id: 2, name: "Minimal Clean", preview: "/minimal-overlay.png", category: "Minimal" },
  { id: 3, name: "Neon Glow", preview: "/neon-overlay.jpg", category: "Creative" },
  { id: 4, name: "Corporate", preview: "/corporate-overlay.jpg", category: "Business" },
  { id: 5, name: "Retro Wave", preview: "/retro-overlay.jpg", category: "Retro" },
  { id: 6, name: "Nature Zen", preview: "/nature-overlay.jpg", category: "Nature" },
]

export function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedOverlay, setSelectedOverlay] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [notifications, setNotifications] = useState({
    newFollowers: true,
    streamStart: true,
    chatMessages: false,
    donations: true,
  })

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved successfully.",
    })
  }

  const handleSaveOverlay = () => {
    toast({
      title: "Overlay updated",
      description: "Your stream overlay has been updated successfully.",
    })
  }

  const handleUploadAvatar = async () => {
    setIsUploading(true)
    console.log("[v0] Uploading avatar...")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsUploading(false)
    toast({
      title: "Avatar uploaded",
      description: "Your profile picture has been updated successfully.",
    })
  }

  const handleConnectPlatform = async (platform: string) => {
    setIsConnecting(platform)
    console.log(`[v0] Connecting to ${platform}...`)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnecting(null)
    toast({
      title: `${platform} connected`,
      description: `Successfully connected your ${platform} account.`,
    })
  }

  const handleDisconnectPlatform = (platform: string) => {
    console.log(`[v0] Disconnecting from ${platform}...`)
    toast({
      title: `${platform} disconnected`,
      description: `Your ${platform} account has been disconnected.`,
    })
  }

  const handleUploadCustomOverlay = async () => {
    setIsUploading(true)
    console.log("[v0] Uploading custom overlay...")
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setIsUploading(false)
    toast({
      title: "Custom overlay uploaded",
      description: "Your custom overlay has been uploaded successfully.",
    })
  }

  const handleSaveNotifications = () => {
    console.log("[v0] Saving notification settings:", notifications)
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    })
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <Tabs defaultValue="profile" className="space-y-4 md:space-y-6">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-5 min-w-[500px] md:min-w-0">
            <TabsTrigger value="profile" className="text-xs md:text-sm">
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs md:text-sm">
              Theme
            </TabsTrigger>
            <TabsTrigger value="platforms" className="text-xs md:text-sm">
              Platforms
            </TabsTrigger>
            <TabsTrigger value="overlays" className="text-xs md:text-sm">
              Overlays
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs md:text-sm">
              Notifications
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="appearance" className="space-y-4 md:space-y-6">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Monitor className="w-5 h-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription className="text-sm">Customize the look and feel of your app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1 pr-4">
                  <p className="font-medium text-sm md:text-base">Theme</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Choose between light, dark, or system theme
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4 md:space-y-6">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
              <CardDescription className="text-sm">Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                <Avatar className="w-16 h-16 md:w-20 md:h-20">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-base md:text-lg">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center md:text-left">
                  <Modal>
                    <ModalTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 bg-transparent">
                        Change Avatar
                      </Button>
                    </ModalTrigger>
                    <ModalContent>
                      <ModalHeader>
                        <ModalTitle>Change Avatar</ModalTitle>
                        <ModalDescription>
                          Upload a new profile picture. Recommended: 400x400px, max 2MB
                        </ModalDescription>
                      </ModalHeader>
                      <ModalFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleUploadAvatar} disabled={isUploading}>
                          {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                  <p className="text-xs text-muted-foreground">Recommended: 400x400px, max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">
                    Display Name
                  </Label>
                  <Input id="name" defaultValue={user?.name || ""} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input id="email" type="email" defaultValue={user?.email || ""} className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm">
                    Bio
                  </Label>
                  <Input id="bio" placeholder="Tell viewers about yourself..." className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm">
                    Location
                  </Label>
                  <Input id="location" placeholder="Your location" className="h-10" />
                </div>
              </div>

              <Modal>
                <ModalTrigger asChild>
                  <Button className="h-10 md:h-11">Save Changes</Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Save Profile Changes</ModalTitle>
                    <ModalDescription>Are you sure you want to save these profile changes?</ModalDescription>
                  </ModalHeader>
                  <ModalFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4 md:space-y-6">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-xl">Connected Platforms</CardTitle>
              <CardDescription className="text-sm">Manage your streaming platform connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="grid gap-3 md:gap-4">
                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Youtube className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                    <div>
                      <p className="font-medium text-sm md:text-base">YouTube</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Connected as @streamergamer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Connected
                    </Badge>
                    <Modal>
                      <ModalTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <ModalHeader>
                          <ModalTitle>YouTube Settings</ModalTitle>
                          <ModalDescription>Manage your YouTube streaming settings and preferences.</ModalDescription>
                        </ModalHeader>
                        <ModalFooter>
                          <Button variant="outline">Disconnect</Button>
                          <Button>Save Settings</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Twitch className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                    <div>
                      <p className="font-medium text-sm md:text-base">Twitch</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Connected as streamergamer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Connected
                    </Badge>
                    <Modal>
                      <ModalTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <ModalHeader>
                          <ModalTitle>Twitch Settings</ModalTitle>
                          <ModalDescription>Manage your Twitch streaming settings and preferences.</ModalDescription>
                        </ModalHeader>
                        <ModalFooter>
                          <Button variant="outline">Disconnect</Button>
                          <Button>Save Settings</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Facebook className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm md:text-base">Facebook</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Connected as Streamer Gamer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Connected
                    </Badge>
                    <Modal>
                      <ModalTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-transparent">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <ModalHeader>
                          <ModalTitle>Facebook Settings</ModalTitle>
                          <ModalDescription>Manage your Facebook streaming settings and preferences.</ModalDescription>
                        </ModalHeader>
                        <ModalFooter>
                          <Button variant="outline">Disconnect</Button>
                          <Button>Save Settings</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg border bg-muted/50 opacity-60">
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
                    <div>
                      <p className="font-medium text-sm md:text-base">Instagram</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Modal>
                    <ModalTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    </ModalTrigger>
                    <ModalContent>
                      <ModalHeader>
                        <ModalTitle>Connect Instagram</ModalTitle>
                        <ModalDescription>
                          Connect your Instagram account to start streaming to Instagram Live.
                        </ModalDescription>
                      </ModalHeader>
                      <ModalFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button
                          onClick={() => handleConnectPlatform("Instagram")}
                          disabled={isConnecting === "Instagram"}
                        >
                          {isConnecting === "Instagram" ? "Connecting..." : "Connect Instagram"}
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overlays" className="space-y-4 md:space-y-6">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Palette className="w-5 h-5" />
                Stream Overlays
              </CardTitle>
              <CardDescription className="text-sm">Choose and customize your stream overlay templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {overlayTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative p-2 md:p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOverlay === template.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-muted/50 hover:border-border/80"
                    }`}
                    onClick={() => setSelectedOverlay(template.id)}
                  >
                    <div className="aspect-video bg-gray-800 rounded-md mb-2 md:mb-3 overflow-hidden">
                      <img
                        src={template.preview || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-xs md:text-sm">{template.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    {selectedOverlay === template.id && (
                      <div className="absolute top-1 md:top-2 right-1 md:right-2">
                        <Badge variant="default" className="text-xs">
                          Selected
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                <Modal>
                  <ModalTrigger asChild>
                    <Button className="w-full md:w-auto h-10 md:h-11">Apply Overlay</Button>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      <ModalTitle>Apply Overlay</ModalTitle>
                      <ModalDescription>
                        Apply the selected overlay to your stream? This will replace your current overlay.
                      </ModalDescription>
                    </ModalHeader>
                    <ModalFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleSaveOverlay}>Apply Overlay</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <Modal>
                  <ModalTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto h-10 md:h-11 bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Custom
                    </Button>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      <ModalTitle>Upload Custom Overlay</ModalTitle>
                      <ModalDescription>
                        Upload your own custom overlay design. Supported formats: PNG, GIF
                      </ModalDescription>
                    </ModalHeader>
                    <ModalFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={handleUploadCustomOverlay} disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Upload"}
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 md:space-y-6">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-sm">Configure when and how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1 pr-4">
                    <p className="font-medium text-sm md:text-base">New Followers</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Get notified when someone follows your stream
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newFollowers}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newFollowers: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1 pr-4">
                    <p className="font-medium text-sm md:text-base">Stream Start</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Notify followers when you go live</p>
                  </div>
                  <Switch
                    checked={notifications.streamStart}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, streamStart: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1 pr-4">
                    <p className="font-medium text-sm md:text-base">Chat Messages</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Desktop notifications for new chat messages
                    </p>
                  </div>
                  <Switch
                    checked={notifications.chatMessages}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, chatMessages: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1 pr-4">
                    <p className="font-medium text-sm md:text-base">Donations & Tips</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Get notified about donations and tips</p>
                  </div>
                  <Switch
                    checked={notifications.donations}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, donations: checked }))}
                  />
                </div>
              </div>

              <Modal>
                <ModalTrigger asChild>
                  <Button className="w-full md:w-auto h-10 md:h-11">Save Notification Settings</Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Save Notification Settings</ModalTitle>
                    <ModalDescription>
                      Save your notification preferences? You can change these anytime.
                    </ModalDescription>
                  </ModalHeader>
                  <ModalFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSaveNotifications}>Save Settings</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
