import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>{siteConfig.brandName}</h3>
          <p>{siteConfig.brandTagline}</p>
          <p className="muted">{siteConfig.contactAddress}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li>
              <Link href="/collections">Collections</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Client Concierge</h4>
          <p>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </p>
          <p>
            <a href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}>
              {siteConfig.contactPhone}
            </a>
          </p>
          <p>
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              {siteConfig.whatsappNumber}
            </a>
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
