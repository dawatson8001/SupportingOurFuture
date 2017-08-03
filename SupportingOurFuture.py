from flask import Flask, render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'volunteerfunding'
COLLECTION_NAME = 'nyasfunding'
MONGO_URI = 'mongodb://admin:sooty2487@ds135252.mlab.com:35252/volunteerfunding'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ContactUs")
def contactus():
    return render_template("ContactUs.html")

@app.route("/NYASFunding")
def nyasfunding():
    return render_template("NYASFunding.html")

@app.route("/volunteerFunding/nyasFunding")
def nyasFunding():

    FIELDS = {
        '_id': False, 'financial_year': True, 'voluntary_income': True, 'activities_for_generating_income': True,
        'investment_income': True, 'charitable_activities_in': True, 'income_total': True,
        'costs_of_generating_voluntary_income': True, 'charitable_activities': True, 'governance_costs': True,
        'expenses_total': True, 'gains_and_losses_on_disposals_of_investment_assets': True,
        'gains_and_losses_on_revaluation_of_investment_assets': True, 'net_mMovement_in_funds_for_the_year': True,
        'total_funds_at_start_of_year': True, 'total_funds_at_end_of_year': True
    }

    with MongoClient (MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS, limit=2000)

        return json.dumps(list(projects))

if __name__ == '__main__':
    app.run()