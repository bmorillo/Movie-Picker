import sqlite3
# Database interaction file

def insert_movie_data(tmdb_id, title, release_date, overview, poster_url):
    conn = sqlite3.connect('movie_database.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO movies (tmdb_id, title, release_date, overview, poster_url) VALUES (?, ?, ?, ?, ?)",
                   (tmdb_id, title, release_date, overview, poster_url))
    conn.commit()
    conn.close()

def get_movie_data(tmdb_id):
    conn = sqlite3.connect('movie_database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT title, release_date, overview, poster_url FROM movies WHERE tmdb_id = ?", (tmdb_id,))
    movie_data = cursor.fetchone()
    conn.close()
    return movie_data