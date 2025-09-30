"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

// You need to install 'qr-scanner' library: npm install qr-scanner
import QrScanner from "qr-scanner"

export default function ScannerPage() {
  const videoRef = useRef(null)
  useEffect(() => {
    let scanner
    if (videoRef.current) {
      scanner = new QrScanner(
        videoRef.current,
        (res) => {
          scanner.stop()
          window.location.href = res.data
        },
        { highlightScanRegion: true }
      )
      scanner.start()
    }
    return () => {
      if (scanner) scanner.stop()
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-xl text-center">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-4 text-foreground">QR Scanner</h1>
          <p className="text-muted-foreground mb-8">
            Scan a QR code to get fort details or access special features.
          </p>
          <div className="flex flex-col items-center gap-4">
            <video ref={videoRef} style={{ width: "100%", maxWidth: 400, borderRadius: 12 }} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}