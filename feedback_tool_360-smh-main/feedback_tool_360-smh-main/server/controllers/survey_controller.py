from flask_restful import Resource
from flask import jsonify, request
from main import mongo

# Controller for creating an Survey
class create_survey(Resource):
    def post(self):
        collection_name = mongo.db.survey
        surveyaccessid = request.json['surveyaccessid']
        surveyactive = request.json['surveyactive']
        userrequired = request.json['userrequired']
        surveymaximumresponsesenabled = request.json['surveymaximumresponsesenabled']
        surveymaximumresponses = request.json['surveymaximumresponses']
        username = request.json['surveyadminusername'] 
        subject = request.json["surveysubject"]
        qlist = request.json["surveyquestionlist"]
        surveytemplate = request.json["surveytemplate"]

        collection_name.insert_one({
            "surveyaccessid" : surveyaccessid,
            "surveyactive" : surveyactive,
            "surveyadminusername" : username,
            "userrequired": userrequired,
            "surveymaximumresponsesenabled": surveymaximumresponsesenabled,
            "surveymaximumresponses": surveymaximumresponses,
            "surveysubject" : subject,
            "surveytemplate" : surveytemplate,
            "surveyquestionlist" : qlist,
            "answers" : []
            })
        return jsonify({'message' : 'Survey created'})

# Controller for getting a single survey
class get_survey(Resource):
    def post(self):
        collection_name = mongo.db.survey
        surveyaccessid = request.json["surveyaccessid"]
        survey = collection_name.find_one({"surveyaccessid" : surveyaccessid})
        if survey:
            return jsonify({
                "surveyaccessid" : survey["surveyaccessid"],
                "surveyactive" : survey["surveyactive"],
                "userrequired" : survey["userrequired"],
                "surveymaximumresponsesenabled": survey["surveymaximumresponsesenabled"],
                "surveymaximumresponses": survey["surveymaximumresponses"],
                "surveyadminusername" : survey["surveyadminusername"],
                "surveysubject" : survey["surveysubject"],
                "surveytemplate" : survey["surveytemplate"],
                "surveyquestionlist" : survey["surveyquestionlist"],
                "answers" : survey["answers"]

            })
        else:
            return jsonify({"Error": "No survey found"})

# Controller setting an answer to an survey
class set_answers_survey(Resource):
    def post(self):
        surveyaccessid = request.json["surveyaccessid"]
        collection_name = mongo.db.survey
        answers = request.json["answers"]
        collection_name.update_one({"surveyaccessid":surveyaccessid},{'$push': { 'answers' : answers }})

# Controller for getting all answers that a survey got
class get_answers_survey(Resource):
    def post(self):
        surveyaccessid = request.json["surveyaccessid"]
        collection_name = mongo.db.survey
        survey = collection_name.find_one({"surveyaccessid" : surveyaccessid})
        return jsonify({
            "surveyaccessid" : survey["surveyaccessid"],
            "surveyactive" : survey["surveyactive"],
            "userrequired" : survey["userrequired"],
            "surveyadminusername" : survey["surveyadminusername"],
            "surveysubject" : survey["surveysubject"],
            "surveyquestionlist" : survey["surveyquestionlist"],
            "answers" : survey["answers"]

        })

# Controller for getting all surveys an Admin has made
class get_surveys_admin(Resource):
    def post(self):
        collection_name = mongo.db.survey
        admin = request.json["adminusername"]
        surveys = collection_name.find({"surveyadminusername" : admin})
        return jsonify({
            "surveys" : [
                {
                    "surveyaccessid" : survey["surveyaccessid"],
                    "surveyactive" : survey["surveyactive"],
                    "userrequired" : survey["userrequired"],
                    "surveyadminusername" : survey["surveyadminusername"],
                    "surveysubject" : survey["surveysubject"],
                    "surveytemplate" : survey["surveytemplate"],
                    "surveyquestionlist" : survey["surveyquestionlist"],
                    "answers" : survey["answers"]
                } for survey in surveys
            ]
        })

# Controller for updating an survey
class update_survey(Resource):
    def post(self):
        collection_name = mongo.db.survey
        surveyaccessid = request.json["surveyaccessid"]
        surveyactive = request.json['surveyactive']
        userrequired = request.json["userrequired"]
        surveymaximumresponsesenabled = request.json['surveymaximumresponsesenabled']
        surveymaximumresponses = request.json['surveymaximumresponses']
        subject = request.json["surveysubject"]
        surveytemplate = request.json["surveytemplate"]
        qlist = request.json["surveyquestionlist"]
        collection_name.update_one({"surveyaccessid":surveyaccessid},{'$set': { "surveysubject" : subject, "surveytemplate" : surveytemplate, "surveyactive": surveyactive, "userrequired" : userrequired, "surveymaximumresponsesenabled" : surveymaximumresponsesenabled, "surveymaximumresponses" : surveymaximumresponses, "surveyquestionlist" : qlist }})

# Controller for deleting an survey
class delete_survey_admin(Resource):
    def post(self):
        collection_name = mongo.db.survey
        surveyaccessid = request.json["surveyaccessid"]
        collection_name.delete_one({"surveyaccessid" : surveyaccessid})

        