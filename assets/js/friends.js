


document.addEventListener("click", function (event) {
   
    const friendButton  = document.getElementById("friend-button");
    if(event.target === friendButton){
    
    const action = friendButton.getAttribute("data-action");
    const friendId = friendButton.getAttribute("data-id");

    // console.log(action, friendId)

    fetch(`/friends/${action}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId }),
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            if(action === "add-friend") {
                if(data.data.isCreated){
                    const friendStatusText  = document.getElementById("friend-status-text");
                    // friendStatusText.innerText = "Friend Added";
                    friendButton.innerText = "Remove Friend";
                    friendButton.setAttribute("data-action", "remove-friend");
                }
                
            }else{
                if (data.data.isDeleted) {
                    const friendStatusText  = document.getElementById("friend-status-text");
                    // friendStatusText.innerText = "Friend Removed";
                    friendButton.innerText = "Add Friend";
                    friendButton.setAttribute("data-action", "add-friend");
                }
            }
            
        })
        .catch((error) => {
            console.log(error);
        });
    }

    })

