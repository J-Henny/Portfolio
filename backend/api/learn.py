import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

def learn(username):
    top_filename = f'Spotify_base_data_{username}.txt'
    scrape_filename = f'Spotify_scraped_data_{username}.txt'
    user_top_songs_original = pd.read_csv(top_filename)
    larger_dataset_original = pd.read_csv(scrape_filename)
    # Drop unnecessary columns
    user_top_songs = user_top_songs_original.drop(columns=['id', 'artist_name(s)', 'song_name', 'popularity', 'explicit?'])
    larger_dataset = larger_dataset_original.drop(columns=['id', 'artist_name(s)', 'song_name', 'popularity', 'explicit?'])

    # Normalize data using Min-Max scaling
    scaler = MinMaxScaler()
    user_top_songs_scaled = scaler.fit_transform(user_top_songs)
    larger_dataset_scaled = scaler.transform(larger_dataset)

    X_train, X_val = train_test_split(user_top_songs_scaled, test_size=0.2, random_state=42)
    model = Sequential([
        Dense(64, activation='relu', input_shape=(user_top_songs_scaled.shape[1],)),
        Dense(32, activation='relu'),
        Dense(16, activation='relu'),
        Dense(larger_dataset_scaled.shape[1], activation='linear')
    ])

    model.compile(optimizer='adam', loss='mse')

    # Train the model
    model.fit(X_train, X_train, epochs=50, batch_size=32, validation_data=(X_val, X_val))
    predicted_features = model.predict(larger_dataset_scaled)

    # Calculate the Euclidean distance between predicted and actual features
    distances = np.linalg.norm(larger_dataset_scaled - predicted_features, axis=1)

    # Get the indices of recommended songs based on minimum distance
    recommended_song_indices = distances.argsort()[:75]  # Change 10 to the number of songs you want to recommend
    # Extract recommended songs from the larger dataset
    recommended_songs = larger_dataset_original.iloc[recommended_song_indices]
    ids = recommended_songs['id']
    return ids.values