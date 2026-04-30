from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import cv2

app = Flask(__name__)
CORS(app)

# Load a pre-trained AI model (MobileNetV2)
model = tf.keras.applications.MobileNetV2(weights='imagenet')

@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files['file']
    img_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
    img_resized = cv2.resize(img, (224, 224))
    
    # Preprocess and Predict
    x = tf.keras.applications.mobilenet_v2.preprocess_input(img_resized)
    x = np.expand_dims(x, axis=0)
    predictions = model.predict(x)
    decoded = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=3)[0]
    
    # Check if any top prediction is related to milk/bottle/dairy
    labels = [p[1].lower() for p in decoded]
    is_milk = any(word in labels for word in ['milk', 'bottle', 'dairy', 'carton'])

    if is_milk:
        return jsonify({"status": "match", "item": "Milk", "confidence": str(decoded[0][2])})
    return jsonify({"status": "no_match", "message": "This doesn't look like milk!"})

if __name__ == '__main__':
    app.run(port=5000)