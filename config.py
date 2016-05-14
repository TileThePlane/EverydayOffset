from app import app

_basedir = os.path.abspath(os.path.dirname(__file__))

app.config["DEBUG"] = True
app.config["SECRET_KEY"] = '728a14f00f710fdfc868af6b620dbf3be90dd8aaa370c2ad'
