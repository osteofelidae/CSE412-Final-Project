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