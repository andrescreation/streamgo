"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  ModalClose,
} from "@/components/ui/modal"
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
} from "recharts"
import {
  TrendingUp,
  Users,
  Clock,
  Heart,
  Download,
  Zap,
  Play,
  DollarSign,
  Eye,
  Share2,
  MessageCircle,
  ThumbsUp,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const viewerData = [
  { time: "00:00", viewers: 45, engagement: 12, newFollowers: 2 },
  { time: "02:00", viewers: 52, engagement: 15, newFollowers: 3 },
  { time: "04:00", viewers: 38, engagement: 8, newFollowers: 1 },
  { time: "06:00", viewers: 73, engagement: 22, newFollowers: 5 },
  { time: "08:00", viewers: 125, engagement: 45, newFollowers: 12 },
  { time: "10:00", viewers: 98, engagement: 35, newFollowers: 8 },
  { time: "12:00", viewers: 156, engagement: 67, newFollowers: 18 },
  { time: "14:00", viewers: 189, engagement: 89, newFollowers: 23 },
  { time: "16:00", viewers: 234, engagement: 112, newFollowers: 31 },
  { time: "18:00", viewers: 298, engagement: 145, newFollowers: 42 },
  { time: "20:00", viewers: 445, engagement: 234, newFollowers: 67 },
  { time: "22:00", viewers: 367, engagement: 189, newFollowers: 45 },
]

const platformData = [
  { name: "YouTube", value: 45, color: "#FF0000", viewers: 11025, revenue: 450, growth: "+12%" },
  { name: "Twitch", value: 35, color: "#9146FF", viewers: 8575, revenue: 320, growth: "+8%" },
  { name: "Facebook", value: 20, color: "#1877F2", viewers: 4900, revenue: 180, growth: "+15%" },
]

const engagementData = [
  { day: "Mon", likes: 234, comments: 45, shares: 12, followers: 23, watchTime: 1200 },
  { day: "Tue", likes: 345, comments: 67, shares: 23, followers: 34, watchTime: 1450 },
  { day: "Wed", likes: 456, comments: 89, shares: 34, followers: 45, watchTime: 1680 },
  { day: "Thu", likes: 567, comments: 123, shares: 45, followers: 56, watchTime: 1890 },
  { day: "Fri", likes: 678, comments: 156, shares: 56, followers: 67, watchTime: 2100 },
  { day: "Sat", likes: 789, comments: 189, shares: 67, followers: 78, watchTime: 2350 },
  { day: "Sun", likes: 890, comments: 234, shares: 78, followers: 89, watchTime: 2600 },
]

const revenueData = [
  { month: "Jan", revenue: 1200, subs: 45, donations: 300, ads: 150, merchandise: 100 },
  { month: "Feb", revenue: 1450, subs: 52, donations: 420, ads: 180, merchandise: 120 },
  { month: "Mar", revenue: 1680, subs: 61, donations: 380, ads: 220, merchandise: 140 },
  { month: "Apr", revenue: 1890, subs: 68, donations: 510, ads: 250, merchandise: 160 },
  { month: "May", revenue: 2100, subs: 75, donations: 650, ads: 280, merchandise: 180 },
  { month: "Jun", revenue: 2350, subs: 82, donations: 720, ads: 320, merchandise: 200 },
]

const topHighlights = [
  { title: "Epic Gaming Moment", views: 2300, date: "3 days ago", duration: "0:45", engagement: 89 },
  { title: "Funny Reaction", views: 1800, date: "5 days ago", duration: "0:32", engagement: 76 },
  { title: "Tutorial Highlight", views: 3200, date: "1 week ago", duration: "1:12", engagement: 94 },
  { title: "Community Interaction", views: 1500, date: "1 week ago", duration: "0:28", engagement: 82 },
]

export function Analytics() {
  const [downloadingHighlight, setDownloadingHighlight] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDownloadHighlight = async (title: string) => {
    setDownloadingHighlight(title)
    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setDownloadingHighlight(null)
    toast({
      title: "Download Complete",
      description: `"${title}" has been downloaded successfully.`,
    })
  }

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being exported as CSV.",
    })
  }

  const handleShareInsight = (insight: string) => {
    toast({
      title: "Insight Shared",
      description: `${insight} insights have been shared to your social media.`,
    })
  }

  return (
    <div className="space-y-3 md:space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <Card className="gradient-card border-border/50">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Views</p>
                <p className="text-base md:text-xl font-bold text-foreground">24.5K</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5%
                </p>
              </div>
              <div className="w-6 h-6 md:w-10 md:h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Play className="w-3 h-3 md:w-5 md:h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg. Viewers</p>
                <p className="text-base md:text-xl font-bold text-foreground">187</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +8.2%
                </p>
              </div>
              <div className="w-6 h-6 md:w-10 md:h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <Users className="w-3 h-3 md:w-5 md:h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-base md:text-xl font-bold text-foreground">$2.3K</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18.7%
                </p>
              </div>
              <div className="w-6 h-6 md:w-10 md:h-10 bg-chart-2/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-3 h-3 md:w-5 md:h-5 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Engagement</p>
                <p className="text-base md:text-xl font-bold text-foreground">4.2K</p>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +22.1%
                </p>
              </div>
              <div className="w-6 h-6 md:w-10 md:h-10 bg-chart-3/20 rounded-lg flex items-center justify-center">
                <Heart className="w-3 h-3 md:w-5 md:h-5 text-chart-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        <div className="lg:col-span-2 space-y-3 md:space-y-4">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base md:text-lg text-foreground">Viewer Trends</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Hourly viewer count and new followers over 24 hours
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData} className="h-8 text-xs bg-transparent">
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="w-full h-[180px] md:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewerData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis
                      dataKey="time"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--card-foreground))",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="viewers"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="newFollowers"
                      stroke="hsl(var(--accent))"
                      fill="hsl(var(--accent))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-xs text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Viewers</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-foreground">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span>New Followers</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base md:text-lg text-foreground">Weekly Engagement</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Likes, comments, shares, and watch time over the past week
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShareInsight("engagement")}
                    className="h-8 w-8 p-0"
                  >
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="w-full h-[180px] md:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis
                      dataKey="day"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--card-foreground))",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="likes"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 3 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="comments"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--accent))", strokeWidth: 0, r: 3 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="shares"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 0, r: 3 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="watchTime"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 0, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="flex items-center gap-1 text-foreground">
                  <ThumbsUp className="w-3 h-3 text-primary" />
                  <span>Likes</span>
                </div>
                <div className="flex items-center gap-1 text-foreground">
                  <MessageCircle className="w-3 h-3 text-accent" />
                  <span>Comments</span>
                </div>
                <div className="flex items-center gap-1 text-foreground">
                  <Share2 className="w-3 h-3 text-chart-2" />
                  <span>Shares</span>
                </div>
                <div className="flex items-center gap-1 text-foreground">
                  <Clock className="w-3 h-3 text-chart-3" />
                  <span>Watch Time (min)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base md:text-lg text-foreground">Revenue Growth</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Monthly revenue breakdown from all sources
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleShareInsight("revenue")} className="h-8 w-8 p-0">
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="w-full h-[180px] md:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--card-foreground))",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="subs" stackId="a" fill="hsl(var(--chart-2))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="donations" stackId="a" fill="hsl(var(--chart-3))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="ads" stackId="a" fill="hsl(var(--chart-4))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="merchandise" stackId="a" fill="hsl(var(--chart-5))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="flex items-center gap-1 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  <span>Subscriptions</span>
                </div>
                <div className="flex items-center gap-1 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-chart-3" />
                  <span>Donations</span>
                </div>
                <div className="flex items-center gap-1 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-chart-4" />
                  <span>Ad Revenue</span>
                </div>
                <div className="flex items-center gap-1 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-chart-5" />
                  <span>Merchandise</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3 md:space-y-4">
          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-foreground">Platform Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="w-full h-[100px] md:h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={40}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--card-foreground))",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 mt-2">
                {platformData.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }} />
                      <span className="font-medium text-foreground">{platform.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-foreground">{platform.value}%</span>
                      <p className="text-muted-foreground text-xs">{platform.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-border/50">
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="text-center">
                    <p className="font-medium text-foreground">24.5K</p>
                    <p className="text-muted-foreground">Total Views</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">$950</p>
                    <p className="text-muted-foreground">Revenue</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-foreground">+12%</p>
                    <p className="text-muted-foreground">Growth</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="w-4 h-4" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs font-medium">Peak Time</p>
                <p className="text-xs text-muted-foreground">8 PM - 10 PM weekdays</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  +40% engagement
                </Badge>
              </div>
              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-xs font-medium">Content Tip</p>
                <p className="text-xs text-muted-foreground">Gaming streams get 2x more viewers</p>
              </div>
              <div className="p-2 rounded-lg bg-chart-2/10 border border-chart-2/20">
                <p className="text-xs font-medium">Growth Opportunity</p>
                <p className="text-xs text-muted-foreground">Instagram Live untapped potential</p>
              </div>
              <div className="p-2 rounded-lg bg-chart-3/10 border border-chart-3/20">
                <p className="text-xs font-medium">Revenue Boost</p>
                <p className="text-xs text-muted-foreground">Add subscriber perks for +25% income</p>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardHeader className="pb-2 md:pb-3">
              <CardTitle className="text-base">Top Highlights</CardTitle>
              <CardDescription className="text-xs">AI-generated clips from your streams</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {topHighlights.map((highlight, index) => (
                <div key={index} className="p-2 rounded-lg bg-muted/50 border">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-xs font-medium flex-1">{highlight.title}</p>
                    <Badge variant="outline" className="text-xs ml-2">
                      {highlight.engagement}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Eye className="w-3 h-3" />
                    <span>{highlight.views.toLocaleString()}</span>
                    <Clock className="w-3 h-3 ml-1" />
                    <span>{highlight.duration}</span>
                    <span className="ml-auto">{highlight.date}</span>
                  </div>
                  <Modal>
                    <ModalTrigger asChild>
                      <Button size="sm" variant="ghost" className="w-full h-7 text-xs">
                        <Download className="w-3 h-3 mr-1" />
                        {downloadingHighlight === highlight.title ? "Downloading..." : "Download"}
                      </Button>
                    </ModalTrigger>
                    <ModalContent>
                      <ModalHeader>
                        <ModalTitle>Download Highlight</ModalTitle>
                        <ModalDescription>Download "{highlight.title}" in high quality?</ModalDescription>
                      </ModalHeader>
                      <ModalFooter>
                        <ModalClose asChild>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </ModalClose>
                        <ModalClose asChild>
                          <Button
                            size="sm"
                            onClick={() => handleDownloadHighlight(highlight.title)}
                            disabled={downloadingHighlight === highlight.title}
                          >
                            {downloadingHighlight === highlight.title ? "Downloading..." : "Download"}
                          </Button>
                        </ModalClose>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
