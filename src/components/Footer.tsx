import React from "react";
import Link from "next/link";
import { Send, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-8 overflow-hidden z-10">
      {/* Background glow shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <span className="text-xl font-bold tracking-widest text-white">
              APEX<span className="text-[#00c2ff]">DETAILING</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Uncompromising professional auto care. Setting the gold standard in Tashkent for ceramic coating, soundproofing, and bespoke detailing services.
          </p>
          <div className="flex items-center space-x-3 text-xs text-[#00c2ff]">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Premium Partner Warranty</span>
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Services</h4>
          <ul className="space-y-3.5 text-sm text-gray-400">
            <li>
              <Link href="/services/polishing-ceramic" className="hover:text-white transition-colors">
                Polishing & Ceramic
              </Link>
            </li>
            <li>
              <Link href="/services/shumka" className="hover:text-white transition-colors">
                Soundproofing (Shumka)
              </Link>
            </li>
            <li>
              <Link href="/services/kuzov-himoyasi" className="hover:text-white transition-colors">
                Kuzov Himoyasi (PPF Armor)
              </Link>
            </li>
            <li>
              <Link href="/services/ximchiska" className="hover:text-white transition-colors">
                Interior Detailing (Ximchiska)
              </Link>
            </li>
          </ul>
        </div>

        {/* Working Hours Column */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Working Hours</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-[#00c2ff] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Monday - Saturday</p>
                <p className="text-xs text-gray-500">09:00 AM - 08:00 PM</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <Clock className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-500 font-medium">Sunday</p>
                <p className="text-xs text-gray-600">Appointment Only</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Contact & Location</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-[#00c2ff] shrink-0 mt-0.5" />
              <span>Chilonzor District, Bunyodkor Avenue, Tashkent, Uzbekistan</span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone className="w-4 h-4 text-[#00c2ff] shrink-0 mt-0.5" />
              <a href="tel:+998901234567" className="hover:text-white transition-colors">
                +998 (90) 123-45-67
              </a>
            </li>
            <li className="flex items-start space-x-3">
              <Send className="w-4 h-4 text-[#00c2ff] shrink-0 mt-0.5" />
              <a href="https://t.me/apex_detailing_demo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                @apex_detailing_demo
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© {currentYear} APEX DETAILING. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
