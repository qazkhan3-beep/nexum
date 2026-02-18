"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { NeuralCanvasBg } from "@/components/neural-canvas-bg"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [wallet, setWallet] = useState("")
  const [username, setUsername] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("[v0] Form submitted:", { email, wallet, username })
    setSubmitted(true)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-24">
      <NeuralCanvasBg accentColor="#00E5FF" />
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(195 100% 50% / 0.04) 1px, transparent 1px),
              linear-gradient(90deg, hsl(195 100% 50% / 0.04) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg animate-fade-in">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-sm sm:p-10">
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                {"YOU'RE IN"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {
                  "We'll reach out when your access is ready. Follow us on X for updates."
                }
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  JOIN THE{" "}
                  <span className="bg-gradient-to-r from-primary to-[hsl(180_100%_60%)] bg-clip-text text-transparent">
                    FUTURE
                  </span>
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Submit your data to enter the algorithmic era
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                    Gmail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    required
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                    EVM Address (Wallet)
                  </label>
                  <input
                    type="text"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="0x..."
                    required
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-primary">
                    X Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                    required
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>

                <a
                  href="https://x.com/nexaboraai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3.5 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary/30 hover:bg-secondary"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow NEXUM on X
                </a>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-4 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(195_100%_50%/0.4)]"
                >
                  Initialize
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
