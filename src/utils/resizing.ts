export const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("This function must be run in a browser environment."));
      return;
    }

    const img = document.createElement("img"); // 브라우저 환경에서만 동작
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      // 가로/세로 비율 유지하며 리사이즈
      if (width > height) {
        if (width > maxWidth) {
          height = Math.floor((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.floor((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const resizedFile = new File([blob], file.name, { type: file.type });
          resolve(resizedFile);
        } else {
          reject(new Error("이미지 리사이즈 실패"));
        }
      }, file.type);
    };

    img.onerror = () => reject(new Error("이미지 로드 실패"));
  });
};
