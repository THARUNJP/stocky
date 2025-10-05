import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Send,
  Paperclip,
  Mic,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCw,
  Sparkles,
  TrendingUp,
  MoreVertical,
  LogOut,
} from "lucide-react";
import { getSessionData, sendUserQuery } from "@/service/chat.service";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';



export function ChatMain({ user }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
const { sessionId } = useParams();
  const [messageObj,setMessageObj] = useState([{}])
  console.log(message,"?");


   useEffect(() => {
  getSessionMessage()
  }, [sessionId]);


  async function getSessionMessage() {
      if(!sessionId){
setMessage("")
setMessageObj([])

      return;
    } 
    const response = await getSessionData(sessionId);

    if(response && response.length > 0 ){
      setMessageObj(response)
    }

    
  }
  
async function handleSend() {
  if (!message.trim()) return;

  // 1. Optimistically add the user message
  const latestMessage = { user_message: message, ai_reply: null, state: "pending" };
  setMessageObj([...messageObj, latestMessage]);

  try {
    const response = await sendUserQuery(message, sessionId); // sessionId may be undefined
setMessage("")
    if (response) {
      const { session_id, action_result } = response; // no need for response.data

      // 3. Update message with AI reply
      setMessageObj((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, ai_reply: action_result, state: "fulfilled" }
            : msg
        )
      );

      // 4. Update URL with session_id
      if(!sessionId){
 navigate(`/${session_id}`);
      }
     
    } else {
      // handle failure
      setMessageObj((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, state: "failed" } : msg
        )
      );
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong, try again later");
    setMessageObj((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, state: "failed" } : msg
      )
    );
  }

 // clear input
}

  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Stocky AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Your AI-powered market analyst
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </div>
            )}

           {user && <TooltipProvider>
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Menu</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" className="w-48">
                  {user && (
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <LogOut className="w-4 h-4" onClick={()=>navigate("/login")} />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>}
          </div>
        </div>
      </header>

    {/* Chat Messages */}
<div className="flex-1 overflow-y-auto">
  <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
    {messageObj.length === 0 && (
      <div className="text-center space-y-4 py-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground text-balance">
          Welcome to Stocky AI
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
          Your premium AI assistant for stock market analysis, portfolio
          insights, and investment strategies.
        </p>
      </div>
    )}

    {messageObj.map((msg, idx) => (
      <div key={idx} className="space-y-2">
        {/* User Message */}
        {msg.user_message && (
          <div className="flex justify-end">
            <div className="max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-5 py-3 shadow-sm">
              <p className="text-sm leading-relaxed">{msg.user_message}</p>
            </div>
          </div>
        )}

        {/* AI Reply */}
        {msg.ai_reply && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="prose prose-sm text-sm text-foreground">
  <ReactMarkdown>{msg.ai_reply}</ReactMarkdown>
</div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-1">
                {[ThumbsUp, ThumbsDown, Copy, RotateCw].map((Icon, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground flex items-center justify-center"
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pending / Failed State */}
        {!msg.ai_reply && msg.state === "pending" && (
          <div className="text-xs text-muted-foreground text-right pr-4">
            Typing...
          </div>
        )}
        {!msg.ai_reply && msg.state === "failed" && (
          <div className="text-xs text-red-500 text-right pr-4">
            Failed to send. Try again.
          </div>
        )}
      </div>
    ))}
  </div>
</div>

   {/* Input Area */}
<div className="border-t border-border bg-card">
  <div className="max-w-3xl mx-auto px-6 py-4">
    <div className="relative flex flex-col">
      <div className="relative flex items-end max-h-60 overflow-y-auto">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about stocks, market trends, portfolio strategies..."
          className="w-full min-h-[60px] max-h-[240px] pr-10 resize-none bg-background border-input focus:border-primary transition-colors text-sm leading-relaxed rounded-xl overflow-y-auto"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (user && message.trim()) {
                // Handle send
              }
            }
          }}
        />

        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  disabled={!user || !message.trim()}
                  onClick={()=>handleSend()}
                  className="h-8 w-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm cursor-pointer
                   flex items-center justify-center rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {!user
                    ? "Login first to use Stocky AI"
                    : !message.trim()
                    ? "Please type a message first"
                    : ""}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-3">
        Stocky AI provides market insights for informational purposes.
        Always consult a financial advisor for investment decisions.
      </p>
    </div>
  </div>
</div>

    </main>
  );
}
 {/* <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Mic className="w-4 h-4" />
              </Button> */}