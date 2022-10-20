from flask import Blueprint

goods_bp = Blueprint("goods_bp", __name__)


@goods_bp.route('/goods')
def goods():  # put application's code here
	return 'goods'

