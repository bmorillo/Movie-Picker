from flask import Flask, request, jsonify
import database  # Import your database module

app = Flask(__name__)

@app.route('/insert_movie_details', methods=['POST'])
def insert_movie_details():
    data = request.get_json()  # Assuming the data is sent as JSON
    tmdb_id = data.get('tmdb_id')
    title = data.get('title')
    release_date = data.get('release_date')
    overview = data.get('overview')
    poster_url = data.get('poster_url')

    # Insert movie details into the database
    database.insert_movie_data(tmdb_id, title, release_date, overview, poster_url)

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run()