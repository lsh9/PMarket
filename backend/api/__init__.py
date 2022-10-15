from flask import Flask

# 导入蓝图
from .test import test_bp
from .my import my_bp
from .index import index_bp
from .classify import classify_bp
from .goods import goods_bp

app = Flask(__name__)

# 注册蓝图
app.register_blueprint(test_bp)
app.register_blueprint(my_bp)
app.register_blueprint(index_bp)
app.register_blueprint(classify_bp)
app.register_blueprint(goods_bp)
