import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download } from "lucide-react";
import { trackMenuDownload } from "@/components/Analytics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import christmasMenu1 from "@/assets/christmas-menu-1.webp";
import christmasMenu2 from "@/assets/christmas-menu-2.webp";
import christmasMenu3 from "@/assets/christmas-menu-3.webp";

interface PriceOption {
  persons: number;
  price: string;
}

interface MenuItem {
  id: number;
  titleKey: string;
  prices?: PriceOption[];
  descriptionKey: string;
  ingredientKeys: string[];
}

interface PricedItem {
  nameKey: string;
  price: string;
}

interface ALaCarteMenu {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  items: PricedItem[];
}

// À la carte menu items with individual prices
const aLaCarteMenus: ALaCarteMenu[] = [
  {
    id: 'hapjes',
    titleKey: 'christmasMenu.hapjes.title',
    items: [
      { nameKey: 'christmasMenu.hapjes.scampi', price: '€4' },
      { nameKey: 'christmasMenu.hapjes.lepelScampi', price: '€2' },
      { nameKey: 'christmasMenu.hapjes.lepelMeloenSerrano', price: '€2' },
      { nameKey: 'christmasMenu.hapjes.lepelPate', price: '€1,50' },
      { nameKey: 'christmasMenu.hapjes.lepelGeitenkaas', price: '€2' },
      { nameKey: 'christmasMenu.hapjes.lepelZalm', price: '€2' },
      { nameKey: 'christmasMenu.hapjes.tacoGehakt', price: '€2,50' },
      { nameKey: 'christmasMenu.hapjes.tacoKip', price: '€2,50' },
      { nameKey: 'christmasMenu.hapjes.bliniZalm', price: '€2,50' },
      { nameKey: 'christmasMenu.hapjes.bruschetaGeitenkaas', price: '€2' },
      { nameKey: 'christmasMenu.hapjes.bruschetaZalm', price: '€1,50' },
      { nameKey: 'christmasMenu.hapjes.bruschetaTomaat', price: '€1' },
      { nameKey: 'christmasMenu.hapjes.wrapsZalm', price: '€2' },
      { nameKey: 'christmasMenu.hapjes.wrapsHesp', price: '€2' },
      { nameKey: 'christmasMenu.hapjes.wrapsKip', price: '€2' },
      { nameKey: 'christmasMenu.hapjes.bulgurFeta', price: '€3' },
      { nameKey: 'christmasMenu.hapjes.bulgurFetaMeloen', price: '€3' },
      { nameKey: 'christmasMenu.hapjes.bulgurZalm', price: '€3' },
      { nameKey: 'christmasMenu.hapjes.bulgurGarnaal', price: '€3,50' },
      { nameKey: 'christmasMenu.hapjes.hawaiiSalade', price: '€3' },
    ]
  },
  {
    id: 'vleeshoofdgerechten',
    titleKey: 'christmasMenu.vleeshoofdgerechten.title',
    items: [
      { nameKey: 'christmasMenu.vleeshoofdgerechten.ardeensGebraad', price: '€6,50' },
      { nameKey: 'christmasMenu.vleeshoofdgerechten.varkenshaasje', price: '€8' },
      { nameKey: 'christmasMenu.vleeshoofdgerechten.orloffgebraad', price: '€7' },
      { nameKey: 'christmasMenu.vleeshoofdgerechten.kalkoen', price: '€8,50' },
      { nameKey: 'christmasMenu.vleeshoofdgerechten.hamrol', price: '€10' },
      { nameKey: 'christmasMenu.vleeshoofdgerechten.kipfilet', price: '€8,40' },
      { nameKey: 'christmasMenu.vleeshoofdgerechten.zalm', price: '€10' },
    ]
  },
  {
    id: 'warmeGroenten',
    titleKey: 'christmasMenu.warmeGroenten.title',
    descriptionKey: 'christmasMenu.warmeGroenten.description',
    items: [
      { nameKey: 'christmasMenu.warmeGroenten.bloemkool', price: '' },
      { nameKey: 'christmasMenu.warmeGroenten.boontjes', price: '' },
      { nameKey: 'christmasMenu.warmeGroenten.wortel', price: '' },
      { nameKey: 'christmasMenu.warmeGroenten.witloofSpek', price: '' },
    ]
  },
  {
    id: 'soep',
    titleKey: 'christmasMenu.soep.title',
    items: [
      { nameKey: 'christmasMenu.soep.tomatensoep', price: '€5,20/l' },
      { nameKey: 'christmasMenu.soep.tomatensoepBalletjes', price: '€5,60/l' },
      { nameKey: 'christmasMenu.soep.pompoensoep', price: '€6/l' },
      { nameKey: 'christmasMenu.soep.broccolisoep', price: '€5,50/l' },
    ]
  }
];

