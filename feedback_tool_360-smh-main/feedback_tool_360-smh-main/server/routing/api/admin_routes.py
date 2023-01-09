from main import api
from controllers.admin_controller import register_admin, login_admin

# Route for Admin Registration
api.add_resource(
    register_admin,
    '/api/v1/admin/register',
    methods=["POST"]
)

# Route for Admin Login
api.add_resource(
    login_admin,
    '/api/v1/admin/login',
    methods=["POST"]
)

