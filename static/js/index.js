
const socket = io();

socket.on ('connect', () => {
    socket.emit('connected',{'username': document.getElementById('input-username').value}, (data) => {
        
    });
});

socket.on('server_response', (message) => {

    console.log(`user: ${message.username} | message: ${message.user_message}`)

    if( $('div#message-list-container').children().length > 10){
        $('div#message-list-container').children().first().remove()
    }

    $('div#message-list-container').append(
        `<div class="message-container">
            <h3 class="username">
                ${message.username}
            </h3>
            <p class="user-message">
                ${message.user_message}
            </p>
        </div>`
    );

    $('div#message-list-container').scrollTop( $('div#message-list-container').height());

})

function sendMessage(){
    let user_name = $('input#input-username').val();
    let user_message = $('input#input-user-message').val();
    
    if (user_name && user_message !== 'undefined'){
        socket.emit('client_message', {
        'username': user_name,
        'user_message': user_message
        });
        $('input#input-user-message').val('').focus();
    }
    
}
