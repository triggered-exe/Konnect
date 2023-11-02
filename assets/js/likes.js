document.addEventListener('click', function(event) {
    let target = event.target;

    if(target.closest(".likes-toggle")){
        let anchor = target.closest(".likes-toggle");

        let id = anchor.dataset.id;
        let type = anchor.dataset.type;
        
        fetch('/likes/toggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, type})
        })
        .then(res => res.json())
        .then((data)=>{
            anchor.innerHTML = `<img  src="https://img.icons8.com/ios/50/like--v1.png" alt="like" data-id=${id} data-type="Post"/>
             ${data.data.likesCount}`;
            // target.innerText = `Likes: ${data.data.likesCount}`;
        })
        .catch(err => console.log(err))
    }
})

document.addEventListener("DOMContentLoaded", () => {
    // Add event listener to all toggle-comment-button elements
    document.querySelectorAll(".toggle-comment-button").forEach((button) => {
      button.addEventListener("click", toggleComments);
    });
  });
