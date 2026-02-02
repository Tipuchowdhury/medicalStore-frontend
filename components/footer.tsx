import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-accent rounded flex items-center justify-center text-sm">💊</span>
              MediStore
            </h3>
            <p className="text-sm opacity-80">
              Your trusted online pharmacy for quality OTC medicines.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:opacity-100 opacity-80">All Medicines</Link></li>
              <li><Link href="/shop" className="hover:opacity-100 opacity-80">Categories</Link></li>
              <li><Link href="#" className="hover:opacity-100 opacity-80">Bestsellers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Sellers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/register?role=seller" className="hover:opacity-100 opacity-80">Become a Seller</Link></li>
              <li><Link href="#" className="hover:opacity-100 opacity-80">Seller Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:opacity-100 opacity-80">Help Center</Link></li>
              <li><Link href="#" className="hover:opacity-100 opacity-80">Contact Us</Link></li>
              <li><Link href="#" className="hover:opacity-100 opacity-80">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <Separator className="opacity-20" />
        <div className="mt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 MediStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
