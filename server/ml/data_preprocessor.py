import json
import re
from datetime import datetime

class DataPreprocessor:
    def __init__(self):
        self.stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'}
    
    def preprocess_youtube_data(self, raw_data):
        processed_data = []
        
        for item in raw_data:
            processed_item = {
                'id': item.get('id', ''),
                'title': self._clean_text(item.get('title', '')),
                'description': self._clean_text(item.get('description', '')),
                'channel': item.get('channel', ''),
                'url': item.get('url', ''),
                'thumbnail': item.get('thumbnail', ''),
                'duration': self._parse_duration(item.get('duration', '0')),
                'views': self._parse_number(item.get('views', '0')),
                'tags': self._extract_tags(item.get('title', '') + ' ' + item.get('description', '')),
                'difficulty': self._infer_difficulty(item.get('title', '') + ' ' + item.get('description', '')),
                'content_type': item.get('content_type', 'video'),
                'processed_at': datetime.now().isoformat()
            }
            processed_data.append(processed_item)
        
        return processed_data
    
    def _clean_text(self, text):
        # Remove special characters and normalize
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip().lower()
    
    def _parse_duration(self, duration_str):
        # Convert duration string to minutes
        try:
            if ':' in duration_str:
                parts = duration_str.split(':')
                if len(parts) == 2:
                    return int(parts[0]) * 60 + int(parts[1])
                elif len(parts) == 3:
                    return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
            return int(duration_str)
        except:
            return 0
    
    def _parse_number(self, number_str):
        # Parse view count strings like "1.2M", "500K"
        try:
            number_str = str(number_str).replace(',', '')
            if 'M' in number_str:
                return int(float(number_str.replace('M', '')) * 1000000)
            elif 'K' in number_str:
                return int(float(number_str.replace('K', '')) * 1000)
            return int(number_str)
        except:
            return 0
    
    def _extract_tags(self, text):
        # Extract technology-related keywords
        tech_keywords = [
            'javascript', 'python', 'react', 'nodejs', 'machine learning',
            'data science', 'tutorial', 'beginner', 'advanced', 'course',
            'programming', 'coding', 'development', 'web', 'api'
        ]
        
        found_tags = []
        text_lower = text.lower()
        
        for keyword in tech_keywords:
            if keyword in text_lower:
                found_tags.append(keyword)
        
        return found_tags
    
    def _infer_difficulty(self, text):
        # Infer difficulty level from text content
        text_lower = text.lower()
        
        if any(word in text_lower for word in ['beginner', 'introduction', 'basics', 'getting started']):
            return 'Beginner'
        elif any(word in text_lower for word in ['advanced', 'expert', 'mastery', 'professional']):
            return 'Advanced'
        else:
            return 'Intermediate'
