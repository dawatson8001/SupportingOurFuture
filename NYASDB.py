import pymongo

def mongo_connect():
    try:
        conn = pymongo.MongoClient()
        print "Mongo is connected!"
        return conn
    except pymongo.errors.ConnectionFailure, e:
        print "Could not connect to MongoDB: %s" % e

conn = mongo_connect()
db = conn['volunteerFunding']
coll = db.nyasFunding
doc = [{"financial_year": "2014-04-01", "voluntary_income": 458765, "activities_for_generating_income": 4823,
        "investment_income": 18151, "charitable_activities_in": 4642230, "income_total": 5123969,
        "costs_of_generating_voluntary_income": 49362, "charitable_activities": 5360267, "governance_costs": 11450,
        "expenses_total": 5421079,
        "gains_and_losses_on_disposals_of_investment_assets": -8767,
        "gains_and_losses_on_revaluation_of_investment_assets": 48436,
        "net_movement_in_funds_for_the_year": -257441,
        "total_funds_at_start_of_year": 2484083,
        "total_funds_at_end_of_year": 2226642}]
coll.insert(doc)
result = coll.find_one()
print result