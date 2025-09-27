"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
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
import { useToast } from "@/hooks/use-toast"
import { Youtube, Facebook, Twitch, Instagram, Calendar, Play, Settings, Zap } from "lucide-react"

export function StreamSetup() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["youtube", "twitch"])
  const [streamTitle, setStreamTitle] = useState("")
  const [streamDescription, setStreamDescription] = useState("")
  const [quality, setQuality] = useState([720])
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const { toast } = useToast()

  const platforms = [
    { id: "youtube", name: "YouTube", icon: Youtube, color: "text-red-500", connected: true },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-500", connected: true },
    { id: "twitch", name: "Twitch", icon: Twitch, color: "text-purple-500", connected: true },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-500", connected: false },
  ]

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const handleStartStream = () => {
    if (!streamTitle.trim()) {
      toast({
        title: "Stream title required",
        description: "Please enter a title for your stream",
        variant: "destructive",
      })
      return
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Select platforms",
        description: "Please select at least one platform to stream to",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Stream starting!",
      description: `Starting stream to ${selectedPlatforms.length} platform(s)`,
    })
  }

  const qualityLabels = {
    480: "480p",
    720: "720p HD",
    1080: "1080p Full HD",
    1440: "1440p 2K",
  }

  return (
    <div className="space-y-3 md:space-y-8 max-w-full overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-8">
        <div className="lg:col-span-2 space-y-3 md:space-y-6">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-base md:text-xl">
                <Settings className="w-4 h-4 md:w-5 md:h-5" />
                Stream Configuration
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Configure your stream settings and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-6">
              <div className="space-y-1 md:space-y-2">
                <Label htmlFor="title" className="text-xs md:text-sm">
                  Stream Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your stream title..."
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  className="h-9 md:h-11 text-sm"
                />
              </div>

              <div className="space-y-1 md:space-y-2">
                <Label htmlFor="description" className="text-xs md:text-sm">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you'll be streaming..."
                  value={streamDescription}
                  onChange={(e) => setStreamDescription(e.target.value)}
                  rows={2}
                  className="resize-none text-sm"
                />
              </div>

              <div className="space-y-2 md:space-y-4">
                <Label className="text-xs md:text-sm">Stream Quality</Label>
                <div className="px-2 md:px-3">
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    max={1440}
                    min={480}
                    step={240}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1 md:mt-2">
                    <span>480p</span>
                    <span>720p</span>
                    <span>1080p</span>
                    <span>1440p</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Current: {qualityLabels[quality[0] as keyof typeof qualityLabels]}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-6">
              <CardTitle className="text-base md:text-xl">Platform Selection</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Choose which platforms to stream to simultaneously
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 md:gap-4">
                {platforms.map((platform) => {
                  const Icon = platform.icon
                  const isSelected = selectedPlatforms.includes(platform.id)
                  const isConnected = platform.connected

                  return (
                    <div
                      key={platform.id}
                      className={`relative p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        isSelected ? "border-primary bg-primary/10" : "border-border bg-muted/50 hover:border-border/80"
                      } ${!isConnected ? "opacity-50" : ""}`}
                      onClick={() => isConnected && handlePlatformToggle(platform.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 md:w-6 md:h-6 ${platform.color} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm md:text-base truncate">{platform.name}</p>
                          <p className="text-xs text-muted-foreground">{isConnected ? "Connected" : "Not connected"}</p>
                        </div>
                        {isSelected && (
                          <Badge variant="default" className="text-xs flex-shrink-0">
                            Selected
                          </Badge>
                        )}
                        {!isConnected && (
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            Setup Required
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3 md:space-y-6">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-6">
              <CardTitle className="text-base md:text-lg">Quick Start</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-4">
              <Modal>
                <ModalTrigger asChild>
                  <Button size="lg" className="w-full glow-effect h-10 md:h-14 text-sm">
                    <Play className="w-4 h-4 mr-2" />
                    Start Streaming
                  </Button>
                </ModalTrigger>
                <ModalContent className="mx-2 max-w-sm md:max-w-lg">
                  <ModalHeader>
                    <ModalTitle>Start Stream</ModalTitle>
                    <ModalDescription>
                      Ready to start streaming to {selectedPlatforms.length} platform(s)?
                    </ModalDescription>
                  </ModalHeader>
                  <ModalFooter>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                    <Button onClick={handleStartStream} size="sm">
                      Start Stream
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <p className="text-xs text-muted-foreground text-center">
                Stream will start to {selectedPlatforms.length} selected platform(s)
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg">Schedule Stream</CardTitle>
              <CardDescription className="text-sm">Plan your stream for later</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="h-10"
                />
              </div>
              <Modal>
                <ModalTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent h-10 md:h-11">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </ModalTrigger>
                <ModalContent>
                  <ModalHeader>
                    <ModalTitle>Schedule Stream</ModalTitle>
                    <ModalDescription>
                      Schedule your stream for {scheduledDate} at {scheduledTime}?
                    </ModalDescription>
                  </ModalHeader>
                  <ModalFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Schedule Stream</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-4 h-4" />
                AI Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm font-medium">Optimal Quality</p>
                <p className="text-xs text-muted-foreground">720p recommended for your connection</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm font-medium">Best Time</p>
                <p className="text-xs text-muted-foreground">8 PM - 10 PM for maximum reach</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
