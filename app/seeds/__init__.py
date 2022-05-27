from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .chats import seed_chats, undo_chats
from .join_servers_users import seed_join_servers_users, undo_join_servers_users
from .private_channels import seed_private_channels, undo_private_channels
from .private_chats import seed_private_chats, undo_private_chats

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_servers()
    seed_channels()
    seed_chats()
    seed_join_servers_users()
    seed_private_channels()
    seed_private_chats()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_servers()
    undo_channels()
    undo_chats()
    undo_join_servers_users()
    undo_private_channels()
    undo_private_chats()
    # Add other undo functions here
