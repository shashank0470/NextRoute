# import json
# import sys
# import numpy as np
# import pickle
# from sklearn.metrics.pairwise import cosine_similarity
# from data_processing.feature_extractor import FeatureExtractor
# from content_based_filter import ContentBasedFilter

# class RecommendationEngine:
#     def __init__(self):
#         self.feature_extractor = FeatureExtractor()
#         self.content_filter = ContentBasedFilter()
#         self.load_models()
    
#     def load_models(self):
#         try:
#             with open('models/recommendation_model.pkl', 'rb') as f:
#                 self.model = pickle.load(f)
#             with open('models/feature_scaler.pkl', 'rb') as f:
#                 self.scaler = pickle.load(f)
#         except FileNotFoundError:
#             self.model = None
#             self.scaler = None
    
#     def predict(self, user_preferences):
#         # Extract features from user input
#         user_features = self.feature_extractor.extract_user_features(user_preferences)
        
#         # Get content-based recommendations
#         content_recommendations = self.content_filter.get_recommendations(user_preferences)
        
#         # Calculate confidence scores
#         confidence_scores = self._calculate_confidence(user_features, content_recommendations)
        
#         return {
#             'recommendedContent': content_recommendations[:10],
#             'confidence': np.mean(list(confidence_scores.values())),
#             'confidenceScores': confidence_scores,
#             'reasoning': self._generate_reasoning(user_preferences, content_recommendations)
#         }
    
#     def _calculate_confidence(self, user_features, recommendations):
#         scores = {}
#         for rec_id in recommendations:
#             # Simple confidence calculation based on feature matching
#             scores[rec_id] = np.random.uniform(0.6, 0.95)  # Placeholder
#         return scores
    
#     def _generate_reasoning(self, preferences, recommendations):
#         return f"Based on your {preferences['technology']} selection and {preferences['skillLevel']} level, we found {len(recommendations)} matching resources."

# if __name__ == "__main__":
#     try:
#         user_input = json.loads(sys.argv[1])
#         engine = RecommendationEngine()
#         result = engine.predict(user_input)
#         print(json.dumps(result))
#     except Exception as e:
#         print(json.dumps({"error": str(e)}))



import json
import sys
import numpy as np
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from feature_extractor import FeatureExtractor
from content_based_filter import ContentBasedFilter

class RecommendationEngine:
    def __init__(self):
        self.feature_extractor = FeatureExtractor()
        self.content_filter = ContentBasedFilter()
        self.load_models()
    
    def load_models(self):
        try:
            with open('models/recommendation_model.pkl', 'rb') as f:
                self.model = pickle.load(f)
            with open('models/feature_scaler.pkl', 'rb') as f:
                self.scaler = pickle.load(f)
        except FileNotFoundError:
            self.model = None
            self.scaler = None
    
    def predict(self, user_preferences):
        user_features = self.feature_extractor.extract_user_features(user_preferences)
        content_recommendations = self.content_filter.get_recommendations(user_preferences)
        confidence_scores = self._calculate_confidence(user_features, content_recommendations)

        confidence_values = list(confidence_scores.values())
        confidence_mean = np.mean(confidence_values) if confidence_values else 0.0

        result = {
            'recommendedContent': content_recommendations[:10],
            'confidence': round(float(confidence_mean), 3),  # Avoid NaN
            'confidenceScores': confidence_scores,
            'reasoning': self._generate_reasoning(user_preferences, content_recommendations)
        }

        return result
    
    def _calculate_confidence(self, user_features, recommendations):
        scores = {}
        for rec_id in recommendations:
            scores[rec_id] = round(np.random.uniform(0.6, 0.95), 3)  # Simulated
        return scores
    
    def _generate_reasoning(self, preferences, recommendations):
        return f"Based on your {preferences['technology']} selection and {preferences['skillLevel']} level, we found {len(recommendations)} matching resources."

if __name__ == "__main__":
    try:
        user_input = json.loads(sys.argv[1])
        engine = RecommendationEngine()
        result = engine.predict(user_input)
        print(json.dumps(result, allow_nan=False))  # 🔒 Enforce valid JSON
    except Exception as e:
        print(json.dumps({"error": str(e)}))
