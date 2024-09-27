# TODO TITLE

## Usage
### Setup
One-time setup:
```bash
cd /path/to/project/root
python3 -m venv .venv
source .venv/bin/activate
which python  # Should return the venv python executable
pip install -r requirements.txt
```

### Pre-run
Run the following command on a new terminal before running any files:
```bash
source tasks/setup.sh
```
This will activate the venv in `.venv` and set `$PYTHONPATH` so imports work properly.

### Running files
Obviously, running files are done like so:
```bash
python3 /path/to/file.py
```
**Only** run files in the root directory (`CSE412-Final-Project`), otherwise imports will probably not work correctly.
