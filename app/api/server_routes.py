from flask import Blueprint
from flask_login import current_user, login_required
from app.models import Server

server_routes = Blueprint("servers", __name__)

# Get all servers a user joined
@server_routes.route("/")
@login_required
def get_all_servers():
    servers = Server.query.all()
    data = [server.to_dict() for server in servers]
    
    return {"servers": data}