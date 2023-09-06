(function(){
// function to render the events
function renderEvents() {
  const form = document.getElementById("post-create-form");
  postCreateEvent(form);
  
  // for deleting the post without reload
  const deleteButtons = document.getElementsByClassName("post-delete-button");
  for (const deleteButton of deleteButtons) {
    postDeleteEvent(deleteButton);
  }

  const addCommentForms = document.getElementsByClassName("comment-add-form");
  for (addCommentForm of addCommentForms) {
     commentCreateEvent(addCommentForm);
  }

  const comment_deleteButtons = document.getElementsByClassName(
    "comment-delete-button"
  );
  for (deleteButton of comment_deleteButtons) {
    commentDeleteEvent(deleteButton);
  }
}

// for adding the post without reload
async function addPost(e) {

 const content_element = document.getElementById("post-content");
  content = content_element.value;
  content_element.value = "";
  if (content.length > 0) {
    fetch(`/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        displayPost(data);
        postDeleteEvent(document.getElementById(`${data._id}`));
        showNotification("Post added successfully", "success");
      })
      .catch((error) => {
        showNotification("Error creating post", "error");
        console.error("Error creating post:", error);
      });
  }
}

//function to display the post on the page
function displayPost(post) {
  const post_list = document.getElementById("post-list");
  const li = document.createElement("li");
  li.id = `post-${post._id}`;
  li.innerHTML =
    `
  ${post.content}
  <small>posted by ${post.user.name}</small>

  <a class="post-delete-button" id="${post._id}" href="/post/delete/${post._id}">X</a>

  <!-- for adding comments -->

  <form method="post" class="comment-add-form" id="comment-add-form-${post._id}" action="/comment/create">
    <input type="text" name="content" placeholder="comment here" required />
    <input type="hidden" name="post_id" value="${post._id}" />
    <input type="submit" value="add comment" />
  </form>

   <div class="comments-container">
    <ul id= "postId-comment-${post._id}">
     </ul>
   </div>

  ` ;

  post_list.prepend(li);
  commentCreateEvent(document.getElementById(`comment-add-form-${post._id}`));
}

// function to delete post
function deletePost(id) {
  fetch(`/post/delete/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((id) => {
      const post_element = document.getElementById("post-" + id);
      post_element.remove();
      showNotification("Post deleted successfully", "success");
    })
    .catch((error) => {
      showNotification("Error deleting post", "error");
      console.error("Error deleting post:", error);
    });
}

// function to add the comment
function addComment(e) {

  e.preventDefault();
      
  const content = e.target.content.value;
  const post_id = e.target.post_id.value;
  e.target.content.value = "";

  fetch("comment/create", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ content, post_id }),
  })
    .then((res) => res.json())
    .then((comment) => {
      //get the comments container and append the the newly created comment
      const commentContainer = document.getElementById("postId-comment-" + comment.post);
      const li = document.createElement("li");
      li.id = "comment-list-" + comment._id;
      
      li.innerHTML = `
      <li id="comment-list-${comment._id}">
      <span>${comment.content}
      by ${comment.user.name}
         <a href="/comment/delete/${comment._id} " class="comment-delete-button" id="${comment._id}">X</a>
     </span>
     </li>
      ` ;
      commentContainer.prepend(li);
      commentDeleteEvent(document.getElementById(comment._id));
      console.log("comment added successfully")
      showNotification("Comment added successfully", "success");
    })
    .catch((err) => {
      showNotification("Error adding comment", "error");
      console.log(err);
    });
}
// function to delete the comment
function deleteComment(id) {
  fetch(`/comment/delete/${id}`, {
    method: "post",
  })
    .then((res) => res.json())
    .then((id) => {
      const comment = document.getElementById("comment-list-" + id);
      comment.remove();
      showNotification("Comment deleted successfully", "success");
    })
    .catch((err) => {
      showNotification("Error deleting comment", "error");
      console.log(err);
    });
}

// to show notification on the top right corner without reload
function showNotification(message, type) {
  new Noty({
    theme: "relax",
    text: message,
    type: type,
    layout: "topRight",
    timeout: 1500, // Display time in milliseconds
  }).show();
}

// function for event listener to creating post
function postCreateEvent(form){
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addPost(e);
  });
  
}
// function for event listener to delete post
function postDeleteEvent(deleteButton) {
  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    deletePost(e.target.id);
  });
}
// function for event listener to create comment
function commentCreateEvent(addCommentForm) {
  addCommentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    addComment(e);
  });
}
// function for event listener to delete post
function commentDeleteEvent(deleteButton) {
  deleteButton.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.id;
    deleteComment(id);
  });
}

renderEvents();


})();