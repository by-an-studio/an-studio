"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile } from "./Turnstile";

function SendArrow() {
  return (
    <svg width="25" height="7" viewBox="0 0 25 7" fill="none">
      <path d="M1 3.5H24M24 3.5L20 0.7M24 3.5L20 6.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeNewsletterFormMobile({
  buttonLabel,
  emailPlaceholder,
}: {
  buttonLabel: string;
  emailPlaceholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setShowEmptyWarning(true);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, turnstileToken }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-[1200px]:hidden">
      {!open && (
        <div className="absolute inset-y-0 right-0 z-20 w-9 flex items-center justify-center translate-y-16 pointer-events-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="pointer-events-auto -rotate-90 text-[12px] leading-none cursor-pointer whitespace-nowrap bg-[#EFECE6] px-6 pt-2 pb-2 flex items-center justify-center"
          >
            {buttonLabel}
          </button>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-8"
          style={{ backgroundColor: "rgba(255,253,247,0.95)" }}
          onClick={() => {
            setOpen(false);
            setShowEmptyWarning(false);
          }}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[320px] flex items-center gap-3"
            suppressHydrationWarning
          >
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              suppressHydrationWarning
              className="absolute w-0 h-0 opacity-0 -z-10"
            />
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="email"
                placeholder={status === "sent" ? "Thank you!" : (emailPlaceholder ?? "Email Address")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (showEmptyWarning) setShowEmptyWarning(false);
                }}
                disabled={status === "sent"}
                suppressHydrationWarning
                className="w-full bg-transparent border-b border-foreground/30 pb-2 text-[16px] placeholder:italic focus:outline-none"
              />
              <span
                className={`absolute left-0 top-full mt-2 w-full text-[11px] transition-opacity duration-200 ${
                  showEmptyWarning ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                Please enter your email
              </span>
            </div>
            {status !== "sent" && (
              <button
                type="submit"
                disabled={status === "submitting"}
                aria-label="Send"
                className="shrink-0 cursor-pointer disabled:opacity-50"
              >
                <SendArrow />
              </button>
            )}
            <div className="absolute right-0 top-full mt-2">
              <Turnstile onToken={setTurnstileToken} />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
