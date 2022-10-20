from flask import Blueprint, request, jsonify
from app.controller.test import *
# from app.controller import test_add, test_delete, test_query_keyword

# 创建当前蓝图
test_bp = Blueprint("test_bp", __name__)


# 测试路由和数据库连接和增删改查数据
@test_bp.route('/test')
def test():
	res = {}
	if request.method == "GET":
		a = request.args.get('a')
	elif request.method == "POST":
		a = request.json['a']
	else:
		a = None
	if test_add(a):
		res['code'] = 0
	else:
		res['code'] = 1
	return jsonify(res)


@test_bp.route('/test/delete/<int:tid>')
def test_2(tid):
	res = {}
	if test_delete(tid):
		res['code'] = 0
	else:
		res['code'] = 1
	return jsonify(res)


@test_bp.route('/test/query', methods=['GET'])
def test_query():
	keyword = request.args.get('key')
	return jsonify(test_query_keyword(keyword))

