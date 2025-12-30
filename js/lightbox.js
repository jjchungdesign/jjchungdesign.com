document.addEventListener('DOMContentLoaded', () => {
    const items = [...document.querySelectorAll('.gallery-media')];
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const video = document.getElementById('lightbox-video');
  
    const prev = lightbox.querySelector('.prev');
    const next = lightbox.querySelector('.next');
    const close = lightbox.querySelector('.close');
  
    let index = 0;
  
    function resetMedia() {
      img.classList.remove('show');
      video.classList.remove('show');
      video.pause();
      video.removeAttribute('src');
    }
  
    function showMedia() {
      resetMedia();
  
      const el = items[index];
      const type = el.dataset.type;
  
      if (type === 'image') {
        img.src = el.src;
        img.style.display = 'block';
        video.style.display = 'none';
        requestAnimationFrame(() => img.classList.add('show'));
      } else {
        video.src = el.currentSrc || el.querySelector('source').src;
        video.style.display = 'block';
        img.style.display = 'none';
        video.play();
        requestAnimationFrame(() => video.classList.add('show'));
      }
    }
  
    function open(i) {
        index = i;
        lightbox.classList.add('is-open');
        requestAnimationFrame(showMedia);
    }
  
    function closeBox() {
        lightbox.classList.remove('is-open');
        resetMedia();
    }
  
    items.forEach((item, i) => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        open(i);
      });
    });
  
    prev.onclick = () => {
      index = (index - 1 + items.length) % items.length;
      showMedia();
    };
  
    next.onclick = () => {
      index = (index + items.length + 1) % items.length;
      showMedia();
    };
  
    close.onclick = closeBox;
  
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeBox();
    });
  
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeBox();
      if (e.key === 'ArrowLeft') prev.click();
      if (e.key === 'ArrowRight') next.click();
    });
  });