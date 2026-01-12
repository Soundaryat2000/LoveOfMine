const hearts = document.querySelectorAll('.heart');
const mediaContainer = document.getElementById('media-container');

const totalHearts = hearts.length;
let clickedCount = 0;

hearts.forEach((heart, index) => {
  heart.addEventListener('click', () => {

    // Prevent double click
    if (heart.classList.contains('opened')) return;
    heart.classList.add('opened');
    clickedCount++;

    // Pop animation
    heart.classList.add('pop');

    // Show media if exists
    const mediaFile = heart.getAttribute('data-media');
    if (mediaFile) {
      const ext = mediaFile.split('.').pop().toLowerCase();

      // Clear previous
      mediaContainer.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.style.textAlign = 'center';

      if (ext === 'mp3') {
        const audio = document.createElement('audio');
        audio.src = mediaFile;
        audio.controls = true;
        audio.autoplay = true;
        wrapper.appendChild(audio);
      } else if (ext === 'mp4') {
        const video = document.createElement('video');
        video.src = mediaFile;
        video.controls = true;
        video.autoplay = true;
        wrapper.appendChild(video);
      } else if (ext === 'png' || ext === 'jpg') {
        const img = document.createElement('img');
        img.src = mediaFile;
        wrapper.appendChild(img);
      }

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.innerText = 'Close ❤️';
      closeBtn.addEventListener('click', () => {
        mediaContainer.innerHTML = '';

        // If all hearts clicked, show thank you
        if (clickedCount === totalHearts) {
          showThankYou();
        }
      });

      wrapper.appendChild(closeBtn);
      mediaContainer.appendChild(wrapper);
    } else {
      // If no media and last heart, show thank you directly
      if (clickedCount === totalHearts) {
        showThankYou();
      }
    }
  });
});

// Typewriting final message
function showThankYou() {
  const jar = document.querySelector('.jar-container');

  const message = document.createElement('div');
  message.className = 'final-message';
  message.innerHTML = `
    <h2 id="type-title"></h2>
    <p id="type-line1"></p>
    <p id="type-line2"></p>
    <p class="signature" id="type-sign"></p>
  `;
  jar.appendChild(message);

  const title = document.getElementById('type-title');
  const line1 = document.getElementById('type-line1');
  const line2 = document.getElementById('type-line2');
  const sign = document.getElementById('type-sign');

  typeText(title, 'For You, My Love ❤️', 80, () => {
    typeText(
      line1,
      'Without you, my heart feels empty like this. Every heart you touched carried my feelings. Even across distance, my love reaches you.',
      40,
      () => {
        typeText(
          line2,
          'Thank you for being my strength, my pride, and my forever.',
          40,
          () => {
            typeText(sign, '— Yours, Always 💗', 60);
          }
        );
      }
    );
  });
}

function typeText(el, text, speed, callback) {
  let i = 0;
  el.innerHTML = '';
  const interval = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}
