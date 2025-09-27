"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Play, Zap, Users, BarChart3 } from "lucide-react"

export function OnboardingFlow() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const { login, signup, loading } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await signup(email, password, name)
      }
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "Successfully signed in to StreamGo" : "Welcome to StreamGo! Let's get you streaming.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center glow-effect">
                <Play className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-balance">StreamGo</h1>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">AI-Powered Multi-Streaming Platform</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-lg">
              Stream live to YouTube, Facebook, Twitch, and Instagram simultaneously. Maximize your reach with
              AI-enhanced features.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">AI-Enhanced</h3>
              <p className="text-sm text-muted-foreground">Smart moderation and optimization</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">Multi-Platform</h3>
              <p className="text-sm text-muted-foreground">Stream to all platforms at once</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-muted-foreground">Real-time insights and growth</p>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md gradient-card border-border/50">
            <CardHeader className="text-center">
              <CardTitle>{isLogin ? "Welcome Back" : "Get Started"}</CardTitle>
              <CardDescription>
                {isLogin ? "Sign in to your StreamGo account" : "Create your StreamGo account and start streaming"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button variant="ghost" onClick={() => setIsLogin(!isLogin)} className="text-sm">
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
