import sys, os
os.system('pip install nltk')

from nltk.sentiment.vader import SentimentIntensityAnalyzer


analyser = SentimentIntensityAnalyzer()

def sentiment_analyzer_scores(sentence):
    score = analyser.polarity_scores(sentence)
    print(score["compound"])

sentiment_analyzer_scores(sys.stdin.readlines()[0])