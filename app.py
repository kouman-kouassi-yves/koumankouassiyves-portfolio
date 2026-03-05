from flask import Flask, render_template, request, flash, redirect, url_for
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'une-cle-secrete-temporaire')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/project")
def project():
    return render_template("project.html")

@app.route("/competence")
def competence():
    return render_template("competence.html")

@app.route("/experience")
def experience():
    return render_template("experience.html")

@app.route("/submit_contact", methods=["POST"])
def submit_contact():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")
    
    # Affiche dans la console (les logs Render)
    print(f"📬 Nouveau message de {name} ({email}): {message}")
    
    flash("Message envoyé avec succès ! Je vous répondrai bientôt.", "success")
    return redirect(url_for("contact"))

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(debug=True)