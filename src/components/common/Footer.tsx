import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const footerLinks = [
  { id: 'footer_home', label: 'Home', href: '/homepage' },
  { id: 'footer_games', label: 'Games', href: '/homepage' },
  { id: 'footer_privacy', label: 'Privacy', href: '#' },
  { id: 'footer_terms', label: 'Terms', href: '#' },
];

const socialLinks = [
  { id: 'social_github', icon: 'CodeBracketIcon', href: '#', label: 'GitHub' },
  { id: 'social_twitter', icon: 'ChatBubbleLeftIcon', href: '#', label: 'Twitter' },
];

const CURRENT_YEAR = 2026;

const Footer = () => (
  <footer className="border-t border-white/10 bg-background">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="SparklesIcon" size={20} className="text-white" />
          </div>
          <span className="text-sm text-white/60">
            © {CURRENT_YEAR} Game Hub. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-8">
          {footerLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon name={social.icon as never} size={20} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
