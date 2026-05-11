import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = (lang: 'nl' | 'en' = 'nl') => {
  const data = {
    nl: {
      links: [
        { text: 'Home', href: getPermalink('/') },
        { text: 'Vliegveldvervoer', href: getPermalink('/vliegveld-taxi') },
        { text: 'Contact', href: getPermalink('/contact') },
        { text: 'Over ons', href: getPermalink('/about') },
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
    },
    en: {
      links: [
        { text: 'Home', href: getPermalink('/en') },
        { text: 'Airport Transfer', href: getPermalink('/en/vliegveld-taxi') }, // Let op: maak deze pagina aan in /en/
        { text: 'Contact', href: getPermalink('/en/contact') },
        { text: 'About us', href: getPermalink('/en/about') },
      ],
      actions: [
        { 
          text: 'Contact via WhatsApp', 
          href: 'https://wa.me/31642277607?text=I%20would%20like%20to%20book%20a%20luxury%20Tesla%20taxi%20for%20a%20fixed%20price', 
          target: '_blank',
          variant: 'primary',
          icon: 'tabler:brand-whatsapp',
        },
      ],
    },
  };

  return {
    showLogo: true,
    logoText: 'InTaxi Amsterdam', 
    logoImage: getAsset('~/assets/images/intaxi_logo.webp'),
    ...(data[lang] || data.nl),
  };
};

export const footerData = (lang: 'nl' | 'en' = 'nl') => {
  const data = {
    nl: {
      links: [
        {
          title: 'Service',
          links: [
            { text: 'Vliegveld Taxi (Vaste Prijs)', href: getPermalink('/vliegveld-taxi') },
            { text: 'Schiphol Taxi', href: getPermalink('/vliegveld-taxi') },
            { text: 'Zakelijk Vervoer', href: '#' },
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
      footNote: `© ${new Date().getFullYear()} <strong>InTaxi Amsterdam</strong> · Onderdeel van <a class="text-blue-900 font-bold underline dark:text-muted" href="/"> NAD Service</a> · Alle rechten voorbehouden.`,
    },
    en: {
      links: [
        {
          title: 'Service',
          links: [
            { text: 'Airport Taxi (Fixed Price)', href: getPermalink('/en/vliegveld-taxi') },
            { text: 'Schiphol Taxi Service', href: getPermalink('/en/vliegveld-taxi') },
            { text: 'Corporate Transport', href: '#' },
          ],
        },
        {
          title: 'Company',
          links: [
            { text: 'About InTaxi Amsterdam', href: getPermalink('/en/about') },
            { text: 'Contact us', href: getPermalink('/en/contact') },
            { text: 'Drivers wanted', href: '#' },
          ],
        },
      ],
      secondaryLinks: [
        { text: 'Terms & Conditions', href: getPermalink('/en/terms') },
        { text: 'Privacy Policy', href: getPermalink('/en/privacy') },
      ],
      footNote: `© ${new Date().getFullYear()} <strong>InTaxi Amsterdam</strong> · Part of <a class="text-blue-900 font-bold underline dark:text-muted" href="/en"> NAD Service</a> · All rights reserved.`,
    },
  };

  const common = {
    socialLinks: [
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
      { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
      { ariaLabel: 'Telefoon', icon: 'tabler:phone', href: 'tel:+31642277607' },
      { ariaLabel: 'WhatsApp', icon: 'tabler:brand-whatsapp', href: 'https://wa.me/31642277607' },
    ],
  };

  return {
    ...common,
    ...(data[lang] || data.nl),
  };
};
