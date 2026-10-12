/**
 * Utility to process any uploaded logo image into an exact 1:1 square aspect ratio.
 */
export async function fitImage1x1(
  src: string,
  mode: 'contain' | 'crop' = 'contain',
  bgColor: string = 'transparent',
  padShape: 'none' | 'square' | 'circle' | 'rounded' = 'none',
  outputSize: number = 1024
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(src);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Clear canvas
      ctx.clearRect(0, 0, outputSize, outputSize);

      // Draw background pad if specified
      if (bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        if (padShape === 'circle') {
          ctx.beginPath();
          ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (padShape === 'rounded') {
          const r = outputSize * 0.22;
          ctx.beginPath();
          ctx.roundRect(0, 0, outputSize, outputSize, r);
          ctx.fill();
        } else {
          ctx.fillRect(0, 0, outputSize, outputSize);
        }
      }

      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;

      let dx = 0;
      let dy = 0;
      let dw = outputSize;
      let dh = outputSize;

      if (mode === 'contain') {
        // Leave a slight inner padding (e.g. 5%) if a colored background pad is used
        const usableSize = bgColor !== 'transparent' ? outputSize * 0.88 : outputSize;
        const scale = Math.min(usableSize / iw, usableSize / ih);
        dw = iw * scale;
        dh = ih * scale;
        dx = (outputSize - dw) / 2;
        dy = (outputSize - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      } else if (mode === 'crop') {
        // Cover 1:1 square
        const scale = Math.max(outputSize / iw, outputSize / ih);
        dw = iw * scale;
        dh = ih * scale;
        dx = (outputSize - dw) / 2;
        dy = (outputSize - dh) / 2;

        if (padShape === 'circle' && bgColor !== 'transparent') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, dx, dy, dw, dh);
          ctx.restore();
        } else if (padShape === 'rounded' && bgColor !== 'transparent') {
          ctx.save();
          const r = outputSize * 0.22;
          ctx.beginPath();
          ctx.roundRect(0, 0, outputSize, outputSize, r);
          ctx.clip();
          ctx.drawImage(img, dx, dy, dw, dh);
          ctx.restore();
        } else {
          ctx.drawImage(img, dx, dy, dw, dh);
        }
      }

      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      resolve(src);
    };

    img.src = src;
  });
}
