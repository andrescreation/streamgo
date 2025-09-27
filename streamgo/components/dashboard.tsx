"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Navigation } from "@/components/navigation"
import { StreamSetup } from "@/components/stream-setup"
import { LiveStream } from "@/components/live-stream"
import { Analytics } from "@/components/analytics"
import { SettingsPage } from "@/components/settings-page"
import { useAuth } from "@/contexts/auth-context"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Play, Calendar, Users, Clock, Plus, Youtube, Facebook, Twitch, Instagram, LogOut } from "lucide-react"

export function Dashboard() {
  const { user, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [activeStreams] = useState(0)
  const [totalViewers] = useState(1247)

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "stream-setup":
        return <StreamSetup />
      case "live-stream":
        return <LiveStream />
      case "analytics":
        return <Analytics />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardHome activeStreams={activeStreams} totalViewers={totalViewers} />
    }
  }

  const handleProfileClick = () => {
    setCurrentPage("settings")
  }

  return (
    <div className="mobile-app-container flex flex-col md:flex-row">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

      <div className="flex-1 flex flex-col md:ml-64 max-w-full max-h-screen overflow-x-hidden">
        <header className="mobile-header relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="px-4 py-3 flex items-center justify-between max-w-full">
            <div className="flex-1 min-w-0 mr-4">
              <h2 className="text-lg font-semibold capitalize truncate">
                {currentPage === "dashboard" ? "Home" : currentPage.replace("-", " ")}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:block truncate max-w-20">{user?.name}</span>
              </button>
              <Button variant="ghost" size="sm" onClick={logout} className="h-8 w-8 p-0 md:h-9 md:w-auto md:px-3">
                <LogOut className="w-4 h-4" />
                <span className="sr-only md:not-sr-only md:ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="mobile-content p-4 max-w-full overflow-x-hidden h-full flex-1 overflow-y-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  )
}

function DashboardHome({ activeStreams, totalViewers }: { activeStreams: number; totalViewers: number }) {
  const [isStartingStream, setIsStartingStream] = useState(false)
  const [isSchedulingStream, setIsSchedulingStream] = useState(false)

  const handleStartStream = async () => {
    setIsStartingStream(true)
    console.log("[v0] Starting live stream...")
    // Simulate stream start process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsStartingStream(false)
    // In real app, this would navigate to live stream page
  }

  const handleScheduleStream = async () => {
    setIsSchedulingStream(true)
    console.log("[v0] Scheduling stream...")
    // Simulate scheduling process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSchedulingStream(false)
    // In real app, this would open calendar/scheduling interface
  }

  const handleConnectPlatform = (platform: string) => {
    console.log(`[v0] Connecting to ${platform}...`)
    // In real app, this would open OAuth flow for platform connection
  }

  return (
    <div className="space-y-6 max-w-full">
      <div className="grid grid-cols-3 gap-3 w-full">
        <Card className="gradient-card border-border/50">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Play className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-lg font-bold">{activeStreams}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground">Viewers</p>
              <p className="text-lg font-bold">{totalViewers.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="p-3">
            <div className="text-center">
              <div className="w-8 h-8 bg-chart-2/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-chart-2" />
              </div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm font-bold">24h 15m</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="gradient-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription className="text-sm">Start streaming or schedule your next broadcast</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Modal>
            <ModalTrigger asChild>
              <Button size="lg" className="w-full justify-center glow-effect h-12 text-base">
                <Play className="w-5 h-5 mr-3" />
                Go Live Now
              </Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Start Live Stream</ModalTitle>
                <ModalDescription>Are you ready to start streaming to all connected platforms?</ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm" onClick={handleStartStream} disabled={isStartingStream}>
                  {isStartingStream ? "Starting..." : "Start Stream"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline" size="lg" className="w-full justify-center h-12 text-base bg-transparent">
                <Calendar className="w-5 h-5 mr-3" />
                Schedule Stream
              </Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Schedule Stream</ModalTitle>
                <ModalDescription>Plan your stream for a specific date and time.</ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm" onClick={handleScheduleStream} disabled={isSchedulingStream}>
                  {isSchedulingStream ? "Scheduling..." : "Schedule"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </CardContent>
      </Card>

      <Card className="gradient-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Connected Platforms</CardTitle>
          <CardDescription className="text-sm">Manage your streaming destinations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Youtube className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">YouTube</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  Live
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Facebook className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Facebook</p>
                <Badge variant="outline" className="text-xs mt-1">
                  Setup
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Twitch className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Twitch</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  Live
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Instagram className="w-5 h-5 text-pink-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Instagram</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 mt-1"
                  onClick={() => handleConnectPlatform("Instagram")}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="gradient-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm font-medium">Best Time to Stream</p>
            <p className="text-xs text-muted-foreground mt-1">8 PM weekdays for maximum engagement</p>
          </div>
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm font-medium">Content Suggestion</p>
            <p className="text-xs text-muted-foreground mt-1">Gaming content performs 40% better</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
