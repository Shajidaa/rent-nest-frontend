import Link from "next/link";

import MyContainer from "./MyContainer";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa6";
const footerLinks = {
    company: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Press", href: "#" },
    ],
    properties: [
        { label: "Browse Properties", href: "/properties" },
        { label: "Explore Areas", href: "/explore" },
        
      
    ],
    support: [
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
    ],
};

const socials = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon:  FaTwitter,  href: "#", label: "Twitter" },
    { icon: FaInstagram,  href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#0B4F4A] via-[#0d6158] to-[#083d39] text-white ">
            <MyContainer className="py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold tracking-tight">NestRent</h2>
                        <p className="text-sm text-white/70 leading-relaxed">
                            Find your perfect rental property with ease. Connecting landlords and tenants across the country.
                        </p>
                        <div className="space-y-2 text-sm text-white/70">
                            <a href="tel:+02234356" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Phone className="w-4 h-4 shrink-0" />
                                +02234356
                            </a>
                            <a href="mailto:hello@rentease.com" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Mail className="w-4 h-4 shrink-0" />
                                hello@rentease.com
                            </a>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 shrink-0" />
                                123 Main Street, City
                            </span>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Properties */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">Properties</h3>
                        <ul className="space-y-2">
                            {footerLinks.properties.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-white/10" />

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/50">
                        © {new Date().getFullYear()} RentEase. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        {socials.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="rounded-full border border-white/20 p-2 text-white/60 hover:text-white hover:border-white/50 transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </MyContainer>
        </footer>
    );
}
