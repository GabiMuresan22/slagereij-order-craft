import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { PDFDocument } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting PDF generation for Christmas menu...');

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Get the base64 images from the request body
    const { image1Base64, image2Base64 } = await req.json();

    if (!image1Base64 || !image2Base64) {
      throw new Error('Image data is required');
    }

    console.log('Processing base64 images...');

    // Convert base64 to bytes (remove data:image/jpeg;base64, prefix)
    const base64ToBytes = (base64: string): Uint8Array => {
      const base64Data = base64.split(',')[1];
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes;
    };

    const image1Bytes = base64ToBytes(image1Base64);
    const image2Bytes = base64ToBytes(image2Base64);

    console.log('Embedding images in PDF...');

    // Embed the images
    const image1 = await pdfDoc.embedJpg(image1Bytes);
    const image2 = await pdfDoc.embedJpg(image2Bytes);

    // Get image dimensions
    const image1Dims = image1.scale(1);
    const image2Dims = image2.scale(1);

    // Calculate scale to fit A4 page (595 x 842 points)
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 20;
    const availableWidth = pageWidth - (margin * 2);
    const availableHeight = pageHeight - (margin * 2);

    // Scale images to fit page width
    const scale1 = availableWidth / image1Dims.width;
    const scaledHeight1 = image1Dims.height * scale1;
    
    const scale2 = availableWidth / image2Dims.width;
    const scaledHeight2 = image2Dims.height * scale2;

    // Add first page with first image
    const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
    page1.drawImage(image1, {
      x: margin,
      y: pageHeight - margin - scaledHeight1,
      width: availableWidth,
      height: scaledHeight1,
    });

    // Add second page with second image
    const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
    page2.drawImage(image2, {
      x: margin,
      y: pageHeight - margin - scaledHeight2,
      width: availableWidth,
      height: scaledHeight2,
    });

    console.log('Saving PDF...');

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Convert to standard Uint8Array
    const uint8Array = new Uint8Array(pdfBytes);

    console.log('PDF generated successfully');

    // Return the PDF
    return new Response(new Blob([uint8Array], { type: 'application/pdf' }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Menu-Kerst-Nieuwjaar-Slagerij-John.pdf"',
      },
    });

  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to generate PDF' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
