from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt


# Configuration file for Flask & MongoDB

app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)

# MongoDB connectionstring
app.config["MONGO_URI"] = "mongodb+srv://feedbacktooladmin:YMCq3bT76R66cJ2MT2sz@feedbacktool.zx3az.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)

# Enabling CORS
cors_survey_api = CORS(
    app,
    resources={r"/api/v1/survey/create/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/survey/get/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/survey/setanswers/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/survey/getanswers/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/admin/login/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/admin/register/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/admin/getsurveys/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/survey/deletesurvey/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/survey/update/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/template/create/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"c/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

cors_survey_api = CORS(
    app,
    resources={r"/api/v1/template/gettemplate/*": {
        "origins": "*"
    }},
    methods=["GET", "POST", "DELETE", "PATCH"],
)

# Importing all of the routes for Flask & MongoDB
from routing.api import admin_routes
from routing.api import survey_routes
from routing.api import template_routes