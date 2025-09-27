"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Play,
  Video,
  Youtube,
  Twitch,
  Facebook,
  Users,
  MessageCircle,
  Mic,
  Settings,
  Maximize,
  Square,
  Heart,
  Share,
} from "lucide-react"
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"

export function LiveStream() {
  const [isLive, setIsLive] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [chatMessage, setChatMessage] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "StreamFan123", message: "Great stream!", platform: "youtube", timestamp: "2 min ago" },
    { id: 2, user: "GamerPro", message: "Love the content!", platform: "twitch", timestamp: "1 min ago" },
    { id: 3, user: "ContentLover", message: "Keep it up!", platform: "facebook", timestamp: "30 sec ago" },
  ])
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  // Simulate viewer count changes
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setViewers((prev) => prev + Math.floor(Math.random() * 10) - 4)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isLive])

  const handleGoLive = () => {
    setIsLive(true)
    setViewers(Math.floor(Math.random() * 50) + 10)
    console.log("[v0] Stream started successfully")
  }

  const handleStopStream = () => {
    setIsLive(false)
    setViewers(0)
    console.log("[v0] Stream stopped")
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
    console.log(`[v0] Microphone ${!isMuted ? "muted" : "unmuted"}`)
  }

  const handleToggleVideo = () => {
    setIsVideoOff(!isVideoOff)
    console.log(`[v0] Video ${!isVideoOff ? "turned off" : "turned on"}`)
  }

  const handleStreamSettings = () => {
    console.log("[v0] Opening stream settings...")
    // In real app, this would open stream settings modal
  }

  const handleFullscreen = () => {
    console.log("[v0] Entering fullscreen mode...")
    // In real app, this would toggle fullscreen
  }

  const handleLikeStream = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1)
      setIsLiked(true)
      console.log("[v0] Stream liked")
    }
  }

  const handleShareStream = () => {
    console.log("[v0] Sharing stream...")
    // In real app, this would open share dialog
    if (navigator.share) {
      navigator.share({
        title: "Live Stream",
        text: "Check out this awesome live stream!",
        url: window.location.href,
      })
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: "You",
        message: chatMessage,
        platform: "host",
        timestamp: "now",
      }
      setChatMessages((prev) => [...prev, newMessage])
      setChatMessage("")
      console.log("[v0] Message sent:", chatMessage)
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "youtube":
        return <Youtube className="w-3 h-3 text-red-500" />
      case "twitch":
        return <Twitch className="w-3 h-3 text-purple-500" />
      case "facebook":
        return <Facebook className="w-3 h-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Main Stream View - More compact mobile layout */}
        <div className="lg:col-span-3 space-y-3 md:space-y-4">
          <Card className="gradient-card border-border/50">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {/* Mock Video Preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                  {isLive ? (
                    <div className="text-center space-y-2 md:space-y-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Video className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                      </div>
                      <p className="text-white text-sm md:text-base">Live Stream Active</p>
                      <Badge variant="destructive" className="animate-pulse text-xs">
                        LIVE
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 md:space-y-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
                        <Play className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                      </div>
                      <p className="text-white text-sm md:text-base">Stream Preview</p>
                      <p className="text-muted-foreground text-xs">Click "Go Live" to start streaming</p>
                    </div>
                  )}
                </div>

                {/* Stream Controls Overlay */}
                <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {isLive && (
                      <Badge variant="destructive" className="animate-pulse text-xs">
                        LIVE
                      </Badge>
                    )}
                    <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                      <Users className="w-3 h-3" />
                      {viewers}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="secondary" className="h-7 w-7 p-0" onClick={handleToggleMute}>
                      <Mic className={`w-3 h-3 ${isMuted ? "text-red-500" : ""}`} />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-7 w-7 p-0" onClick={handleToggleVideo}>
                      <Video className={`w-3 h-3 ${isVideoOff ? "text-red-500" : ""}`} />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-7 w-7 p-0" onClick={handleStreamSettings}>
                      <Settings className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-7 w-7 p-0 hidden md:flex"
                      onClick={handleFullscreen}
                    >
                      <Maximize className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stream Controls - More compact mobile layout */}
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-base md:text-lg">Stream Controls</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  {!isLive ? (
                    <Modal>
                      <ModalTrigger asChild>
                        <Button size="sm" className="glow-effect flex-1 md:flex-none h-10">
                          <Play className="w-4 h-4 mr-2" />
                          Go Live
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <ModalHeader>
                          <ModalTitle>Go Live</ModalTitle>
                          <ModalDescription>Start streaming to all connected platforms?</ModalDescription>
                        </ModalHeader>
                        <ModalFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button onClick={handleGoLive}>Go Live</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  ) : (
                    <Modal>
                      <ModalTrigger asChild>
                        <Button size="sm" variant="destructive" className="flex-1 md:flex-none h-10">
                          <Square className="w-4 h-4 mr-2" />
                          Stop Stream
                        </Button>
                      </ModalTrigger>
                      <ModalContent>
                        <ModalHeader>
                          <ModalTitle>Stop Stream</ModalTitle>
                          <ModalDescription>Are you sure you want to stop the live stream?</ModalDescription>
                        </ModalHeader>
                        <ModalFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button variant="destructive" onClick={handleStopStream}>
                            Stop Stream
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  )}

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 bg-transparent"
                      onClick={handleLikeStream}
                      disabled={isLiked}
                    >
                      <Heart className={`w-3 h-3 mr-1 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      <span className="hidden sm:inline text-xs">{likes || "Like"}</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 bg-transparent" onClick={handleShareStream}>
                      <Share className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline text-xs">Share</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground w-full md:ml-auto md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {viewers} viewers
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {chatMessages.length} messages
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Section - More compact mobile layout */}
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-base md:text-lg">Live Chat</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-2">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2 text-xs">
                    {getPlatformIcon(msg.platform)}
                    <div>
                      <div className="font-semibold">{msg.user}</div>
                      <div className="text-muted-foreground">{msg.message}</div>
                      <div className="text-xs text-muted-foreground">{msg.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 text-xs"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button type="submit" size="sm" className="h-8">
                  Send
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        {/* Stream Information - More compact mobile layout */}
        <div className="lg:col-span-1 space-y-3 md:space-y-4">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-base md:text-lg">Stream Information</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Details about the current live stream.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-xs">Category:</Label>
                <Badge variant="secondary" className="text-xs">
                  Gaming
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">Platform:</Label>
                <Badge variant="secondary" className="text-xs">
                  Twitch
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">Resolution:</Label>
                <span className="text-muted-foreground text-xs">1080p</span>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-xs">Frame Rate:</Label>
                <span className="text-muted-foreground text-xs">60fps</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - More compact mobile layout */}
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-base md:text-lg">Recent Activity</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Latest activities and updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">User123 followed.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">Stream started 5 mins ago.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">New chat message received.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
