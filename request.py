import requests

url = 'http://127.0.0.1:5000/predict'

data = {
    'school': 'GP',
    'sex': 'F',
    'age': 18,
    'address': 'U',
    'famsize': 'GT3',
    'Pstatus': 'T',
    'Medu': 3,
    'Fedu': 2,
    'Mjob': 'teacher',
    'Fjob': 'teacher',
    'reason': 'course',
    'guardian': 'mother',
    'traveltime': 2,
    'studytime': 3,
    'failures': 0,
    'schoolsup': 'yes',
    'famsup': 'yes',
    'paid': 'no',
    'activities': 'yes',
    'nursery': 'yes',
    'higher': 'yes',
    'internet': 'yes',
    'romantic': 'no',
    'famrel': 5,
    'freetime': 4,
    'goout': 3,
    'Dalc': 1,
    'Walc': 1,
    'health': 5,
    'absences': 4,
    'G1': 15,
    'G2': 16
}

response = requests.post(url, json=data)

print(response.json())
