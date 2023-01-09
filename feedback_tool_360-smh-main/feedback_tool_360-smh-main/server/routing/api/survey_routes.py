from main import api
from controllers.survey_controller import create_survey, get_survey, set_answers_survey, get_answers_survey, delete_survey_admin, update_survey, get_surveys_admin

# Route for creating a survey
api.add_resource(
    create_survey,
    '/api/v1/survey/create',
    methods=["POST"]
)

# Route for getting a single survey
api.add_resource(
    get_survey,
    '/api/v1/survey/get',
    methods=["POST", "GET"]
)

# Route for setting an answers to a survey
api.add_resource(
    set_answers_survey,
    '/api/v1/survey/setanswers',
    methods=["POST"]
)

# Route for getting all answers on a suryvey
api.add_resource(
    get_answers_survey,
    '/api/v1/survey/getanswers',
    methods=["POST"]
)

# Route for deleting a survey
api.add_resource(
    delete_survey_admin,
    '/api/v1/survey/deletesurvey',
    methods=["POST"]
)

# Route for updating a survey
api.add_resource(
    update_survey,
    '/api/v1/survey/update',
    methods=["POST"]
)

# Route for getting all surveys
api.add_resource(
    get_surveys_admin,
    '/api/v1/admin/getsurveys',
    methods=["POST"]
)