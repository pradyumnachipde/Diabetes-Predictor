import pandas as pd
import pickle

from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm


diabetes_dataset = pd.read_csv('diabetes.csv')

X = diabetes_dataset.drop(columns='Outcome', axis=1)
Y = diabetes_dataset['Outcome']

scaler = StandardScaler()
scaler.fit(X)
standardized_data = scaler.transform(X)

X = standardized_data

X_train, X_test, Y_train, Y_test = train_test_split(
    X,
    Y,
    test_size=0.2,
    stratify=Y,
    random_state=2
)

classifier = svm.SVC(kernel='linear')
classifier.fit(X_train, Y_train)

with open('diabetes_model.pkl', 'wb') as f:
    pickle.dump(classifier, f)

with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

print('Model and scaler saved successfully!')