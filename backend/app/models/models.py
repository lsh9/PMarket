from app.models import db


class Test(db.Model):
	__tablename__ = "test"
	id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
	text = db.Column(db.Text, nullable=True)


class User(db.Model):
	__tablename__ = "user"
	user_id = db.Column(db.Integer, primary_key=True)
	pass


class Message(db.Model):
	__tablename__ = "message"
	msg_id = db.Column(db.Integer, primary_key=True)
	pass


class Goods(db.Model):
	__tablename__ = "goods"
	msg_id = db.Column(db.Integer, primary_key=True)
	pass


class Release(db.Model):
	__tablename__ = "release"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	pass


class Star(db.Model):
	__tablename__ = "star"
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	pass
