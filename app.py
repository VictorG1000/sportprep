from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__, static_folder="static")

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/sw.js")
def sw():
    return send_from_directory('static', 'sw.js', mimetype='application/javascript')

@app.route("/manifest.json")
def manifest():
    return send_from_directory("static", "manifest.json", mimetype="application/manifest+json")

@app.route("/static/<path:path>")
def static_files(path):
    return send_from_directory("static", path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
