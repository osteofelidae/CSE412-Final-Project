--artist table
CREATE TABLE Artist ( artist_id INT, Name varchar(255), ListenersCount INT, PeakListeners INT );

copy Artist from '$PROJECTPATH/data/spotify-top-artists-by-monthly-listeners/Artist.csv' delimiter ',' csv header;

-- song table
CREATE TABLE Song (song_id INT, Name varchar(255), Genre varchar(255), Explicit varchar(255) );

copy Song from '$PROJECTPATH/data/spotify-tracks-dataset/Song.csv' delimiter ',' csv header;

--youtubevideo table
CREATE TABLE YouTubeVideo ( video_id INT, song_id INT, ChannelName varchar(255), SongName varchar(255), ViewCount FLOAT,URL varchar(255), LikeCount FLOAT );

copy YouTubeVideo from '$PROJECTPATH/data/spotify-and-youtube/YoutubeVideo.csv' delimiter ',' csv header;

-- creates table
CREATE TABLE Creates ( artist_id INT, song_id INT );

copy Creates from '/$PROJECTPATH/data/spotify-tracks-dataset/Creates.csv' delimiter ',' csv header;
