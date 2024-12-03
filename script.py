# %%
import pandas as pd

# Substitua pelo caminho correto
data = pd.read_csv("student-mat.csv", sep=';')

data.columns


# %%
# Identificar valores únicos por coluna
print(data.nunique())


# %%
# Verificar dados ausentes
print(data.isnull().sum())


# %%
data.fillna(method='ffill', inplace=True)  # Exemplo simples de preenchimento


# %%
from sklearn.preprocessing import OneHotEncoder
import pandas as pd

encoder = OneHotEncoder(sparse_output=False, drop='first')
categorical_cols = ['school', 'sex', 'address', 'famsize', 'Pstatus', 'Mjob', 
                    'Fjob', 'reason', 'guardian', 'schoolsup', 'famsup', 
                    'paid', 'activities', 'nursery', 'higher', 'internet', 'romantic']

X_categorical = encoder.fit_transform(data[categorical_cols])
X_categorical = pd.DataFrame(X_categorical, columns=encoder.get_feature_names_out(categorical_cols))


# %%
from sklearn.preprocessing import StandardScaler

numeric_cols = ['age', 'Medu', 'Fedu', 'traveltime', 'studytime', 'failures', 
                'famrel', 'freetime', 'goout', 'Dalc', 'Walc', 'health', 'absences', 'G1', 'G2']
X_numeric = data[numeric_cols]

scaler = StandardScaler()
X_numeric_scaled = scaler.fit_transform(X_numeric)
X_numeric_scaled = pd.DataFrame(X_numeric_scaled, columns=numeric_cols)


# %%
X = pd.concat([X_numeric_scaled.reset_index(drop=True), X_categorical.reset_index(drop=True)], axis=1)
y = data['G3']  # Variável alvo


# %%
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# %%
from sklearn.linear_model import LinearRegression

model_lr = LinearRegression()
model_lr.fit(X_train, y_train)
y_pred_lr = model_lr.predict(X_test)


# %%
from sklearn.ensemble import RandomForestRegressor

model_rf = RandomForestRegressor(random_state=42)
model_rf.fit(X_train, y_train)
y_pred_rf = model_rf.predict(X_test)


# %%
from sklearn.model_selection import GridSearchCV

param_grid = {
      'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20],
    'min_samples_split': [2, 5, 10]
}
grid_search = GridSearchCV(RandomForestRegressor(random_state=42), param_grid, cv=5, scoring='neg_mean_absolute_error')
grid_search.fit(X_train, y_train)
best_model_rf = grid_search.best_estimator_
y_pred_rf_best = best_model_rf.predict(X_test)


# %%
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

def evaluate_model(y_test, y_pred, model_name):
    mae = mean_absolute_error(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred, squared=False)
    r2 = r2_score(y_test, y_pred)
    print(f"{model_name} - MAE: {mae}, RMSE: {rmse}, R²: {r2}")

evaluate_model(y_test, y_pred_lr, "Regressão Linear")
evaluate_model(y_test, y_pred_rf, "Random Forest")


# %%
import joblib

# Salvar o modelo, scaler e encoder
joblib.dump(best_model_rf, 'random_forest_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(encoder, 'encoder.pkl')






# %%
