import joblib
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sklearn.preprocessing import OneHotEncoder, StandardScaler

app = Flask(__name__)

model_rf = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')
encoder = joblib.load('encoder.pkl')

def make_prediction(data_input):
    data_input = pd.DataFrame([data_input])

    numeric_cols = ['age', 'Medu', 'Fedu', 'traveltime', 'studytime', 'failures', 
                    'famrel', 'freetime', 'goout', 'Dalc', 'Walc', 'health', 'absences', 'G1', 'G2']
    categorical_cols = ['school', 'sex', 'address', 'famsize', 'Pstatus', 'Mjob', 
                        'Fjob', 'reason', 'guardian', 'schoolsup', 'famsup', 
                        'paid', 'activities', 'nursery', 'higher', 'internet', 'romantic']
                        
    X_numeric = data_input[numeric_cols]
    X_numeric_scaled = scaler.transform(X_numeric)

    X_categorical = encoder.transform(data_input[categorical_cols])

    X_transformed = np.concatenate([X_numeric_scaled, X_categorical], axis=1)
    # Fazer a previsão com o modelo
    prediction = model_rf.predict(X_transformed)
    return prediction[0]

@app.route('/predict', methods=['POST'])
def predict():
    data_input = request.get_json()
    
    prediction = make_prediction(data_input)
    
    return jsonify({"prediction": prediction})

if __name__ == '__main__':
    app.run(debug=True)
