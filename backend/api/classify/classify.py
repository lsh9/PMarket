from flask import Blueprint

classify_bp = Blueprint("classify_bp", __name__)


@classify_bp.route('/classify')
def classify():  # put application's code here
	return 'classify'

