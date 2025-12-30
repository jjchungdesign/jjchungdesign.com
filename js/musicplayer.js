document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('background-music');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  const playIcon = '<i class="fas fa-play"></i>';
  const pauseIcon = '<i class="fa fa-pause"></i>';
  const volumeUpIcon = '<i class="fas fa-volume-up"></i>';
  const volumeMuteIcon = '<i class="fas fa-volume-mute"></i>';
  
  // Play or pause the music when the play/pause button is clicked
  playPauseBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();  // Play music
      playPauseBtn.innerHTML = pauseIcon;  // Change to Pause Icon
    } else {
      audio.pause();  // Pause music
      playPauseBtn.innerHTML = playIcon;  // Change to Play Icon
    }
  });

  // Mute or unmute the music when the mute button is clicked
  muteBtn.addEventListener('click', function() {
    if (audio.muted) {
      audio.muted = false;  // Unmute the audio
      muteBtn.innerHTML = volumeUpIcon;  // Change to Volume Up Icon
    } else {
      audio.muted = true;  // Mute the audio
      muteBtn.innerHTML = volumeMuteIcon;  // Change to Mute Icon
    }
  });

  // Function to start audio and apply fade-in effect to the volume
  function startAudio() {
    setTimeout(() => {
      audio.play();  // Start playing audio after a delay
      audio.muted = false;  // Unmute the audio

      // Gradually increase the volume to 1 (full volume) over 5 seconds
      let volume = 0;
      const fadeInterval = setInterval(() => {
        if (volume < 0.5) {
          volume += 0.025; // Increase volume by 0.05 every 100ms
          audio.volume = volume;
        } else {
          clearInterval(fadeInterval);  // Stop the fade-in when full volume is reached
        }
      }, 100);  // Fade over 5 seconds (adjust the interval speed if needed)
    }, 3000);  // Delay of 3 seconds before starting the audio
  }

  // Start the audio with the fade-in effect
  startAudio();
});
