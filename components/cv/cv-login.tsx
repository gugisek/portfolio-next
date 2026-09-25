"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { inputClass } from "./cv-fields";

export default function CvLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/cv/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        window.location.reload();
        return;
      }
      const body = await response.json().catch(() => ({}));
      if (response.status === 429) setError(`Za dużo prób. Spróbuj ponownie za ${Math.ceil((body.retryAfter ?? 900) / 60)} min.`);
      else if (response.status === 401) setError(body.attemptsLeft > 0 ? `Złe hasło. Pozostałe próby: ${body.attemptsLeft}.` : "Złe hasło.");
      else setError("Logowanie jest niedostępne.");
    } catch {
      setError("Brak połączenia z serwerem.");
    }
    setBusy(false);
    setPassword("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e0e0e0] px-5 text-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="about-panel w-full max-w-sm rounded-[2rem] p-8 sm:p-10"
      >
        <span className="about-out mx-auto flex h-16 w-16 items-center justify-center rounded-full text-[#3d3d3d]">
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </span>
        <h1 className="mt-6 text-center font-[Lexend-bold] text-4xl uppercase leading-none text-[#3d3d3d]">CV edit</h1>

        {configured ? (
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="sr-only">Hasło</span>
              <input
                type="password"
                autoFocus
                autoComplete="current-password"
                placeholder="hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} py-3 text-center`}
              />
            </label>
            <button
              type="submit"
              disabled={busy || !password}
              className="neu-press w-full rounded-2xl px-6 py-3 text-sm font-[Lexend-medium] text-[#2e2e2e] disabled:opacity-50"
            >
              {busy ? "Sprawdzanie…" : "Zaloguj"}
            </button>
            <p role="alert" className="min-h-[1.25rem] text-center text-xs text-red-600">
              {error}
            </p>
          </form>
        ) : (
          <p className="mt-6 text-center text-sm leading-relaxed text-neutral-600">
            Edytor jest wyłączony. Ustaw <code className="about-in rounded-md px-1.5 py-0.5 text-xs">CV_EDIT_PASSWORD</code> w pliku{" "}
            <code className="about-in rounded-md px-1.5 py-0.5 text-xs">.env.local</code> i zrestartuj serwer.
          </p>
        )}

        <a href="/" className="mt-4 block text-center text-xs text-neutral-500 transition-colors hover:text-[#2e2e2e]">
          ← wróć do portfolio
        </a>
      </motion.div>
    </main>
  );
}
