document.addEventListener("DOMContentLoaded", () => {
  // Add event listener to all toggle-comment-button elements
  document.querySelectorAll(".toggle-comment-button").forEach((button) => {
    button.addEventListener("click", toggleComments);
  });
});

function toggleComments(event) {
  const element = event.currentTarget; // Get the clicked element
  const postId = element.getAttribute("data-id"); // Access the data-id attribute
  // Toggle the comments container's visibility if it exists
  const commentsContainer = document.getElementById(
    `comments-container-${postId}`
  );

  if (commentsContainer) {
    if (commentsContainer.classList.contains("hide-comments")) {
      commentsContainer.classList.remove("hide-comments");
      commentsContainer.classList.add("show-comments");
    } else {
      commentsContainer.classList.remove("show-comments");
      commentsContainer.classList.add("hide-comments");
    }
  }
}
