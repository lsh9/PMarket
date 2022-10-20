from flask import Blueprint
from app.models import User
from app.models import db

my_bp = Blueprint("my_bp", __name__)


@my_bp.route('/my')
def my():  # put application's code here

	return 'my'


@my_bp.route('/my/register')
def my_register():  # put application's code here
	return 'register'


@my_bp.route('/my/login')
def my_login():  # put application's code here
	return 'login'


@my_bp.route('/my/edit')
def my_edit():  # put application's code here
	return 'edit'


@my_bp.route('/my/index')
def my_index():  # put application's code here
	return 'index'


@my_bp.route('/my/order')
def my_order():  # put application's code here
	return 'order'


@my_bp.route('/my/info')
def my_info():  # put application's code here
	return 'info'
