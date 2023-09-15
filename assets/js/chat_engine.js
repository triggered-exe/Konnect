class ChatEngine{
    constructor(chatBoxId, userEmail, serverURL){
        this.chatBox = chatBoxId;
        this.userEmail = userEmail;
       //  for local aws 
        // this.socket = io.connect('http://konncect-env.eba-bgy9kheh.ap-south-1.elasticbeanstalk.com:5000');
       // for  localhost
        this.socket = io.connect(serverURL || 'http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
        });

        self.socket.emit("join_room",{
            user_email : self.userEmail,
            chatroom : "Konnect"
        })

        self.socket.on('user_joined', function(data){
            console.log('a user joined!', data);
        })

            chatBoxId.addEventListener('click', function(e){
            e.preventDefault();
            let msg = document.getElementById('messageInput').value;

            if (msg != ''){
                self.socket.emit('send_message', {
                    message : msg,
                    user_email : self.userEmail,
                    chatroom : "Konnect"
                })
            }
        
        })


        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);

            let newMessage = document.createElement('li');

            let messageType = 'received-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.classList.add(messageType);
            newMessage.innerHTML = '<span class="message-content">' + data.message + '</span>'
                                    +`<br>`+ '<sub>' + data.user_email + '</sub>';
            let messageList = document.getElementById('message-list');
            messageList.appendChild(newMessage);
        
        })


    }
}