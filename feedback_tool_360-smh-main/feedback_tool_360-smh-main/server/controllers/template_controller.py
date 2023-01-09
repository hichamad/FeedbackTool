from flask_restful import Resource
from flask import jsonify, request
from main import mongo

# Controller for creating an Template
class create_template(Resource):
    def post(self):
        collection_name = mongo.db.template
        templateid = request.json['templateid']
        username = request.json['surveyadminusername'] 
        templatename = request.json["templatename"]
        questionlist = request.json["templatequestionlist"]
        collection_name.insert_one({
            "templateid" : templateid,
            "surveyadminusername" : username,
            "templatename" : templatename,
            "templatequestionlist" : questionlist
            })
        return jsonify({'message' : 'Template created'})

# Controller for getting all templates an admin has made
class get_templates_admin(Resource):
    def post(self):
        print("TESSSSSSSTTTTTTTTTTTTT")
        collection_name = mongo.db.template
        adminusername = request.json["adminusername"]
        templates = collection_name.find({"surveyadminusername" : adminusername})
        print("TESSSSSSSTTTTTTTTTTTTT")
        return jsonify({
            "templates" : [
                {
                    "templateid" : template["templateid"],
                    "surveyadminusername" : template["surveyadminusername"],
                    "templatename" : template["templatename"],
                    "templatequestionlist" : template["templatequestionlist"],
                } for template in templates
            ]
        })
        
# Controller for getting a single template
class get_template(Resource):
    def post(self):
        collection_name = mongo.db.template
        templatename = request.json["templatename"]
        template = collection_name.find_one({"templatename" : templatename})
        if template:
            return jsonify({
                    "templateid" : template["templateid"],
                    "surveyadminusername" : template["surveyadminusername"],
                    "templatename" : template["templatename"],
                    "templatequestionlist" : template["templatequestionlist"],

            })
        else:
            return jsonify({"Error": "No template found"})