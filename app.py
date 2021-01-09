from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__,
            template_folder='templates',
            static_folder='static',
            static_url_path='/static/')

socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connected')
def connection(message):
    return {'data': 'Connected!'}


@socketio.on('client_message')
def receive_message(message):   
    socketio.emit('server_response', message, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)

