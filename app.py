from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def app_page():
    return render_template("app.html")

@app.route("/about")
def about_app():
    return render_template("about_app.html")

