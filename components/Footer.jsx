"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Github, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] rounded-sm py-10 flex flex-col justify-center items-center m-1">
      <div className=" container px-8 flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* About Section */}
        <div className="text-center flex flex-col items-center flex-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="D_logo_dark_mode.png" alt="logo" width={20} />
            <h3 className="font-bold text-[var(--foreground)]">Stole UI</h3>
          </div>
          <p className="text-sm text-[var(--secondary-fg)] max-w-xs">
            An online platform to get free UI components and design inspiration.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center flex-1">
          <h3 className="font-medium mb-3 text-[var(--foreground)]">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm text-[var(--secondary-fg)]">
            <li>
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/elements" className="hover:text-[var(--foreground)] transition-colors">
                Elements
              </Link>
            </li>
            <li>
              <Link href="/challenges" className="hover:text-[var(--foreground)] transition-colors">
                Challenges
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[var(--foreground)] transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-center flex-1">
          <h3 className="font-medium mb-3 text-[var(--foreground)]">Contact Us</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link 
              href="mailto:contact@stoleui.com" 
              className="flex items-center justify-center gap-2 text-[var(--secondary-fg)] hover:text-[var(--foreground)] transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>divyanshu930462gmail.com.com</span>
            </Link>
            
            {/* Social Links */}
            <div className="flex items-center justify-center  gap-5 mt-2">
              <Link 
                href="https://twitter.com/stoleui" 
                className="text-[var(--secondary-fg)] hover:text-[var(--foreground)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://github.com/stoleui" 
                className="text-[var(--secondary-fg)] hover:text-[var(--foreground)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/company/stoleui" 
                className="text-[var(--secondary-fg)] hover:text-[var(--foreground)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full mt-8 pt-4 border-t border-gray-700/30 text-center">
        <p className="text-sm text-[var(--secondary-fg)]">
          © {new Date().getFullYear()} Stole UI. Develpoed by Divyanshu Sharma.
        </p>
      </div>
    </footer>
  );
};

export default Footer;