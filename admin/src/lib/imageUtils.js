/**
 * Utility to convert an image file to WebP format on the client side.
 * @param {File} file - The original image file (JPG, PNG, etc.)
 * @param {number} quality - Quality of the resulting WebP image (0 to 1)
 * @returns {Promise<File>} - A promise that resolves to the converted WebP File object.
 */
export const convertToWebP = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    // Only process images
    if (!file.type.startsWith('image/')) {
      return resolve(file);
    }

    // Skip if already webp
    if (file.type === 'image/webp') {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Canvas to Blob conversion failed'));
            }
            // Create a new file from the blob
            const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const convertedFile = new File([blob], newFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(convertedFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => reject(new Error('Image loading failed'));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsDataURL(file);
  });
};
