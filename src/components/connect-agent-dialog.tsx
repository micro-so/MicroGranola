"use client";

import { Check, Copy, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

const setupPrompt = `Help me connect my agent to my Micro workspace using the official TypeScript SDK, @micro-so/sdk.

1. Inspect my project and reuse its package manager and existing Micro setup. Install @micro-so/sdk if needed. Read the installed package's README.md and api.md for the current API.
2. Use MICRO_API_KEY and MICRO_TEAM_ID from my local environment or secret store. If they are missing, guide me to https://app.micro.so/console to create an API key and get the matching workspace team ID. Have me enter credentials locally; do not ask me to paste secrets into chat, print them, or commit them.
3. Set up a server-side client:

import Micro from '@micro-so/sdk';

const client = new Micro({
  apiKey: process.env.MICRO_API_KEY,
  teamID: process.env.MICRO_TEAM_ID,
  baseURL: process.env.MICRO_BASE_URL || undefined,
});

Validate that the required environment variables are present before creating the client, and load the local environment file if the runtime does not do so automatically. Keep credentials out of browser code.
4. Verify the connection with a small read-only query supported by the installed SDK, then report success without dumping private records or credentials. Do not create, edit, delete, or send anything as part of setup.
5. Explain how I can use the connection to work with my people, companies, notes, and meetings. If you cannot run code in this environment, give me the exact local steps instead of claiming the connection is complete.`;

export function ConnectAgentDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(setupPrompt);
      setCopyState("copied");
    } catch {
      promptRef.current?.focus();
      promptRef.current?.select();
      setCopyState("failed");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="connect-agent-title"
      aria-describedby="connect-agent-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto overscroll-contain rounded-2xl border border-border bg-surface p-0 text-foreground shadow-xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <h2 id="connect-agent-title" className="pt-1 text-[20px] font-medium tracking-tight">
            Connect your agent
          </h2>
          <button type="button" onClick={onClose} aria-label="Close connect your agent" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-hover hover:text-foreground">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p id="connect-agent-description" className="mt-2 text-[14px] leading-6 text-muted-foreground">
          Copy this prompt into your agent. It will help you set up the Micro SDK and connect your workspace.
        </p>
        <label htmlFor="agent-setup-prompt" className="mt-5 block text-[13px] font-medium">Setup prompt</label>
        <textarea
          ref={promptRef}
          id="agent-setup-prompt"
          readOnly
          value={setupPrompt}
          spellCheck={false}
          className="mt-2 h-56 w-full resize-none rounded-xl border border-border bg-background p-4 font-mono text-[12px] leading-5 text-foreground"
        />
        <p className="mt-3 text-[12px] leading-5 text-muted-foreground">
          You’ll need a Micro API key and workspace team ID. Your agent will walk you through adding them locally.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <a href="https://app.micro.so/console" target="_blank" rel="noreferrer" className="text-[13px] text-muted-foreground underline underline-offset-4 hover:text-foreground">Get an API key</a>
          <button autoFocus type="button" onClick={copyPrompt} className="flex h-10 items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.08] px-5 text-[13px] font-medium hover:bg-foreground/[0.12]">
            {copyState === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copyState === "copied" ? "Copied" : "Copy prompt"}
          </button>
        </div>
        <p role="status" className="mt-2 text-[12px] text-muted-foreground">
          {copyState === "copied" ? "Prompt copied. Paste it into your agent to get started." : copyState === "failed" ? "Couldn’t copy automatically. The prompt is selected; use your keyboard to copy it." : ""}
        </p>
      </div>
    </dialog>
  );
}
