import json
import requests
import os
from data_preprocessor import DataPreprocessor

class YouTubeScraper:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv('YOUTUBE_API_KEY')
        self.base_url = 'https://www.googleapis.com/youtube/v3'
        self.preprocessor = DataPreprocessor()
    
    def search_videos(self, query, max_results=50):
        if not self.api_key:
            # Return sample data for development
            return self._get_sample_videos(query)
        
        search_url = f"{self.base_url}/search"
        params = {
            'part': 'snippet',
            'q': query,
            'type': 'video',
            'maxResults': max_results,
            'key': self.api_key
        }
        
        try:
            response = requests.get(search_url, params=params)
            data = response.json()
            
            videos = []
            for item in data.get('items', []):
                video = {
                    'id': item['id']['videoId'],
                    'title': item['snippet']['title'],
                    'description': item['snippet']['description'],
                    'channel': item['snippet']['channelTitle'],
                    'url': f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                    'thumbnail': item['snippet']['thumbnails']['medium']['url'],
                    'content_type': 'video'
                }
                videos.append(video)
            
            return self.preprocessor.preprocess_youtube_data(videos)
        
        except Exception as e:
            print(f"Error scraping YouTube: {e}")
            return []
    
    def _get_sample_videos(self, query):
        # Sample data for development when no API key
        sample_videos = [
            {
                'id': f'{query}_video_1',
                'title': f'Complete {query} Tutorial for Beginners',
                'description': f'Learn {query} from scratch with this comprehensive tutorial',
                'channel': 'TechEducation',
                'url': f'https://youtube.com/watch?v={query}_1',
                'thumbnail': '/api/placeholder/320/180',
                'content_type': 'video',
                'duration': '45:30',
                'views': '1.2M'
            },
            {
                'id': f'{query}_video_2',
                'title': f'Advanced {query} Concepts Explained',
                'description': f'Deep dive into advanced {query} topics and best practices',
                'channel': 'CodeMaster',
                'url': f'https://youtube.com/watch?v={query}_2',
                'thumbnail': '/api/placeholder/320/180',
                'content_type': 'video',
                'duration': '62:15',
                'views': '850K'
            }
        ]
        
        return self.preprocessor.preprocess_youtube_data(sample_videos)
    
    def save_scraped_data(self, data, filename):
        os.makedirs('../data', exist_ok=True)
        filepath = f'../data/{filename}'
        
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"Data saved to {filepath}")

if __name__ == "__main__":
    scraper = YouTubeScraper()
    
    # Scrape data for different technologies
    technologies = ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning']
    
    all_videos = []
    for tech in technologies:
        videos = scraper.search_videos(f"{tech} tutorial programming")
        all_videos.extend(videos)
    
    scraper.save_scraped_data(all_videos, 'youtube_videos.json')