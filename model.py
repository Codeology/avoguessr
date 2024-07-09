import geopandas as gpd
from shapely.geometry import Polygon
from shapely.ops import unary_union
from geopandas.tools import sjoin
import pandas as pd
import pyproj
import matplotlib.pyplot as plt
from PIL import Image
import requests
import os
from transformers import CLIPProcessor, CLIPModel
import numpy as np



# Reading in the countries from the file

countries = gpd.read_file("countries.geojson")

# Getting countries that are on streetview

with open('countries.txt', 'r') as file:
    street_view = file.read().split(', ')

#keep countries that are in street view in table and get rid of rest
countries_street_view = countries[countries['COUNTRY'].isin(street_view)]

# Grabbing the clip model to use in our code
model = CLIPModel.from_pretrained("geolocal/StreetCLIP")
processor = CLIPProcessor.from_pretrained("geolocal/StreetCLIP")


def inference(labels, image):
    inputs = processor(text=labels, images=image, return_tensors="pt", padding=True)
    # run the CLIP model
    outputs = model(**inputs)
    # calculate probabilities
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1).detach().numpy()
    # Identify the country with the highest probability
    max_prob_index = probs.argmax()
    predicted = street_view[max_prob_index]
    return predicted


all = []

for i in np.arange(4):
    image = Image.open(os.path.join(os.getcwd(), f'image{i}.jpg'))
    predicted = inference(street_view, image)
    all.append(predicted)

def mostFrequent(arr, n): 
  maxcount = 0; 
  element_having_max_freq = 0; 
  for i in range(0, n): 
    count = 0
    for j in range(0, n): 
      if(arr[i] == arr[j]): 
        count += 1
    if(count > maxcount): 
      maxcount = count 
      element_having_max_freq = arr[i] 
    
  return element_having_max_freq;
print(all)
print(mostFrequent(all, len(all)))

