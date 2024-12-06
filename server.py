from flask import Flask, send_from_directory, jsonify, request

app = Flask(__name__, static_folder="./cse412-final-project/dist", static_url_path="")

# Route to serve the main React page
@app.route("/")
def serve_react_app():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/artists/list", methods=["POST"])
def get_all_artists():
    headers = request.args
    return jsonify(dict(headers))

@app.route("/api/artists/all", methods=["POST"])
def get_all_artist_stats():
    headers = request.args
    return

@app.route("/api/artists", methods=["POST"])
def get_artist():
    headers = request.args
    return

if __name__ == '__main__':
    app.run(debug=True)