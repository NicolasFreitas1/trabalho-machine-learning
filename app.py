import joblib
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sklearn.preprocessing import OneHotEncoder, StandardScaler

app = Flask(__name__)

# Carregar o modelo, scaler e encoder salvos
model_rf = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')
encoder = joblib.load('encoder.pkl')

# Função para fazer a previsão
def make_prediction(data_input):
    # Converter os dados de entrada para DataFrame
    data_input = pd.DataFrame([data_input])

    # Definir as colunas numéricas e categóricas
    numeric_cols = ['age', 'Medu', 'Fedu', 'traveltime', 'studytime', 'failures', 
                    'famrel', 'freetime', 'goout', 'Dalc', 'Walc', 'health', 'absences', 'G1', 'G2']
    categorical_cols = ['school', 'sex', 'address', 'famsize', 'Pstatus', 'Mjob', 
                        'Fjob', 'reason', 'guardian', 'schoolsup', 'famsup', 
                        'paid', 'activities', 'nursery', 'higher', 'internet', 'romantic']

    # Escalar as colunas numéricas
    X_numeric = data_input[numeric_cols]
    X_numeric_scaled = scaler.transform(X_numeric)

    # Codificar as colunas categóricas
    X_categorical = encoder.transform(data_input[categorical_cols])

    # Combinar as colunas numéricas e categóricas
    X_transformed = np.concatenate([X_numeric_scaled, X_categorical], axis=1)

    # Fazer a previsão com o modelo
    prediction = model_rf.predict(X_transformed)
    return prediction[0]

# Rota para fazer a previsão
@app.route('/predict', methods=['POST'])
def predict():
    # Recebe os dados de entrada no formato JSON
    data_input = request.get_json()
    
    # Faz a previsão usando os dados de entrada
    prediction = make_prediction(data_input)
    
    # Retorna a previsão como um JSON
    return jsonify({"prediction": prediction})

# Iniciar o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)
