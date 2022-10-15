from flask import Blueprint

index_bp = Blueprint("index_bp", __name__)


@index_bp.route('/index')
def index():  # put application's code here
	return 'index'

