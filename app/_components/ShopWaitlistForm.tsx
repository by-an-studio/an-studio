"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile } from "./Turnstile";

function BuyNowArrow() {
  return (
    <svg width="20" height="8" viewBox="0 0 16 10" fill="none">
      <path d="M1 5H15M15 5L10 1M15 5L10 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShopWaitlistForm({
  productName,
  buttonLabel,
  className = "flex items-center gap-2 text-[16px] min-[1200px]:text-[15px]",
}: {
  productName?: string;
  buttonLabel: string;
  className?: string;
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
      const res = await fetch("/api/shop-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productName, company, turnstileToken }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={`${className} h-[16px] min-[1200px]:h-auto cursor-pointer transition-opacity duration-200 hover:opacity-40`}>
        <BuyNowArrow />
        <span className="italic">{buttonLabel}</span>
      </button>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={`${className} h-[16px] min-[1200px]:h-auto relative w-full max-w-[280px]`} suppressHydrationWarning>
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
      <div className="absolute right-0 top-full mt-2">
        <Turnstile onToken={setTurnstileToken} />
      </div>
      <div className="flex-1 min-w-0 h-[12px] min-[1200px]:h-auto overflow-hidden flex items-center">
        <div className="shrink-0 w-[133.3333%] h-[16px] min-[1200px]:w-full min-[1200px]:h-auto origin-left scale-75 min-[1200px]:scale-100">
          <input
            ref={inputRef}
            type="email"
            placeholder={status === "sent" ? "Thank you!" : "Email Address"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (showEmptyWarning) setShowEmptyWarning(false);
            }}
            disabled={status === "sent"}
            suppressHydrationWarning
            className="not-italic placeholder:not-italic w-full h-full box-border bg-transparent focus:outline-none text-[16px] min-[1200px]:text-[12px]"
          />
        </div>
      </div>
      {status !== "sent" && (
        <button
          type="submit"
          disabled={status === "submitting"}
          aria-label="Send"
          className="shrink-0 cursor-pointer disabled:opacity-50"
        >
          <BuyNowArrow />
        </button>
      )}
      <span
        className={`absolute left-0 top-full mt-1 text-[11px] whitespace-nowrap transition-opacity duration-200 ${
          showEmptyWarning ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Please enter your email
      </span>
    </form>
  );
}
