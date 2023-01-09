# Feedbacktool Dyflexis

## Features Application:
- Create Surveys with open and rating questions
- Customize your question with the required attribute or change the order the questions are in
- Create Templates with predefined questions
- Manage your surveys on your Admin Dashboard
- Update existing Surveys
- Surveys can be answered anonymously or a user needs to give there credentials
- See all of the answers that the Survey got
- Export the answers in JSON, PDF or Excel

## Techstack used:

### Front End:

- React (Web)
- Vite

### Libraries Front End:

- TailwindCSS
- Axios
- html2pdf.js
- Material UI
- export-from-json
- React-beautiful-dnd

### Back end:

- Flask
- MongoDB

## Setup

### Setup Backend

To startup the backend of the application we need to use the following commands:

- Setup the Enviroment: ```python -m venv Environment```
- Activate the Environment: ```env\Scripts\activate.bat```
- Install the Required packages: ```cd server -> python install -r requirements.txt```
- Set the flask startup file: ```set FLASK_APP=main.py```
- Start the flask server: ```flask run```

### Setup Frontend

To startup the frontend of the application we need to use the following commands:

- Navigate to the client folder: ```cd client```
- Install NPM packages: ```npm install```
- Start the application: ```npm run dev```

### Setup testdata

To startup the application with some testdata execute the following script:

- In the server directory you can find the "testdatascript.py". Execute this script with:
```python testdatascript.py```
- After executing the script you can login on the application with the following credentials:
  - Admin Email: demo@gebruiker.nl
  - Admin Password: demo123


If any problems occur, feel free to message me on Discord!