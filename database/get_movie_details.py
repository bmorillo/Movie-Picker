# Server-side script that receives the movie ID as a parameter, queries the database, and returns the movie details as JSON using Flask
from flask import Flask, request, jsonify
import database  # Import your database module

app = Flask(__name__)

@app.route('/get_movie_details', methods=['GET'])
def get_movie_details():
    movie_id = request.args.get('movie_id')
    movie_data = database.get_movie_data(movie_id)
    if movie_data:
        return jsonify({'success': True, 'data': movie_data})
    else:
        return jsonify({'success': False, 'message': 'Movie not found'})

if __name__ == '__main__':
    app.run()