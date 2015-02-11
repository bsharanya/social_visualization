import csv
import json
import simplejson, urllib

GEOCODE_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'


def geocode(address, **geo_args):
    geo_args.update({
        'address': address,
        'key': 'AIzaSyDUneAuHksqBIfX8dnAploan6Zp1Y922YU'
    })

    url = GEOCODE_BASE_URL + '?' + urllib.urlencode(geo_args)
    result = simplejson.load(urllib.urlopen(url))

    return simplejson.dumps([s['geometry']["location"] for s in result['results']], indent=2)

# Convert Top 10 Tweets to json with geolocation
jsonfile = open('file.json', 'w')
with open('Top10Tweet.csv', 'rU') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    jsonfile.write("[\n")
    for row in csvreader:
        newlist = {}
        newlist["tweet"] = unicode(row[0], "ISO-8859-1")
        newlist["account"] = unicode(row[1], "ISO-8859-1")
        newlist["count"] = unicode(row[2], "ISO-8859-1")
        newlist["source"] = unicode(row[3], "ISO-8859-1")
        newlist["time"] = unicode(row[4], "ISO-8859-1")
        str_unicode = geocode(row[3])
        obj = json.loads(str_unicode)
        newlist["location"] = obj[0]
        json.dump(newlist, jsonfile)
        jsonfile.write(',\n')
    jsonfile.write("]\n")


# Convert each of the files containing the retweets to json with geolocation - tweet(number).format
jsonfile = open('tweet1.json', 'w')
with open('tweet1.csv', 'rU') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    dict = {}
    for row in csvreader:
        if len(row[0]) > 7:
            date = row[0][0:10]
        else:
            date = row[0]
        if not date in dict:
            dict[date] = []
        values = []
        for i in range(1, len(row)):
            values.append(row[i])

        dict[date].append(values)

    another_dict = {"retweets": []}
    jsonfile.write("[\n")
    for key in dict:
        l = dict[key]
        another_l = []
        print l
        for i in range(0, len(l)):
            data = l[i]
            details = {}
            if data[0] != '':
                str_unicode = geocode(data[0])
                obj = json.loads(str_unicode)
                if len(obj) > 0:
                    details["location"] = obj[0]
                    details["count"] = int(data[3])
                    another_l.append(details)

        another_dict["retweets"].append(another_l)

    json.dump(another_dict, jsonfile)
    jsonfile.write(']\n')

