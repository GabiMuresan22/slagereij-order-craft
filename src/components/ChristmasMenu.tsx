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
  prices: PriceOption[];
  descriptionKey: string;
  ingredientKeys: string[];
}

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
