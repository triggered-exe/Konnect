const videos = document.querySelectorAll('.post-video');

// Function to pause all videos except the clicked one
function pauseOtherVideos(clickedVideo) {
  videos.forEach(video => {
    if (video !== clickedVideo) {
      video.pause(); // Pause other videos
      video.currentTime = 0; // Reset their playback position
    }
  });
}

// Function to handle the intersection of videos
function handleVideoIntersect(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      if (video.paused) {
        pauseOtherVideos(video); // Pause other videos when a video is clicked
        video.play(); // Play the video when fully visible
      }
    }
  });
}

const observer = new IntersectionObserver(handleVideoIntersect, {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 1.0, // Fully visible
});

videos.forEach(video => {
  observer.observe(video); // Observe each video
});

videos.forEach(video => {
  video.addEventListener('click', () => {
    if (video.paused) {
      pauseOtherVideos(video); // Pause other videos when a video is clicked
      video.play(); // Play the clicked video
    } else {
      video.pause(); // Pause the clicked video if it's already playing
    }
  });
});
