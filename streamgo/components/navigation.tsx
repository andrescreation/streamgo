"use client"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"
import { Play, BarChart3, Settings, Home, Zap } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navigationItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "stream-setup", label: "Setup", icon: Play },
    { id: "live-stream", label: "Live", icon: Zap },
    { id: "analytics", label: "Stats", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      <nav className="mobile-bottom-nav md:hidden">
        <div className="flex items-center justify-around px-2 py-2 max-w-full gap-2 md:gap-4">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 flex flex-col items-center gap-1 h-12 max-w-[75px] px-1",
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </nav>

      <aside className="hidden md:flex fixed left-0 top-0 z-40 h-full bg-sidebar border-r border-sidebar-border w-64 flex-col">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-sidebar-foreground">StreamGo</h1>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11 text-sm",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => onPageChange(item.id)}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="text-xs text-sidebar-foreground/60">StreamGo v1.0</div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
