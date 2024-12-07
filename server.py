from flask import Flask, send_from_directory, jsonify, request, make_response
from flask_cors import CORS
import psycopg2

app = Flask(__name__, static_folder="./cse412-final-project/dist", static_url_path="")
CORS(app)

username = "egg"

conn = psycopg2.connect(f"dbname=CSE412 user={username}")
cur = conn.cursor()

# Route to serve the main React page
@app.route("/")
def serve_react_app():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/artists/list", methods=["POST"])
def get_all_artists():
    cur.execute("SELECT DISTINCT Name, artist_id FROM (SELECT artist.artist_id, artist.Name, artist.ListenersCount FROM Artist, Creates, Song, YouTubeVideo WHERE Artist.artist_id=Creates.artist_id AND Creates.song_id=Song.song_id AND Song.song_id=YouTubeVideo.song_id ORDER BY ListenersCount DESC);")
    results = cur.fetchall()
    results = [{"name": item[0], "artist_id": item[1]} for item in results]

    response = make_response(jsonify({"data": results}))
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    return response

@app.route("/api/artists/stats", methods=["POST"])
def get_all_artist_stats():
    headers = request.args

    if dict(headers).get("artist_id"):
        cur.execute("""SELECT youtubevideo.SongName, youtubevideo.viewcount, youtubevideo.likecount
        FROM Artist JOIN Creates ON Artist.artist_id = Creates.artist_id
        JOIN Song ON Song.song_id = Creates.song_id
        JOIN YoutubeVideo ON Song.song_id = YoutubeVideo.song_id
        WHERE Artist.name = %(ARTIST_ID)s;
""", {"ARTIST_ID": headers["artist_id"]})
        results = cur.fetchall()
        results = [{"likes_count": item[2], "views_count": item[1]} for item in results]

        return jsonify({"data": results})
    else:
        cur.execute("""SELECT DISTINCT Artist.ListenersCount, youtubevideo.viewcount
FROM Artist JOIN Creates ON Artist.artist_id = Creates.artist_id
JOIN Song ON Song.song_id = Creates.song_id
JOIN YoutubeVideo ON Song.song_id = YoutubeVideo.song_id
WHERE youtubevideo.viewcount = (SELECT MAX(vid.viewcount) FROM YoutubeVideo vid
    JOIN Song s ON vid.song_id = s.song_id JOIN Creates c
    ON s.song_id = c.song_id WHERE c.artist_id = Artist.artist_id);

""")
        results = cur.fetchall()
        results = [{"listeners_count": item[0], "views_count": item[0]} for item in results]

        return jsonify({"data": results})

@app.route("/api/artists", methods=["POST"])
def get_artist():
    headers = request.args
    cur.execute("""SELECT Artist.Name, Artist.ListenersCount, Song.Genre, youtubevideo.SongName, youtubevideo.viewcount, youtubevideo.likecount, youtubevideo.url
FROM Artist, Song, Creates, YoutubeVideo
WHERE Artist.artist_id = Creates.artist_id AND Song.song_id = Creates.song_id AND Song.song_id = YoutubeVideo.song_id AND Artist.name=%(ARTIST_ID)s
ORDER BY YoutubeVideo.likecount LIMIT 1;
""", {"ARTIST_ID": headers["artist_id"]})
    results = cur.fetchall()
    print(results)
    return jsonify({"data": {
        "name": results[0][0],
        "listeners_count": results[0][1],
        "genre": results[0][2],
        "youtube_title": results[0][3],
        "view_count": results[0][4],
        "like_count": results[0][5],
        "youtube_url": results[0][6],
        }})

@app.route("/api/artists", methods=["POST"])
def kasdaskjh():
    return

if __name__ == '__main__':
    app.run(debug=True)
