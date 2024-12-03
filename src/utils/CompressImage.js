
export default function (file) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
         const img = new Image();
         img.src = e.target.result;

         img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const maxWidth = 800; // İsteğe bağlı maksimum genişlik
            const scale = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
               (blob) => {
                  if (blob.size > 300 * 1024) {
                     // 300 KB sınırını aşarsa kaliteyi daha da düşür
                     const quality = 0.6;
                     canvas.toBlob(
                        (compressedBlob) => {
                           const compressedFile = new File([compressedBlob], file.name, {
                              type: file.type,
                           });
                           resolve(compressedFile);
                        },
                        file.type,
                        quality
                     );
                  } else {
                     // 300 KB sınırının altındaysa direkt döndür
                     const compressedFile = new File([blob], file.name, {
                        type: file.type,
                     });
                     resolve(compressedFile);
                  }
               },
               file.type,
               0.7 // İlk kalite oranı
            );
         };

         img.onerror = () => reject(new Error("Resim yüklenemedi."));
      };

      reader.onerror = () => reject(new Error("Dosya okunamadı."));
      reader.readAsDataURL(file);
   });
};