from flask_restful import Resource
from flask import jsonify, request
from main import mongo, bcrypt

# Controller for Admin Registration
class register_admin(Resource):
    def post(self):
        collection_name = mongo.db.admin
        username = request.json["username"]
        email = request.json["email"]
        password = request.json["password"]
        admin = collection_name.find_one({"adminemail" : email})
        adminusername = collection_name.find_one({"adminusername" : username})

        if admin or adminusername:
            return jsonify({'message' : 'Admin already exists'})

        password_hashed = bcrypt.generate_password_hash(password)
        collection_name.insert_one({
            "adminusername" : username,
            "adminemail" : email,
            "adminpassword" : password_hashed,
        })
        
# Controller for Admin Login
class login_admin(Resource):
    def post(self):
        collection_name = mongo.db.admin
        email = request.json["adminemail"]
        password = request.json["adminpassword"]
        admin = collection_name.find_one({"adminemail" : email}) 

        if not admin:
            return jsonify({'message' : 'Email does not exist'})

        if not bcrypt.check_password_hash(admin["adminpassword"], password):
            return jsonify({'message' : 'Invalid credentials'})

        if admin:
            return(jsonify({
                "adminusername" : admin["adminusername"],
                "adminemail" : admin["adminemail"],
                "adminpassword" : str(admin["adminpassword"]),
            }))

# Method still in progress
# class delete_answer_admin(Resource):
#     def post(self):
#         collection_name = mongo.db.survey
#         surveyaccessid = request.json["surveyaccessid"]
#         collection_name.update_one({"surveyaccessid":surveyaccessid},{'$pull': { 'answers' : {'answerid': request.json["answerid"]}}})

