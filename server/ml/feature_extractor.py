import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler

class FeatureExtractor:
    def __init__(self):
        self.tech_encoder = LabelEncoder()
        self.skill_encoder = LabelEncoder() 
        self.schedule_encoder = LabelEncoder()
        self._fit_encoders()
    
    def _fit_encoders(self):
        # Predefined categories
        technologies = ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'Data Science']
        skill_levels = ['Beginner', 'Intermediate', 'Advanced']
        schedules = ['1-2 hours/day', '3-4 hours/day', '5+ hours/day']
        
        self.tech_encoder.fit(technologies)
        self.skill_encoder.fit(skill_levels)
        self.schedule_encoder.fit(schedules)
    
    def extract_user_features(self, preferences):
        try:
            tech_encoded = self.tech_encoder.transform([preferences['technology']])[0]
            skill_encoded = self.skill_encoder.transform([preferences['skillLevel']])[0]
            schedule_encoded = self.schedule_encoder.transform([preferences['schedulePreference']])[0]
            
            return np.array([tech_encoded, skill_encoded, schedule_encoded])
        except ValueError as e:
            # Handle unknown categories
            return np.array([0, 0, 0])  # Default values