from app import app, db


if __name__ == '__main__':
	with app.app_context():
		db.drop_all()
		# 检测数据库中是否存在和模型匹配的数据表。
		# 如果没有，则根据模型转换的建表语句进行建表。
		# 如果找到，则不会进行额外处理
		db.create_all()
	app.run(host=app.config['APP_HOST'], port=app.config['APP_PORT'])
	