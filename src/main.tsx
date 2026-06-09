import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// ─── Global API Auth Dialog Handler ──────────────────────────────────────────
// Called when Puter/API credits are exhausted — opens API settings modal
(window as any).showPuterAuthDialog = (type: string, retryFn?: () => void) => {
  window.dispatchEvent(new CustomEvent("open-api-settings"));
  if (type === "exhausted") {
    const msg = document.createElement("div");
    msg.id = "api-exhausted-toast";
    msg.style.cssText = "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#1e0a3c,#2d1b69);border:1px solid rgba(109,40,217,0.5);border-radius:16px;padding:14px 20px;z-index:9999;max-width:380px;width:calc(100vw-40px);animation:slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1);font-family:Inter,sans-serif";
    msg.innerHTML = `
      <div style="font-size:13px;font-weight:700;color:#e9d5ff">Free API Credits Exhausted</div>
      <div style="font-size:11px;color:#9ca3af;margin-top:4px">Configure your own API key in settings to continue auditing.</div>
      <button onclick="this.parentElement.remove();window.dispatchEvent(new Event('open-api-settings'))" style="margin-top:10px;background:linear-gradient(135deg,#6d28d9,#4f46e5);color:white;border:none;border-radius:10px;padding:8px 14px;font-size:12px;font-weight:600;cursor:pointer">Open Settings</button>
      <button onclick="this.parentElement.remove()" style="margin-left:8px;background:none;border:1px solid rgba(255,255,255,0.2);color:#9ca3af;border-radius:10px;padding:8px 14px;font-size:12px;cursor:pointer">Dismiss</button>
    `;
    document.body.appendChild(msg);
    setTimeout(() => { const el = document.getElementById("api-exhausted-toast"); if (el) el.remove(); }, 10000);
  }
};

// ─── PWA Install Prompt ───────────────────────────────────────────────────────
// Capture the browser's beforeinstallprompt event for custom install UX
let deferredInstallPrompt: any = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;

  // Show a subtle install banner after 8 seconds (non-intrusive)
  setTimeout(() => {
    if (!deferredInstallPrompt) return;
    showInstallBanner();
  }, 8000);
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  const banner = document.getElementById('pwa-install-banner');
  if (banner) banner.remove();
  console.log('[AlgoCheat] PWA installed successfully');
});

function showInstallBanner() {
  if (document.getElementById('pwa-install-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #1e0a3c, #2d1b69);
      border: 1px solid rgba(109,40,217,0.5);
      border-radius: 16px;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 8px 32px rgba(109,40,217,0.3);
      z-index: 9999;
      max-width: 340px;
      width: calc(100vw - 40px);
      animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    ">
      <img src="/favicon.png" width="36" height="36" style="border-radius:8px;flex-shrink:0" alt="AlgoCheat" />
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:#e9d5ff;font-family:Inter,sans-serif">Install AlgoCheat AI</div>
        <div style="font-size:11px;color:#9ca3af;font-family:Inter,sans-serif;margin-top:2px">Add to home screen for instant access</div>
      </div>
      <button id="pwa-install-btn" style="
        background: linear-gradient(135deg, #6d28d9, #4f46e5);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 8px 14px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        font-family: Inter, sans-serif;
      ">Install</button>
      <button id="pwa-dismiss-btn" style="
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        font-size: 18px;
        padding: 4px;
        line-height:1;
      ">×</button>
    </div>
    <style>
      @keyframes slideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    </style>
  `;

  document.body.appendChild(banner);

  document.getElementById('pwa-install-btn')?.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    console.log('[AlgoCheat] Install outcome:', outcome);
    deferredInstallPrompt = null;
    banner.remove();
  });

  document.getElementById('pwa-dismiss-btn')?.addEventListener('click', () => {
    banner.remove();
  });
}
