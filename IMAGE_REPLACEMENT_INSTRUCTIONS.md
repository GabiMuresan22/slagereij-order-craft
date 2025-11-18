# Image Replacement Instructions

## New Catering Images Added

Two new catering photos have been added to the gallery, but placeholder images are currently in place. These need to be replaced with the actual images.

### Images to Replace

1. **catering-buffet-spread.jpg**
   - Location: `src/assets/catering-buffet-spread.jpg`
   - Source URL: https://github.com/user-attachments/assets/e3ac480e-e99c-402f-8bb4-0d4626836f74
   - Description: Colorful buffet spread with fresh salads, donuts display, and party foods on a yellow table

2. **catering-pasta-bowls.jpg**
   - Location: `src/assets/catering-pasta-bowls.jpg`
   - Source URL: https://github.com/user-attachments/assets/209e68e5-1489-4a46-be09-e7629331d010
   - Description: Artisanal pasta salad bowls with fresh vegetables in decorative serving dishes

### How to Replace

1. Download the images from the URLs above
2. Replace the placeholder files in `src/assets/` with the downloaded images
3. Ensure the filenames match exactly: `catering-buffet-spread.jpg` and `catering-pasta-bowls.jpg`
4. Rebuild the project: `npm run build`

### Code Changes Made

The following files have been updated to include these images:
- `src/pages/Catering.tsx` - Added imports and gallery entries for both new images

The images will now appear at the end of the catering gallery on the website.
