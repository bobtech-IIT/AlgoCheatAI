import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Eye, EyeOff, ShieldCheck, Trash2, Settings, HelpCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function APISettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [openaiKey, setOpenaiKey] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiModel, setApiModel] = useState("");
  const [puterToken, setPuterToken] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [testing, setTesting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load stored values on mount
    const savedKey = localStorage.getItem("algocheat.openai_key") || "";
    const savedToken = localStorage.getItem("algocheat.puter_token") || "";
    const savedUrl = localStorage.getItem("algocheat.api_url") || "";
    const savedModel = localStorage.getItem("algocheat.api_model") || "";

    if (savedKey) {
      setOpenaiKey(savedKey);
      setApiUrl(savedUrl);
      setApiModel(savedModel);
    }
    setPuterToken(savedToken);

    // Listen for custom event to open settings
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-api-settings", handleOpen);
    return () => {
      window.removeEventListener("open-api-settings", handleOpen);
    };
  }, []);

  const saveSettings = () => {
    try {
      if (openaiKey.trim()) {
        localStorage.setItem("algocheat.openai_key", openaiKey.trim());
      } else {
        localStorage.removeItem("algocheat.openai_key");
      }

      if (apiUrl.trim()) {
        localStorage.setItem("algocheat.api_url", apiUrl.trim());
      } else {
        localStorage.removeItem("algocheat.api_url");
      }

      if (apiModel.trim()) {
        localStorage.setItem("algocheat.api_model", apiModel.trim());
      } else {
        localStorage.removeItem("algocheat.api_model");
      }

      if (puterToken.trim()) {
        localStorage.setItem("algocheat.puter_token", puterToken.trim());
      } else {
        localStorage.removeItem("algocheat.puter_token");
      }

      toast({
        description: "API configuration saved successfully!",
      });
      setIsOpen(false);
      
      // Reload page to apply new active tokens across the app context
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to access local storage.",
      });
    }
  };

  const clearSettings = () => {
    localStorage.removeItem("algocheat.openai_key");
    localStorage.removeItem("algocheat.api_url");
    localStorage.removeItem("algocheat.api_model");
    localStorage.removeItem("algocheat.puter_token");
    setOpenaiKey("");
    setApiUrl("");
    setApiModel("");
    setPuterToken("");
    toast({
      description: "Custom credentials cleared. Reverted to default keyless engine.",
    });
    setIsOpen(false);
    
    // Reload page to apply changes
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const testConnection = async () => {
    if (!openaiKey.trim() && !puterToken.trim()) {
      toast({
        variant: "destructive",
        description: "Please enter a key or token to test first.",
      });
      return;
    }

    setTesting(true);
    try {
      if (openaiKey.trim()) {
        // Test via the backend /api/scan proxy to bypass client-side CORS issues
        const response = await fetch("/api/scan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer test-token",
            "x-custom-api-key": openaiKey.trim(),
            "x-custom-api-url": apiUrl.trim() || "https://api.openai.com/v1/chat/completions",
            "x-custom-api-model": apiModel.trim() || "gpt-4o-mini",
          },
          body: JSON.stringify({ topic: "ping" }),
        });
        
        if (response.ok) {
          toast({
            description: "Connection test successful! The API configuration is valid.",
          });
        } else {
          const errText = await response.text();
          throw new Error(`API error ${response.status}: ${errText}`);
        }
      } else if (puterToken.trim()) {
        const response = await fetch("https://api.puter.com/puterai/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${puterToken.trim()}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "ping" }],
            max_tokens: 5,
          }),
        });

        if (response.ok) {
          toast({
            description: "Puter token connection test successful! Token is valid.",
          });
        } else {
          throw new Error(`Puter returned status ${response.status}`);
        }
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: `Connection test failed: ${err.message || "Invalid credentials"}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md border border-primary/20 bg-card/95 backdrop-blur-md shadow-2xl p-6 rounded-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary animate-spin-slow" />
            Engine API Settings
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Configure Cerebras Inference API or custom OpenAI-compatible credentials below to bypass mobile popup restrictions and browser third-party storage blocks.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Custom API Key Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="settings-openai-key" className="text-xs font-semibold flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-primary" />
                API Key (OpenAI / Cerebras / Custom)
              </Label>
              <a 
                href="https://inference-docs.cerebras.ai/introduction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-primary hover:underline flex items-center gap-0.5"
              >
                <HelpCircle className="w-3 h-3" /> Inference Docs
              </a>
            </div>
            <div className="relative">
              <Input
                id="settings-openai-key"
                type={showKey ? "text" : "password"}
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="csk-... or sk-..."
                className="pr-10 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Custom API URL Input */}
          <div className="space-y-1.5">
            <Label htmlFor="settings-api-url" className="text-xs font-semibold flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-primary" />
              API Endpoint URL (OpenAI-compatible)
            </Label>
            <Input
              id="settings-api-url"
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.cerebras.ai/v1/chat/completions"
              className="text-xs font-mono"
            />
          </div>

          {/* Custom API Model Input */}
          <div className="space-y-1.5">
            <Label htmlFor="settings-api-model" className="text-xs font-semibold flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-primary" />
              Model Name
            </Label>
            <Input
              id="settings-api-model"
              type="text"
              value={apiModel}
              onChange={(e) => setApiModel(e.target.value)}
              placeholder="gpt-oss-120b"
              className="text-xs font-mono"
            />
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border/60"></div>
            <span className="flex-shrink mx-3 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">OR</span>
            <div className="flex-grow border-t border-border/60"></div>
          </div>

          {/* Puter Auth Token Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="settings-puter-token" className="text-xs font-semibold flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-primary" />
                Puter Auth Token
              </Label>
              <a 
                href="https://puter.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-primary hover:underline flex items-center gap-0.5"
              >
                <HelpCircle className="w-3 h-3" /> Get Puter Token
              </a>
            </div>
            <div className="relative">
              <Input
                id="settings-puter-token"
                type={showToken ? "text" : "password"}
                value={puterToken}
                onChange={(e) => setPuterToken(e.target.value)}
                placeholder="Puter auth token..."
                className="pr-10 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/80 leading-normal">
              Obtained from your Puter Dashboard console account settings.
            </p>
          </div>

          {/* Security Banner */}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-[10px] text-muted-foreground flex items-start gap-2 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5 animate-pulse" />
            <span>
              <strong>Privacy Guarantee:</strong> Stored strictly in your browser local storage. Non-Puter credentials are securely proxied via HTTPS through our backend serverless functions to bypass browser CORS policies and never stored.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={testConnection}
              disabled={testing || (!openaiKey.trim() && !puterToken.trim())}
              variant="secondary"
              className="text-xs min-h-[44px]"
            >
              {testing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Testing...
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
            <Button
              onClick={saveSettings}
              className="text-xs min-h-[44px] bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:opacity-95 shadow-md shadow-primary/10"
            >
              Save Configuration
            </Button>
          </div>
          
          {(localStorage.getItem("algocheat.openai_key") || localStorage.getItem("algocheat.api_url") || localStorage.getItem("algocheat.puter_token")) && (
            <Button
              onClick={clearSettings}
              variant="ghost"
              className="text-xs min-h-[44px] text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear & Use Free Keyless Engine
            </Button>
          )}
          
          <Button
            variant="outline"
            className="w-full text-xs min-h-[44px]"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
