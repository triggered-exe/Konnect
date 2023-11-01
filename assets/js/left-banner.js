document.addEventListener('click', function(event) {
    let target = event.target;

    if(target.id === "show-friendsList"){

        const userId = target.dataset.id;

        fetch(`/friends/show-friendlist/${userId}`)
        .then(res => res.json())
        .then(friendList => {
            let rightBanner = document.getElementById("right-banner");
            rightBanner.innerHTML = `<div class="friend-div"> <span>Friends</span> </div>`;

            console.log(friendList)

            friendList.forEach(friend => {
                console.log(friend.avatar)
                let friendDiv = `
                    <div class="friend-div">
                        ${(!friend.avatar) 
                            ? `<img src="/uploads/users/avatars/default-profile.jpg" alt="User Profile" class="circular-profile-pic" />`
                            : friend.avatar.startsWith('https')
                            ? `<img src="${friend.avatar}" alt="User Profile" class="circular-profile-pic" />`
                            : `<img src="/${friend.avatar}" alt="User Profile" class="circular-profile-pic" />`
                        }

                        <a href="/users/profile/${friend._id}">${friend.name}</a>   
                    </div>
                `
                rightBanner.innerHTML += friendDiv;
                
            });
            
        });

    }
})