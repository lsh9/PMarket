import time

from flask import Blueprint, request, current_app
import requests
from app.models import db, User

my_bp = Blueprint("my_bp", __name__)


@my_bp.route('/my')
def my():  # put application's code here

	return 'my'


@my_bp.route('/my/register')
def my_register():  # put application's code here
	return 'register'


@my_bp.route('/my/login', methods=["POST", "GET"])
def my_login():
	if request.method == "POST":
		data = request.json
		js_code = data['code']
		response = requests.get(f"https://api.weixin.qq.com/sns/jscode2session?appid={current_app.config['WX_APP_ID']}&secret={current_app.config['WX_APP_SECRET']}&js_code={js_code}&grant_type=authorization_code")
		wx_data = response.json()
		if 'openid' in wx_data:
			openid = wx_data['openid']
		else:
			openid = "error" + time.time().__str__()
		nickName = data['nickName']
		avatarUrl = data['avatarUrl']
		gender = data['gender']
		db.session.add(User(openid=openid, nickName=nickName, avatarUrl=avatarUrl, gender=gender))
		return {'code': 0}
	else:
		return {'code': 1}


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
