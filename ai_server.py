from flask import Flask, request, jsonify
from flask_cors import CORS
from ai import predict_category

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    category = predict_category(data.get("description", ""))
    return jsonify({"category": category})

app.run(port=5000, debug=True)
