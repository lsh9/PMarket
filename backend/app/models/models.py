from app.models import db


class Test(db.Model):
	__tablename__ = "tb_test"
	id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
	text = db.Column(db.Text, nullable=True)


class User(db.Model):
	__tablename__ = "tb_user"
	openid = db.Column(db.String(255), primary_key=True, nullable=False)
	nickName = db.Column(db.String(255), nullable=False)
	avatarUrl = db.Column(db.String(1023), nullable=False)
	gender = db.Column(db.Integer, nullable=True)
	contact = db.Column(db.String(255), nullable=True)
	pass


class Message(db.Model):
	__tablename__ = "tb_message"
	msgId = db.Column(db.Integer, primary_key=True, autoincrement = True, nullable = False)
	description = db.Column(db.String(1023), nullable = False)
	contact = db.Column(db.String(255), nullable = False)
	pictureUrl = db.Column(db.String(255), nullable = False)
	msgClass  = db.Column(db.Integer, nullable = False) # 商品大类别（1书籍，2日用，3数码）
	pass


class Goods(db.Model):
	__tablename__ = "tb_goods"
	msgId = db.Column(db.Integer, nullable = False)
	goodsId = db.Column(db.Integer, nullable = False)
	name = db.Column(db.String(255), nullable = False)
	goodsClass  = db.Column(db.Integer, nullable = False) # 商品小类别（1日用，2数码，3数学，4计算机，5物理，6化学，…… n 其他）
	price = db.Column(db.Numeric(10,2), nullable = False)
	state  = db.Column(db.Integer, nullable = False) # 商品状态（1有货，2已有人要，3已售出）
	pass


class Release(db.Model):
	__tablename__ = "tb_release"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	userId = db.Column(db.Integer, nullable = False)
	pass


class Star(db.Model):
	__tablename__ = "star"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	userId = db.Column(db.Integer, nullable = False)
	pass
