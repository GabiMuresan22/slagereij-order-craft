import 'vanilla-cookieconsent';

export const config = {
  gui_options: {
    consent_modal: {
      layout: 'box',
      position: 'bottom left',
      equal_weight_buttons: true,
      flip_buttons: false
    },
    settings_modal: {
      layout: 'box',
      position: 'right',
      equal_weight_buttons: true,
      flip_buttons: false
    }
  },
  categories: {
    necessary: {
      readOnly: true,
      enabled: true
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/ // Automatically delete GA cookies if consent is withdrawn
          }
        ]
      }
    }
  },
  language: {
    default: 'nl',
    autoDetect: 'browser' as const,
    translations: {
      nl: {
        consent_modal: {
          title: 'Wij gebruiken cookies',
          description: 'Wij gebruiken cookies om uw ervaring te verbeteren en om bezoekersstatistieken bij te houden. Meer informatie vindt u in ons <a href="/privacy">privacybeleid</a>.',
          primary_btn: {
            text: 'Alles accepteren',
            role: 'accept_all'
          },
          secondary_btn: {
            text: 'Instellingen',
            role: 'settings'
          }
        },
        settings_modal: {
          title: 'Cookie voorkeuren',
          save_settings_btn: 'Instellingen opslaan',
          accept_all_btn: 'Alles accepteren',
          reject_all_btn: 'Alles weigeren',
          close_btn_label: 'Sluiten',
          blocks: [
            {
              title: 'Cookie gebruik',
              description: 'Wij gebruiken cookies om de basisfuncties van de website te garanderen en om uw ervaring te verbeteren. U kunt voor elke categorie kiezen of u deze wilt in- of uitschakelen. Voor meer informatie, zie ons <a href="/privacy">privacybeleid</a>.'
            },
            {
              title: 'Strikt noodzakelijke cookies',
              description: 'Deze cookies zijn essentieel voor het goed functioneren van de website. Zonder deze cookies kan de website niet naar behoren werken.',
              toggle: {
                value: 'necessary',
                enabled: true,
                readonly: true
              }
            },
            {
              title: 'Analytische cookies',
              description: 'Deze cookies helpen ons te begrijpen hoe bezoekers de website gebruiken door informatie te verzamelen en te rapporteren. Alle informatie die deze cookies verzamelen is geaggregeerd en daarom anoniem.',
              toggle: {
                value: 'analytics',
                enabled: false,
                readonly: false
              }
            }
          ]
        }
      },
      ro: {
        consent_modal: {
          title: 'Folosim cookie-uri',
          description: 'Folosim cookie-uri pentru a vă îmbunătăți experiența și pentru a urmări statisticile vizitatorilor. Mai multe informații găsiți în <a href="/privacy">politica de confidențialitate</a>.',
          primary_btn: {
            text: 'Acceptă toate',
            role: 'accept_all'
          },
          secondary_btn: {
            text: 'Setări',
            role: 'settings'
          }
        },
        settings_modal: {
          title: 'Preferințe cookie-uri',
          save_settings_btn: 'Salvează setările',
          accept_all_btn: 'Acceptă toate',
          reject_all_btn: 'Refuză toate',
          close_btn_label: 'Închide',
          blocks: [
            {
              title: 'Utilizarea cookie-urilor',
              description: 'Folosim cookie-uri pentru a garanta funcțiile de bază ale site-ului web și pentru a vă îmbunătăți experiența. Puteți alege pentru fiecare categorie dacă doriți să o activați sau dezactivați. Pentru mai multe informații, consultați <a href="/privacy">politica de confidențialitate</a>.'
            },
            {
              title: 'Cookie-uri strict necesare',
              description: 'Aceste cookie-uri sunt esențiale pentru funcționarea corectă a site-ului web. Fără aceste cookie-uri, site-ul nu poate funcționa corespunzător.',
              toggle: {
                value: 'necessary',
                enabled: true,
                readonly: true
              }
            },
            {
              title: 'Cookie-uri analitice',
              description: 'Aceste cookie-uri ne ajută să înțelegem cum vizitatorii utilizează site-ul web prin colectarea și raportarea informațiilor. Toate informațiile colectate de aceste cookie-uri sunt agregate și, prin urmare, anonime.',
              toggle: {
                value: 'analytics',
                enabled: false,
                readonly: false
              }
            }
          ]
        }
      }
    }
  },
  onAccept: () => {
    // Load GA4 if analytics consent is given
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
    if (measurementId && measurementId.startsWith('G-')) {
      const { acceptedCategory } = require('vanilla-cookieconsent');
      if (acceptedCategory('analytics') && typeof window !== 'undefined') {
        // Initialize GA4
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer?.push(args);
        }
        gtag('js', new Date());
        gtag('config', measurementId, {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
        
        // Load GA4 script if not already loaded
        if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
          const script = document.createElement('script');
          script.async = true;
          script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
          document.head.appendChild(script);
        }
      }
    }
  }
};
