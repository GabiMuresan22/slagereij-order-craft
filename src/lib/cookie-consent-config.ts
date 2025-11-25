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
          description: 'Wij gebruiken cookies om uw ervaring te verbeteren en om bezoekersstatistieken bij te houden. U kunt uw toestemming op elk moment wijzigen via de <button type="button" data-cc="c-settings" class="cc-link">instellingen</button>. Meer informatie vindt u in ons <a href="/privacy">privacybeleid</a>.<br/><br/><small>Cookies die we gebruiken:<br/>• Noodzakelijke cookies: Voor basisfunctionaliteit (permanent)<br/>• Google Analytics (_ga, _gid): Voor websitestatistieken (max. 2 jaar)</small>',
          primary_btn: {
            text: 'Alles accepteren',
            role: 'accept_all'
          },
          secondary_btn: {
            text: 'Alles weigeren',
            role: 'accept_necessary'
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
          description: 'Folosim cookie-uri pentru a vă îmbunătăți experiența și pentru a urmări statisticile vizitatorilor. Puteți modifica consimțământul în orice moment prin <button type="button" data-cc="c-settings" class="cc-link">setări</button>. Mai multe informații găsiți în <a href="/privacy">politica de confidențialitate</a>.<br/><br/><small>Cookie-urile pe care le folosim:<br/>• Cookie-uri necesare: Pentru funcționalitate de bază (permanent)<br/>• Google Analytics (_ga, _gid): Pentru statistici website (max. 2 ani)</small>',
          primary_btn: {
            text: 'Acceptă toate',
            role: 'accept_all'
          },
          secondary_btn: {
            text: 'Refuză toate',
            role: 'accept_necessary'
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
  onAccept: async () => {
    // Load GA4 if analytics consent is given
    const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
    if (measurementId && measurementId.startsWith('G-')) {
      const { acceptedCategory } = await import('vanilla-cookieconsent');
      if (acceptedCategory && acceptedCategory('analytics') && typeof window !== 'undefined') {
        // Initialize GA4 - set window.gtag globally so Analytics.tsx can use it
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(command: string, ...args: unknown[]) {
          window.dataLayer?.push([command, ...args]);
        };
        window.gtag('js', new Date());
        window.gtag('config', measurementId, {
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
