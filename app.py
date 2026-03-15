from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'une-cle-secrete-temporaire')

# ── Configuration Flask-Mail ──────────────────────────────────────────────────
app.config['MAIL_SERVER']   = 'smtp.gmail.com'
app.config['MAIL_PORT']     = 587
app.config['MAIL_USE_TLS']  = True
app.config['MAIL_USERNAME'] = 'yveskouassikouman@gmail.com'
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', '')   # voir README
app.config['MAIL_DEFAULT_SENDER'] = 'yveskouassikouman@gmail.com'

mail = Mail(app)
# ─────────────────────────────────────────────────────────────────────────────

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
    name    = request.form.get("name")
    email   = request.form.get("email")
    message = request.form.get("message")

    try:
        msg = Message(
            subject=f"📬 Nouveau message de {name}",
            recipients=["yveskouassikouman@gmail.com"],
            body=(
                f"Nom    : {name}\n"
                f"Email  : {email}\n\n"
                f"Message :\n{message}"
            ),
            reply_to=email   # Répondre directement à l'expéditeur
        )
        mail.send(msg)
        flash("Message envoyé avec succès ! Je vous répondrai bientôt.", "success")
    except Exception as e:
        print(f"Erreur envoi mail : {e}")
        flash("Une erreur s'est produite. Veuillez réessayer.", "error")

    return redirect(url_for("contact"))

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(debug=True)
