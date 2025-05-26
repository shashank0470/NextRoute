import os
import json
import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from feature_extractor import FeatureExtractor 


class ModelTrainer:
    def __init__(self):
        self.feature_extractor = FeatureExtractor()
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
    
    def load_training_data(self):
        try:
            with open('../data/user_preferences.json', 'r') as f:
                training_data = json.load(f)
            return training_data
        except FileNotFoundError:
            # Generate sample training data
            return self._generate_sample_data()
    
    def _generate_sample_data(self):
        # Generate sample training data for development
        technologies = ['JavaScript', 'Python', 'React', 'Node.js']
        skill_levels = ['Beginner', 'Intermediate', 'Advanced']
        schedules = ['1-2 hours/day', '3-4 hours/day', '5+ hours/day']
        
        sample_data = []
        for i in range(100):
            sample = {
                'technology': np.random.choice(technologies),
                'skillLevel': np.random.choice(skill_levels),
                'schedulePreference': np.random.choice(schedules),
                'preferredContent': [f'content_{j}' for j in range(np.random.randint(3, 8))]
            }
            sample_data.append(sample)
        
        return sample_data
    
    def train_model(self):
        training_data = self.load_training_data()
        
        # Extract features and labels
        X = []
        y = []
        
        for data_point in training_data:
            features = self.feature_extractor.extract_user_features(data_point)
            X.append(features)
            # For simplicity, use binary labels (liked/not liked)
            y.append(len(data_point.get('preferredContent', [])) > 3)
        
        X = np.array(X)
        y = np.array(y)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluate
        accuracy = self.model.score(X_test_scaled, y_test)
        print(f"Model accuracy: {accuracy:.2f}")
        
        # Save model
        self._save_model()
    
    def _save_model(self):
        os.makedirs('models', exist_ok=True)
        
        with open('models/recommendation_model.pkl', 'wb') as f:
            pickle.dump(self.model, f)
        
        with open('models/feature_scaler.pkl', 'wb') as f:
            pickle.dump(self.scaler, f)
        
        print("Model saved successfully!")

if __name__ == "__main__":
    trainer = ModelTrainer()
    trainer.train_model()
