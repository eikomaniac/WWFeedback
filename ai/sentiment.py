from nltk.sentiment.vader import SentimentIntensityAnalyzer
import sys

analyser = SentimentIntensityAnalyzer()

def sentiment_analyzer_scores(sentence):
    score = analyser.polarity_scores(sentence)
    print(score)

sentiment_analyzer_scores(sys.stdin.readlines()[0])