import sys
from bs4 import BeautifulSoup
import requests

# For reading content from website -- read all paragraphs of website
def get_website_content(url):
    req_obj = requests.get(url)
    text = req_obj.text
    soup = BeautifulSoup(text,'html.parser')
    all_paras = soup.find_all('p')
    website_text = ""
    for para in all_paras:
        website_text += para.text
    return website_text

# Input given by user -- URL of website or text
rec_text = sys.argv[1]

# If URL is given by user -- extract all paragraphs text in 'text' varaiable
if(sys.argv[2]=='url'):
    text = get_website_content(rec_text)
else:
    text = rec_text

API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
headers = {"Authorization": f"Bearer {'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'}"}

minL=100
maxL=200
 
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()
 
output = query({
    "inputs": text,
    "parameters":{"min_length":minL,"max_length":maxL},
})

print(output[0]['summary_text'])


