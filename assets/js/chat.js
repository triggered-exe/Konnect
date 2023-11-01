document.addEventListener("click", (event)=>{
    
    const target = event.target;
    
    
    if(target.classList.contains("toggleChat") || target.classList.contains("toggle-chat")){
        
       let visibility = document.getElementById("chatbox").style.display;
       console.log(visibility)
        if(visibility === "none"){
            document.getElementById("chatbox").style.display = "block";
        }else{
            document.getElementById("chatbox").style.display = "none";
        }
    }
})