// Menu items with translation keys
const menuItems: MenuItem[] = [
  {
    id: 1,
    titleKey: "christmasMenu.menu1.title",
    prices: [
      { persons: 2, price: "€195" },
      { persons: 4, price: "€380" },
      { persons: 6, price: "€565" }
    ],
    descriptionKey: "christmasMenu.menu1.description",
    ingredientKeys: [
      "christmasMenu.menu1.item1",
      "christmasMenu.menu1.item2",
      "christmasMenu.menu1.item3",
      "christmasMenu.menu1.item4",
      "christmasMenu.menu1.item5",
      "christmasMenu.menu1.item6",
      "christmasMenu.menu1.item7",
      "christmasMenu.menu1.item8"
    ]
  },
  {
    id: 2,
    titleKey: "christmasMenu.menu2.title",
    prices: [
      { persons: 2, price: "€140" },
      { persons: 4, price: "€270" },
      { persons: 6, price: "€400" }
    ],
    descriptionKey: "christmasMenu.menu2.description",
    ingredientKeys: [
      "christmasMenu.menu2.item1",
      "christmasMenu.menu2.item2",
      "christmasMenu.menu2.item3",
      "christmasMenu.menu2.item4",
      "christmasMenu.menu2.item5",
      "christmasMenu.menu2.item6",
      "christmasMenu.menu2.item7"
    ]
  },
  {
    id: 3,
    titleKey: "christmasMenu.menu3.title",
    prices: [
      { persons: 2, price: "€170" },
      { persons: 4, price: "€330" },
      { persons: 6, price: "€490" }
    ],
    descriptionKey: "christmasMenu.menu3.description",
    ingredientKeys: [
      "christmasMenu.menu3.item1",
      "christmasMenu.menu3.item2",
      "christmasMenu.menu3.item3",
      "christmasMenu.menu3.item4",
      "christmasMenu.menu3.item5",
      "christmasMenu.menu3.item6",
      "christmasMenu.menu3.item7",
      "christmasMenu.menu3.item8",
      "christmasMenu.menu3.item9"
    ]
  }
];

// Additional menu items (simple items without person-based pricing)
const additionalMenuItems: MenuItem[] = [
  {
    id: 4,
    titleKey: "christmasMenu.miniBroodjes.title",
    descriptionKey: "christmasMenu.miniBroodjes.description",
    ingredientKeys: [
      "christmasMenu.miniBroodjes.item1",
      "christmasMenu.miniBroodjes.item2",
      "christmasMenu.miniBroodjes.item3"
    ]
  },
  {
    id: 5,
    titleKey: "christmasMenu.dessert.title",
    descriptionKey: "christmasMenu.dessert.description",
    ingredientKeys: [
      "christmasMenu.dessert.item1",
      "christmasMenu.dessert.item2",
      "christmasMenu.dessert.item3",
      "christmasMenu.dessert.item4",
      "christmasMenu.dessert.item5",
      "christmasMenu.dessert.item6"
    ]
  },
  {
    id: 6,
    titleKey: "christmasMenu.keuzeDessert.title",
    descriptionKey: "christmasMenu.keuzeDessert.description",
    ingredientKeys: [
      "christmasMenu.keuzeDessert.item1",
      "christmasMenu.keuzeDessert.item2",
      "christmasMenu.keuzeDessert.item3",
      "christmasMenu.keuzeDessert.item4",
      "christmasMenu.keuzeDessert.item5"
    ]
  },
  {
    id: 7,
    titleKey: "christmasMenu.tapas.title",
    descriptionKey: "christmasMenu.tapas.description",
    ingredientKeys: [
      "christmasMenu.tapas.item1",
      "christmasMenu.tapas.item2",
      "christmasMenu.tapas.item3",
      "christmasMenu.tapas.item4",
      "christmasMenu.tapas.item5",
      "christmasMenu.tapas.item6"
    ]
  },
  {
    id: 8,
    titleKey: "christmasMenu.fondue.title",
    descriptionKey: "christmasMenu.fondue.description",
    ingredientKeys: [
      "christmasMenu.fondue.item1"
    ]
  },
  {
    id: 9,
    titleKey: "christmasMenu.gourmet.title",
    descriptionKey: "christmasMenu.gourmet.description",
    ingredientKeys: [
      "christmasMenu.gourmet.item1",
      "christmasMenu.gourmet.item2",
      "christmasMenu.gourmet.item3"
    ]
  }
];

