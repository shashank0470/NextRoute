import sys
import json
import math

def predict_roadmap(technologies, skill_level, schedule):
    """
    Simple ML-like prediction for roadmap generation
    """
    # Adjust time based on skill level
    skill_multipliers = {
        'beginner': 1.0,
        'intermediate': 0.8,
        'advanced': 0.6,
        'expert': 0.4
    }
    
    multiplier = skill_multipliers.get(skill_level, 1.0)
    
    # Calculate adjusted hours
    for tech in technologies:
        tech['adjustedHours'] = tech['estimatedHours'] * multiplier
    
    # Sort technologies by dependencies (simple approach)
    # In a real ML model, this would use more sophisticated algorithms
    sorted_techs = sorted(technologies, key=lambda x: x['difficulty'])
    
    # Group related topics
    steps = []
    step_order = 0
    
    for tech in sorted_techs:
        # Group topics by similarity (simplified)
        grouped_topics = group_topics(tech['topics'])
        
        for group in grouped_topics:
            group_hours = sum(topic['estimatedHours'] for topic in group)
            
            steps.append({
                'name': f"Learn {', '.join(topic['name'] for topic in group)}",
                'description': f"Master these related topics in {tech['name']}",
                'technologies': [tech['id']],
                'topics': [topic['name'] for topic in group],
                'estimatedHours': group_hours * multiplier,
                'order': step_order
            })
            step_order += 1
    
    # Calculate total adjusted hours
    total_hours = sum(step['estimatedHours'] for step in steps)
    
    # Determine overall difficulty
    avg_difficulty = sum(tech['difficulty'] for tech in technologies) / len(technologies)
    
    if avg_difficulty <= 3:
        difficulty_level = 'beginner'
    elif avg_difficulty <= 6:
        difficulty_level = 'intermediate'
    elif avg_difficulty <= 8:
        difficulty_level = 'advanced'
    else:
        difficulty_level = 'expert'
        
    return {
        'totalHours': total_hours,
        'difficultyLevel': difficulty_level,
        'steps': steps
    }

def group_topics(topics):
    """
    Group related topics together (simplified algorithm)
    In a real ML model, this would use clustering or similarity metrics
    """
    # Simple grouping - max 3 topics per group
    result = []
    current_group = []
    
    for topic in topics:
        current_group.append(topic)
        if len(current_group) == 3:
            result.append(current_group)
            current_group = []
    
    if current_group:
        result.append(current_group)
        
    return result

if __name__ == "__main__":
    # Get input from Node.js
    tech_json = json.loads(sys.argv[1])
    skill_level = sys.argv[2] 
    schedule = sys.argv[3]
    
    # Process data and generate prediction
    result = predict_roadmap(tech_json, skill_level, schedule)
    
    # Return result to Node.js
    print(json.dumps(result))