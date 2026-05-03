import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  showLogo: true,
  logoText: 'InTaxi Amsterdam', 
  logoImage: getAsset('~/assets/images/intaxi_logo.webp'),

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
      links: [
        {
          text: 'Vliegveldvervoer',
          href: getPermalink('/vliegveld-taxi'),
        },
        {
          text: 'Tarieven overzicht',
          href: getPermalink('/#tarieven'),
        },
      ],
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [
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
        { text: 'Vliegveld Taxi (Vaste Prijs)', href: getPermalink('/vliegveld-taxi') },
        { text: 'Schiphol Taxi', href: getPermalink('/vliegveld-taxi') },
        { text: 'Zakelijk Vervoer', href: '#' },
        { text: 'Prijs berekenen', href: getPermalink('/#tarieven') },
      ],
    },
    {
      title: 'Bedrijf',
      links: [
        { text: 'Over InTaxi Amsterdam', href: getPermalink('/about') },
        { text: 'Contact opnemen', href: getPermalink('/contact') },
        { text: 'Chauffeurs gezocht', href: '#' },
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
    © ${new Date().getFullYear()} <strong>InTaxi Amsterdam</strong> · Onderdeel van <a class="text-blue-900 font-bold underline dark:text-muted" href="/"> NAD Service</a> · Alle rechten voorbehouden.
  `,
};
