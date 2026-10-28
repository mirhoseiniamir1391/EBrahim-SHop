(() => {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;
  const folder = gallery.dataset.gallery;
  fetch('images/manifest.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('manifest missing');
      return response.json();
    })
    .then(manifest => {
      const files = Array.isArray(manifest[folder]) ? manifest[folder] : [];
      if (!files.length) {
        gallery.innerHTML = '<p class="gallery-empty">هنوز تصویری برای این بخش اضافه نشده است.</p>';
        return;
      }
      files.forEach(src => {
        const link = document.createElement('a');
        link.className = 'gallery-image';
        link.href = src;
        link.target = '_blank';
        link.rel = 'noopener';
        const image = document.createElement('img');
        image.src = src;
        image.alt = 'تصویر ' + folder;
        image.loading = 'lazy';
        link.appendChild(image);
        gallery.appendChild(link);
      });
    })
    .catch(() => {
      gallery.innerHTML = '<p class="gallery-empty">فهرست تصاویر هنوز ساخته نشده است. پوشه‌های تصاویر را پر کنید و فایل refresh-images.bat را اجرا کنید.</p>';
    });
})();
