import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json

class CollaborativeFilter:
    def __init__(self):
        self.user_item_matrix = None
        self.users = []
        self.items = []
    
    def load_interaction_data(self):
        try:
            with open('../data/user_interactions.json', 'r') as f:
                interactions = json.load(f)
            return interactions
        except FileNotFoundError:
            return []
    
    def build_user_item_matrix(self):
        interactions = self.load_interaction_data()
        
        if not interactions:
            return None
        
        # Extract unique users and items
        users = list(set([interaction['user_id'] for interaction in interactions]))
        items = list(set([interaction['content_id'] for interaction in interactions]))
        
        self.users = users
        self.items = items
        
        # Create matrix
        matrix = np.zeros((len(users), len(items)))
        
        for interaction in interactions:
            user_idx = users.index(interaction['user_id'])
            item_idx = items.index(interaction['content_id'])
            matrix[user_idx][item_idx] = interaction.get('rating', 1)
        
        self.user_item_matrix = matrix
        return matrix
    
    def find_similar_users(self, user_preferences, top_k=5):
        if self.user_item_matrix is None:
            return []
        
        # For new users, create a preference vector
        user_vector = np.zeros(len(self.items))
        
        # Calculate similarity with existing users
        similarities = cosine_similarity([user_vector], self.user_item_matrix)[0]
        
        # Get top similar users
        similar_user_indices = np.argsort(similarities)[::-1][:top_k]
        
        return similar_user_indices
    
    def get_collaborative_recommendations(self, user_preferences):
        similar_users = self.find_similar_users(user_preferences)
        
        if not similar_users:
            return []
        
        # Aggregate recommendations from similar users
        recommendations = {}
        
        for user_idx in similar_users:
            user_ratings = self.user_item_matrix[user_idx]
            for item_idx, rating in enumerate(user_ratings):
                if rating > 0:
                    item_id = self.items[item_idx]
                    if item_id not in recommendations:
                        recommendations[item_id] = 0
                    recommendations[item_id] += rating
        
        # Sort by aggregated ratings
        sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
        
        return [item_id for item_id, _ in sorted_recommendations[:10]]