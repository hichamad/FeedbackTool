from main import mongo, bcrypt

# Execute this script to create a Admin account , 2 Survey's and 1 template
# After this script you can login on the site with these credentials:

# Admin email: demo@gebruiker.nl
# Admin password: demo123

collection_name = mongo.db.admin
password_hashed = bcrypt.generate_password_hash("demo123")
collection_name.insert_one({
    "adminusername" : "Demo Gebruiker",
    "adminemail" : "demo@gebruiker.nl",
    "adminpassword" : password_hashed,
})


collection_name = mongo.db.template
collection_name.insert_one({
    "templateid" : "473d87d9-c7a3-48c7-a53d-c48e0adebb60",
    "surveyadminusername" : "Demo Gebruiker",
    "templatename" : "Sprint feedback",
    "templatequestionlist" : '[{"id":"e13abf77-6fd1-4e84-b53f-05ece8d526bd","questiontype":"Open vraag","question":"Hoe ging de sprint?","required":true,"useremail":"","usercompletename":"Niet bekend","answer":""},{"id":"87afbc91-74ce-440b-9ce4-873ed5292d97","questiontype":"Open vraag","question":"Wat kan er beter tijdens de sprint?","required":true,"useremail":"","usercompletename":"Niet bekend","answer":""},{"id":"0e57fbec-ae22-4e72-9653-ff934f2b4490","questiontype":"Rating vraag","question":"Eindbeoordeling Sprint","useremail":"","usercompletename":"Niet bekend","answer":""}]'
    })

collection_name = mongo.db.survey
collection_name.insert_many([{
    "surveyaccessid" : "312c01c1-25b5-479d-829f-eb855e83974f",
    "surveyactive" : True,
    "surveyadminusername" : "Demo Gebruiker",
    "userrequired": True,
    "surveymaximumresponsesenabled": False,
    "surveymaximumresponses": 0,
    "surveysubject" : "Het weer",
    "surveytemplate" : "",
    "surveyquestionlist" : '[{"id":"0ea3b35a-8a75-42d1-969b-b345b520cc7b","questiontype":"Open vraag","question":"Wat is het weer vandaag?","required":true,"useremail":"","usercompletename":"Niet bekend","answer":""},{"id":"d798618a-3521-4782-9d68-a2db3a380ce1","questiontype":"Rating vraag","question":"Wat voor cijfer geef je het weer?","useremail":"","usercompletename":"Niet bekend","answer":""}]',
    "answers" : []
    },
    {"surveyaccessid" : "8c306339-0ee3-455c-8dec-3850f3d9f638",
    "surveyactive" : True,
    "surveyadminusername" : "Demo Gebruiker",
    "userrequired": True,
    "surveymaximumresponsesenabled": False,
    "surveymaximumresponses": 0,
    "surveysubject" : "Sprint Improvement",
    "surveytemplate" : "Sprint feedback",
    "surveyquestionlist" : '[{"id":"e13abf77-6fd1-4e84-b53f-05ece8d526bd","questiontype":"Open vraag","question":"Hoe ging de sprint?","required":true,"useremail":"","usercompletename":"Niet bekend","answer":""},{"id":"87afbc91-74ce-440b-9ce4-873ed5292d97","questiontype":"Open vraag","question":"Wat kan er beter tijdens de sprint?","required":true,"useremail":"","usercompletename":"Niet bekend","answer":""},{"id":"0e57fbec-ae22-4e72-9653-ff934f2b4490","questiontype":"Rating vraag","question":"Eindbeoordeling Sprint","useremail":"","usercompletename":"Niet bekend","answer":""}]',
    "answers" : []
    }
    ])

print("Script executed successfully")