const ChristmasMenu = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      // Convert WEBP images to JPEG for PDF compatibility
      const convertToJpeg = async (imageSrc: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }
            ctx.drawImage(img, 0, 0);
            // Convert to JPEG with high quality
            const jpegBase64 = canvas.toDataURL('image/jpeg', 0.95);
            resolve(jpegBase64);
          };
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = imageSrc;
        });
      };

      const [image1Base64, image2Base64, image3Base64] = await Promise.all([
        convertToJpeg(christmasMenu1),
        convertToJpeg(christmasMenu2),
        convertToJpeg(christmasMenu3),
      ]);

      // Call the Supabase Edge Function to generate PDF
      const { data, error } = await supabase.functions.invoke('generate-christmas-menu-pdf', {
        body: { image1Base64, image2Base64, image3Base64 },
      });

      if (error) {
        throw error;
      }

      // Handle the response data - ensure it's in the correct format
      let pdfBlob: Blob;
      if (data instanceof Blob) {
        pdfBlob = data;
      } else if (data instanceof ArrayBuffer) {
        pdfBlob = new Blob([data], { type: 'application/pdf' });
      } else {
        // If data is already a Blob-like object or other format
        pdfBlob = new Blob([data], { type: 'application/pdf' });
      }

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Menu-Kerst-Nieuwjaar-Slagerij-John.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Track the download
      trackMenuDownload();
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: "Download failed",
        description: "Could not download the menu. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="w-full py-12 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="text-primary border-primary uppercase tracking-widest px-4 py-1">
            {t('christmasMenu.badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            {t('christmasMenu.titlePrefix')} <span className="text-primary">{t('christmasMenu.title')}</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            {t('christmasMenu.subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((menu) => (
            <Card 
              key={menu.id} 
              className="bg-neutral-800 border-primary transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Header */}
              <CardHeader className="text-center pb-2 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <CardTitle className="text-xl font-serif font-bold text-primary min-h-[3.5rem] flex items-center justify-center">
                  {t(menu.titleKey)}
                </CardTitle>
                {menu.prices && (
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                    {menu.prices.map((priceOption, idx) => (
                      <div key={idx} className="flex flex-col items-center px-3 py-1 bg-neutral-900 rounded-lg border border-neutral-700">
                        <span className="text-lg font-bold text-white">{priceOption.price}</span>
                        <span className="text-xs text-neutral-400">{priceOption.persons} {t('christmasMenu.persons')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardHeader>

              {/* Card Content */}
              <CardContent className="flex-grow pt-4">
                <div className="mb-4 text-center">
                  <span className="inline-block px-3 py-1 bg-neutral-900 rounded-full text-xs font-semibold text-neutral-300 border border-neutral-700">
                    {t(menu.descriptionKey)}
                  </span>
                </div>
                
                <ul className="space-y-3">
                  {menu.ingredientKeys.map((ingredientKey, idx) => (
                    <li key={idx} className="flex items-start text-sm text-neutral-300 leading-relaxed">
                      <span className="mr-3 text-primary mt-1.5 text-[10px]">◆</span>
                      <span>{t(ingredientKey)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Card Footer (Optional Order Button) */}
              <CardFooter className="pt-4 border-t border-neutral-700">
                <Link to="/order" className="w-full">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide"
                  >
                    {t('christmasMenu.orderNow')}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* À La Carte Section Header */}
        <div className="text-center mt-16 mb-12 space-y-4">
          <h3 className="text-2xl md:text-4xl font-serif font-bold text-white">
            {t('christmasMenu.alacarte.titlePrefix')} <span className="text-primary">{t('christmasMenu.alacarte.title')}</span>
          </h3>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            {t('christmasMenu.alacarte.subtitle')}
          </p>
        </div>

        {/* À La Carte Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aLaCarteMenus.map((menu) => (
            <Card 
              key={menu.id} 
              className="bg-neutral-800 border-primary transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Header */}
              <CardHeader className="text-center pb-2 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <CardTitle className="text-xl font-serif font-bold text-primary min-h-[2.5rem] flex items-center justify-center">
                  {t(menu.titleKey)}
                </CardTitle>
                {menu.descriptionKey && (
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-neutral-900 rounded-full text-xs font-semibold text-neutral-300 border border-neutral-700">
                      {t(menu.descriptionKey)}
                    </span>
                  </div>
                )}
              </CardHeader>

              {/* Card Content */}
              <CardContent className="flex-grow pt-4">
                <ul className="space-y-2">
                  {menu.items.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between text-sm text-neutral-300">
                      <span className="flex items-center">
                        <span className="mr-2 text-primary text-[10px]">◆</span>
                        <span>{t(item.nameKey)}</span>
                      </span>
                      {item.price && (
                        <span className="font-semibold text-white ml-2 whitespace-nowrap">{item.price}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Card Footer */}
              <CardFooter className="pt-4 border-t border-neutral-700">
                <Link to="/order" className="w-full">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide"
                  >
                    {t('christmasMenu.orderNow')}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Download Menu Button */}
        <div className="text-center mt-12">
          <Button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            {isDownloading ? t('home.christmas.downloading') : t('home.christmas.download')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChristmasMenu;
