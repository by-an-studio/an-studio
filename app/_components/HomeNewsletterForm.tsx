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

export function HomeNewsletterForm({
  buttonLabel,
  emailPlaceholder,
  comingSoonLabel,
}: {
  buttonLabel: string;
  emailPlaceholder?: string;
  comingSoonLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpen(false);
        setShowEmptyWarning(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
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
    <form ref={formRef} onSubmit={handleSubmit} className="md:ml-auto" suppressHydrationWarning>
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
      <div className="relative">
        <div className="absolute right-0 top-full mt-2">
          <Turnstile onToken={setTurnstileToken} />
        </div>
        <div
          className={`relative overflow-hidden bg-[#EFECE6] py-1 flex items-center transition-[width,padding,height] duration-300 ease-out ${
            open ? "h-[34px] md:h-[27px] w-[330px] px-3 justify-start" : "h-[28px] md:h-[27px] w-[190px] px-[40px] justify-center"
          }`}
        >
          {open ? (
            <>
              <div className="flex-1 h-[24px] md:h-auto overflow-hidden flex items-center">
                <div className="shrink-0 w-[114.2857%] h-[27px] md:w-full md:h-auto origin-left scale-[0.875] md:scale-100">
                  <input
                    ref={inputRef}
                    type="email"
                    placeholder={status === "sent" ? (comingSoonLabel ?? "Coming soon!") : (emailPlaceholder ?? "Email Address")}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (showEmptyWarning) setShowEmptyWarning(false);
                    }}
                    suppressHydrationWarning
                    className="bg-transparent text-[16px] md:text-[14px] w-full h-full box-border focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                aria-label="Send"
                className="shrink-0 ml-3 p-3 -m-3 cursor-pointer disabled:opacity-50"
              >
                <SendArrow />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute inset-0 w-full h-full flex items-center justify-center whitespace-nowrap text-[12px] md:text-[14px] cursor-pointer"
            >
              {buttonLabel}
            </button>
          )}
        </div>
        <span
          className={`absolute left-0 top-full mt-1 text-[11px] md:text-[8px] whitespace-nowrap transition-opacity duration-200 ${
            showEmptyWarning ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Please enter your email
        </span>
      </div>
    </form>
  );
}
