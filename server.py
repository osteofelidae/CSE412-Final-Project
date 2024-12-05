from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='./cse412-final-project/dist', static_url_path='')

# Route to serve the main React page
@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)