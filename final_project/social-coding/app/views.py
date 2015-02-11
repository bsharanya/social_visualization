import simplejson as json
from flask import redirect
from flask import url_for
from flask import session
from app import app
from flask import render_template
from flask import request
import org_overview
from test_write_to_file import test_write_to_file
from read_data import read_overview
from read_data import read_language_details_for
from read_data import read_year_details
import org_profile
import org_year


# Navigation Pages
@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/start')
def start():
    return render_template("start.html")

@app.route('/static/json/default_organizations.json', methods=['GET'])
def default_organizations():
    return app.send_static_file('json/default_organizations.json')

@app.route('/contactus')
def contact_us():
    return render_template("contactus.html")


# Hit the GitHub Api and fetch information for this user/organization
@app.route('/api/search', methods=['POST'])
def search():
    session.clear()
    search_key = request.form['search_key']
    read_overview(search_key)
    session['search_key'] = search_key
    return "success"


# Overview details of user/organization
@app.route('/api/overview', methods=['GET'])
def api_overview():
    search_key = session['search_key']
    data = org_overview.main_func()
    overview_data = json.dumps(data)
    return overview_data

@app.route('/overview')
def overview():
    profile = org_profile.main_func()
    return render_template("overview.html", profile=profile)


# Year details of user/organization
@app.route('/api/year', methods=['POST'])
def api_year():
    year = request.form['year']
    session["year"] = year
    return "success"

@app.route('/year')
def year():
    profile = org_profile.main_func()
    return render_template("year.html", profile=profile)

@app.route('/api/year/details', methods=['GET'])
def year_details():
    year = session['year']
    year_data, color_data = read_year_details(year)
    year_data = json.dumps(year_data)
    return year_data

@app.route('/api/color/details', methods=['GET'])
def color_details():
    year = session['year']
    year_data, color_data = read_year_details(year)
    color_data = json.dumps(color_data)
    return color_data


# Language details of user/organization
@app.route('/api/language', methods=['POST'])
def api_language():
    language = request.form['language']
    session['language'] = language
    return "success"

@app.route('/api/language/details')
def language_details():
    language = session['language']
    data = read_language_details_for(language)
    profile = org_profile.main_func()
    languages_data = json.dumps(data)
    return languages_data

@app.route('/language')
def language():
    profile = org_profile.main_func()
    return render_template("language.html", profile = profile)

