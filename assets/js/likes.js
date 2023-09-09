document.addEventListener('click', function(event) {
    let target = event.target;
    if(event.target.className === "likes-toggle"){
        event.preventDefault();
        console.log("clicked like button");
        let id = target.dataset.id;
        let type = target.dataset.type;
        console.log(id, type);
        fetch('/likes/toggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, type})
        })
        .then(res => res.json())
        .then((data)=>{
            console.log(data.data)
            target.innerText = `Likes: ${data.data.likesCount}`;
        })
        .catch(err => console.log(err))
    }
})