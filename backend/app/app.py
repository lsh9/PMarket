from flask import Flask, request
from app.api import *
from app.models import db, Test

# 定义app
app = Flask(__name__, instance_relative_config=True)

# 配置数据库
app.config.from_object('app.config')
app.config.from_pyfile("config.py", silent=True)
db.init_app(app)

# 注册蓝图
app.register_blueprint(test_bp)
app.register_blueprint(my_bp)
app.register_blueprint(index_bp)
app.register_blueprint(classify_bp)
app.register_blueprint(goods_bp)


@app.route('/')
def hello_world():
	db.session.add(Test(text=request.headers))
	db.session.commit()
	return 'Hello World!'
