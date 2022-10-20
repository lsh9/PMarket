from app.models import db, Test


def test_add(text):
	try:
		db.session.add(Test(text=text))
		db.session.commit()
		return True
	except Exception as e:
		print(e)
	return False


def test_delete(tid):
	try:
		db.session.delete(Test.query.filter(Test.id == tid).first())
		db.session.commit()
		return True
	except Exception as e:
		print(e)
	return False


def test_query_keyword(keyword):
	result = Test.query.filter(Test.text.like("%"+keyword+"%"))
	# 可以使用原生sql
	# result = db.session.execute(f'select * from test where {text} in text')
	res = {}
	for t in result:
		res[t.id] = t.text
	return res
