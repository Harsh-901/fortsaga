import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">FortSaga</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Preserving the legacy of Chhatrapati Shivaji Maharaj's historic forts for future generations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href="/forts" className="hover:text-primary transition-colors">
                  All Forts
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-primary transition-colors">
                  Report Issues
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-primary transition-colors">
                  Educational Content
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href="/citizen" className="hover:text-primary transition-colors">
                  For Citizens
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">
                  For Admins
                </Link>
              </li>
              <li>
                <Link href="/visitors" className="hover:text-primary transition-colors">
                  For Visitors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
          <p>&copy; 2025 FortSaga. Dedicated to preserving our heritage.</p>
        </div>
      </div>
    </footer>
  )
}
