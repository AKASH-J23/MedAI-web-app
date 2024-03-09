import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model

MODEL_PATH = r"./model/pneumonia_detection_ai_version_3.h5"
model = load_model(MODEL_PATH)

def predict_pneumonia(file):
    try:
        img = image.load_img(file, target_size=(200, 200), color_mode="grayscale")
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)
        img = img / 255

        result = model.predict(img)
        op = result[0, 0]
        
        if op < 0.5:
            return True  # PNEUMONIA
        else:
            return False  # NORMAL
    except Exception as e:
        print("Error during prediction:", e)
        return False

value = predict_pneumonia('./pnemonia/person1001.jpeg')
print(value)
