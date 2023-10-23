import sqlite3

# Connect to the SQLite database (or create it if it doesn't exhist)
conn = sqlite3.connect('movie_database.db')
cursor = conn.cursor()

# Create the 'movies' table with the desired schema
cursor.execute('''
    CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY,
        tmdb_id INTEGER,
        title TEXT,
        release_date TEXT,
        overview TEXT,
        poster_url TEXT
    )
''')

# Commit changes and close the connection
conn.commit()
conn.close()
