import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  showLogo: true,
  logoText: 'InTaxi',
  logoImage: getAsset('~/assets/images/nad_logo.webp'),

  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Over ons',
      href: getPermalink('/about'),
    },
    {
      text: 'Taxiservices',
      href: getPermalink('/#tarieven'),
    },
    {
      text: 'Help',
      href: getPermalink('/help'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [
--    {
--      text: '+31 6 42 27 76 07',
--      href: 'tel:+31642277607',
--      variant: 'secondary',
--      icon: 'tabler:phone',
--    },
--   {
--      text: 'info@intaxi.nl',
--      href: 'mailto:info@intaxi.nl',
--      variant: 'secondary',
--      icon: 'tabler:mail',
--    },
    { 
      text: 'Contact via WhatsApp', 
      href: 'https://wa.me/31642277607?text=Ik%20wil%20graag%20een%20luxe%20Tesla%20taxi%20boeken%20voor%20een%20vaste%20prijs', 
      target: '_blank',
      variant: 'primary',
      icon: 'tabler:brand-whatsapp',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Service',
      links: [
        { text: 'Schiphol Taxi', href: '#' },
        { text: 'Zakelijk Vervoer', href: '#' },
        { text: 'Prijs berekenen', href: '#tarieven' },
        { text: 'Onze Tesla\'s', href: '#' },
      ],
    },
    {
      title: 'Bedrijf',
      links: [
        { text: 'Over NAD Service', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Werken bij', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Algemene Voorwaarden', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Telefoon', icon: 'tabler:phone', href: 'tel:+31642277607' },
    { ariaLabel: 'WhatsApp', icon: 'tabler:brand-whatsapp', href: 'https://wa.me/31642277607' },
  ],
  footNote: `
    © ${new Date().getFullYear()} <strong>InTaxi</strong> · Een service van <a class="text-blue-900 font-bold underline dark:text-muted" href="/"> NAD Service</a> · Alle rechten voorbehouden.
  `,
};
