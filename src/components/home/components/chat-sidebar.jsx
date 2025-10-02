"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PenSquare, Search, TrendingUp, BarChart3, Clock } from "lucide-react"

const chatHistory = [
  { id: "1", title: "AAPL Stock Analysis", time: "2h ago" },
  { id: "2", title: "Portfolio Diversification Strategy", time: "5h ago" },
  { id: "3", title: "Tech Sector Trends Q1 2025", time: "1d ago" },
  { id: "4", title: "Risk Assessment: Growth Stocks", time: "2d ago" },
  { id: "5", title: "Dividend Yield Comparison", time: "3d ago" },
  { id: "6", title: "Market Volatility Indicators", time: "4d ago" },
  { id: "7", title: "S&P 500 Performance Review", time: "5d ago" },
]

export function ChatSidebar({ selectedChat, onSelectChat }) {
  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
      {/* Logo & Brand */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-sidebar-foreground">Stocky AI</span>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm h-10 rounded-lg"
          size="sm"
        >
          <PenSquare className="w-4 h-4" />
          New Analysis
        </Button>
      </div>

      {/* Navigation */}
      <div className="px-3 space-y-1 mb-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent h-9 rounded-lg"
        >
          <Search className="w-4 h-4" />
          Search Chats
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-hidden flex flex-col mt-2">
        <div className="px-4 pb-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Analyses
          </h3>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1 pb-4">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg hover:bg-sidebar-accent transition-colors flex items-start gap-2 ${
                  selectedChat === chat.id ? "bg-sidebar-accent" : ""
                }`}
              >
                <BarChart3 className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-sidebar-foreground font-medium truncate">{chat.title}</p>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    {chat.time}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Profile Section */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
