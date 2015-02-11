
# coding: utf-8

# In[ ]:

import tweepy

CONSUMER_KEY = '5joHkEfnF7Te7t0rv4Ggfg'
CONSUMER_SECRET = 'MejrsoSXMBLcnuoYeSbaVlpziU3CKjeImcLztK53Uk'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth_url = auth.get_authorization_url()
print 'Please authorize: ' + auth_url
verifier = raw_input('PIN: ').strip()
auth.get_access_token(verifier)
print "ACCESS_KEY = '%s'" % auth.access_token.key
print "ACCESS_SECRET = '%s'" % auth.access_token.secret


# In[51]:

import sys
import tweepy

CONSUMER_KEY = '5joHkEfnF7Te7t0rv4Ggfg'
CONSUMER_SECRET = 'MejrsoSXMBLcnuoYeSbaVlpziU3CKjeImcLztK53Uk'
ACCESS_KEY = '2387726820-QZIjjFiM25S4Xf6N9FMTNGqWw1xBkaCIclHFaXK'
ACCESS_SECRET = 'EbdJfhRRUQvyvWzGICvZeiXEhk59Uo2azsMTSMnNCfZYg'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)


# In[ ]:

from tweepy.streaming import StreamListener
from tweepy import Stream
import csv
import json

jsonfile = open('Tweets.json', 'w')


class listener(StreamListener):

    def on_data(self, data):
        out=json.dumps(data)
        jsonfile.write(data)
        return True

    def on_error(self, status):
        print status

twitterStream = Stream(auth, listener())
twitterStream.filter(track=['cnn'])

jsonfile.close()


# In[73]:

import json
import sys
import time
from csv import writer

tweets = tweepy.Cursor(api.search,q="cnn",since="2014-10-18",until="2014-10-19")

with open("cnn18Tweets.csv", 'w') as out_file:
    print >> out_file, 'tweet_id, tweet_time, tweet_author, tweet_author_id,tweet_language, user location,user time_zone, tweet_geo,tweet place, tweet_text'
    csv = writer(out_file)
    tweet_count = 0

    while True:
        try: 
            tweet = tweets.items().next()
            row = (
            tweet.id,                    # tweet_id
            tweet.created_at,            # tweet_time
            tweet.author.screen_name,   # tweet_author
            tweet.id_str,        # tweet_authod_id
            tweet.lang,                  # tweet_language
            tweet.author.location,   # user_location 
            tweet.author.time_zone,   # user_location 
            tweet.geo,                   # tweet_geo
            tweet.place,                   # tweet_place
            tweet.text                   # tweet_text
            )
            values = [(value.encode('utf8') if hasattr(value, 'encode') else value) for value in row]
            csv.writerow(values)
        except tweepy.TweepError:
            print "sleeping"
            time.sleep(60 * 15)
            continue
        except StopIteration:
            break
        

# print the name of the file and number of tweets imported
print "# Tweets Imported:", tweet_count


## 
