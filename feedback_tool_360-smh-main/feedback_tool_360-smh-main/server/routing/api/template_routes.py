from main import api
from controllers.template_controller import create_template, get_templates_admin, get_template

# Route for creating a template
api.add_resource(
    create_template,
    '/api/v1/template/create',
    methods=["POST"]
)

# Route for getting all templates
api.add_resource(
    get_templates_admin,
    '/api/v1/template/gettemplates',
    methods=["POST"]
)

# Route for getting a single template
api.add_resource(
    get_template,
    '/api/v1/template/gettemplate',
    methods=["POST"]
)
