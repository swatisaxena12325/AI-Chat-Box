from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai

app = Flask(__name__)
CORS(app, supports_credentials=True)
openai.api_key = os.getenv("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")

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        question = data['question']
        response = openai.Completion.create(
            engine="gpt-3.5-turbo",
            prompt=question,
            temperature=0.5,
            max_tokens=100
        )
        message = response.choices[0].text.strip()
        response_data = {"question": question, "answer": message}
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
