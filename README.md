# TODO TITLE

## Project Usage
### Setup
One-time setup:
```bash
cd /path/to/project/root  # cd to project root
python3 -m venv .venv  # Create venv
source .venv/bin/activate  # Activate venv
which python  # Should return the venv python executable
pip install -r requirements.txt  # Install requirements
./tasks/setup_db.sh  # Setup db structure
```

### Pre-run
Run the following command on a new terminal before running any files:
```bash
source tasks/setup.sh  # Set some envs
./tasks/start_db.sh  # Start db
```

## RUNNING THE THING
```bash
python3 server.py
```

### Running files
Obviously, running files are done like so:
```bash
python3 /path/to/file.py
```
**Only** run files in the root directory (`CSE412-Final-Project`), otherwise imports will probably not work correctly.

### Cleanup
After you are done, run these:
```bash
./tasks/stop_db.sh  # Stop db
```

## Web App Usage
### Setup
```bash
cd cse412-final-project
npm install
```
This should move you into the web app directory and install dependency packages. If there are any additional prompts I forgot, follow them.

### Run Dev
```bash
npm run dev
```
Run the web app from the CLI, then click on the localhost link and open it in your web browser.

## API endpoints
* `/api/artists/list`: Gets names and ids of all artists
```json
{
    "data": [
        {
            "artist_id": 1229,
            "name": "Alice In Chains"
        },
        {
            "artist_id": 461,
            "name": "Amy Winehouse"
        }
    ]
}
```
* `/api/artists/stats`: Gets stats of top song for each artists
```json
{
    "data": [
        {
            "listeners_count": 5200736,
            "views_count": 5200736
        },
        {
            "listeners_count": 5836676,
            "views_count": 5836676
        }
    ]
}
```
* `/api/artists/stats?artist_id=$ARTIST_ID`: Gets stats of top song for a specific artist
```json
{
    "data": [
        {
            "listeners_count": 5200736,
            "views_count": 5200736
        },
        {
            "listeners_count": 5836676,
            "views_count": 5836676
        }
    ]
}
```
* `/api/artists?artist_id=$ARTIST_ID`: Gets stats of top song for a specific artist
```json
{
    "data": {
	    "genre": "indie-pop",
	    "like_count": 188760.0,
	    "listeners_count": 6683006,
	    "name": "Cavetown",
	    "view_count": 14167793.0,
	    "youtube_title": "Meteor Shower",
	    "youtube_url": "https://www.youtube.com/watch?v=vxG1HlT8n-I"
	}
}
```