
# coding: utf-8

# In[25]:

#remove unwanted charchters
import csv
import re

#read csv file 
csvfile = open('bbcTweets.csv', 'rU')

reader = csv.reader(csvfile)


text_file = open("Output.txt", "wb")
#write to txt file

for row in reader:
    text=row[9]
    text = text.strip()
    if "RT" in text:
        ar=text.split("RT")
        text=ar[1]
        
    #text= re.sub(r'[^\w\s]','',text)#remove pun
    text=text.replace("\"", " ")
    text = re.sub(r'^https?:\/\/.*[\r\n]*', '', text, flags=re.MULTILINE)#remove URL
    text_file.write(text)
    text_file.write("\n")

text_file.close()    


# In[11]:

#count each tweet

f = open('Output.txt',"rU")

text_file = open("TopTweets.txt", "wb")

    
file1lines = f.readlines()
if len(file1lines) != 0 :
    uniquetweet = set(line for line in file1lines )
    wordlist = list(line for line in file1lines)
    print len(uniquetweet)
    for tweet in uniquetweet:
        if wordlist.count(tweet) >40:
            text_file.write(tweet.strip() + " : " + str(wordlist.count(tweet)))
            text_file.write("\n")
            print tweet.strip('\n')," : ",wordlist.count(tweet)

f.close
text_file.close()    


# In[ ]:



