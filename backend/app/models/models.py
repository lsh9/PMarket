from app.models import db


class Test(db.Model):
	__tablename__ = "tb_test"
	id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
	text = db.Column(db.Text, nullable=True)


class User(db.Model):
	__tablename__ = "tb_user"
	openid = db.Column(db.String(255), primary_key=True)
	nickName = db.Column(db.String(255))
	avatarUrl = db.Column(db.String(1023))
	gender = db.Column(db.Integer)
	contact = db.Column(db.String(255))
	pass


class Message(db.Model):
	__tablename__ = "tb_message"
	msg_id = db.Column(db.Integer, primary_key=True)
	pass


class Goods(db.Model):
	__tablename__ = "tb_goods"
	msg_id = db.Column(db.Integer, primary_key=True)
	pass


class Release(db.Model):
	__tablename__ = "tb_release"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	pass


class Star(db.Model):
	__tablename__ = "star"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	pass
