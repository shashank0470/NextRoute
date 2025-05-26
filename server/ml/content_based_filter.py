import json
import os
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class ContentBasedFilter:
    def __init__(self):
        self.content_data = self._load_content_data()
        self.vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
        self._prepare_content_features()
    
    def _load_content_data(self):
        data = []
        try:
            # Load all content types
            for filename in ['youtube_videos.json', 'youtube_playlists.json', 'youtube_channels.json']:
                filepath = os.path.join('../data', filename)
                if os.path.exists(filepath):
                    with open(filepath, 'r') as f:
                        content = json.load(f)
                        data.extend(content)
        except Exception as e:
            print(f"Error loading content data: {e}")
        return data
    
    def _prepare_content_features(self):
        if not self.content_data:
            self.content_features = np.array([])
            return
        
        # Create text features from content
        content_text = []
        for item in self.content_data:
            text = f"{item.get('title', '')} {item.get('description', '')} {' '.join(item.get('tags', []))}"
            content_text.append(text)
        
        if content_text:
            self.content_features = self.vectorizer.fit_transform(content_text)
        else:
            self.content_features = np.array([])
    
    def get_recommendations(self, user_preferences):
        if len(self.content_data) == 0:
            return []
        
        # Filter by technology
        tech_filtered = [
            item for item in self.content_data 
            if user_preferences['technology'].lower() in ' '.join(item.get('tags', [])).lower()
        ]
        
        # Filter by skill level
        skill_filtered = [
            item for item in tech_filtered
            if self._matches_skill_level(item, user_preferences['skillLevel'])
        ]
        
        # Return top matches
        return [item['id'] for item in skill_filtered[:15]]
    
    def _matches_skill_level(self, content, skill_level):
        content_difficulty = content.get('difficulty', 'Beginner')
        
        skill_hierarchy = {'Beginner': 1, 'Intermediate': 2, 'Advanced': 3}
        user_level = skill_hierarchy.get(skill_level, 1)
        content_level = skill_hierarchy.get(content_difficulty, 1)
        
        # Allow content at or below user's level, plus one level above
        return content_level <= user_level + 1