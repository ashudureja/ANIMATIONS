import { useState, useEffect } from 'react';
import { getAllAnimations, getAnimationsByCategory } from '../lib/sanity';

export default function AnimationList() {
  const [animations, setAnimations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  const categories = [
    { title: 'All', value: '' },
    { title: 'Buttons', value: 'buttons' },
    { title: 'Cards', value: 'cards' },
    { title: 'SVG Transitions', value: 'svg-transitions' },
    { title: 'Text Effects', value: 'text-effects' },
    { title: '3D Effects', value: '3d-effects' },
  ];

  useEffect(() => {
    async function fetchAnimations() {
      try {
        setLoading(true);
        let data;
        
        if (category) {
          data = await getAnimationsByCategory(category);
        } else {
          data = await getAllAnimations();
        }
        
        setAnimations(data);
      } catch (err) {
        console.error('Error fetching animations:', err);
        setError('Failed to load animations');
      } finally {
        setLoading(false);
      }
    }

    fetchAnimations();
  }, [category]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <main className="mx-auto max-w-7xl bg-background px-4 sm:px-6 lg:px-6 py-8 ">
      
      
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat.value || 'all'}
            className={`category-button ${cat.value === category ? 'active' : ''}`}
            onClick={() => setCategory(cat.value)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading animations...</div>
      ) : (
        <div className="animations-grid">
          {animations.length === 0 ? (
            <p>No animations found.</p>
          ) : (
            animations.map((animation) => (
              <div key={animation._id} className="animation-card">
                <h3>{animation.name}</h3>
                <p className="category-tag">{animation.category}</p>
                <p>{animation.description}</p>
                {animation.tags && animation.tags.length > 0 && (
                  <div className="tags">
                    {animation.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {animation.featured && <div className="featured-badge">Featured</div>}
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
} 