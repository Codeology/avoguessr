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


def inference(labels, image, actual):
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


res = open(os.path.join(os.getcwd(),'test/result.txt'), mode="r")
lines = res.readlines()
accuracy = []

for i, line in enumerate(lines):
    image = Image.open(os.path.join(os.getcwd(), f'test/images/test{i}.jpg'))
    predicted = inference(street_view, image, line)
    print(f'Predicted: {predicted}\nActual: {line}')
    if (predicted == line[:-1]):
        accuracy.append(1)
    else:
        accuracy.append(0)


avg_accuracy = sum(accuracy) / len(accuracy)
print(f"Accuracy: {avg_accuracy}")


