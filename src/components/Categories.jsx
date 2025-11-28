import { useState } from 'react';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { id: 'e-liquids', name: 'E-liquids', icon: 'fas fa-wine-bottle' },
    { id: 'salts', name: 'Salts', icon: 'fas fa-cube' },
    { id: 'mods', name: 'Mods', icon: 'fas fa-microchip' },
    { id: 'batteries', name: 'Batteries', icon: 'fas fa-battery-full' },
    { id: 'pods', name: 'Pods', icon: 'fas fa-cube' },
    { id: 'disposables', name: 'Disposables', icon: 'fas fa-trash-alt' },
    { id: 'coils', name: 'Coils', icon: 'fas fa-fire' },
    { id: 'accessories', name: 'Vape Accessories', icon: 'fas fa-tools' }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    // In a real app, you'd navigate to the category page or show products
    console.log(`Selected category: ${categoryId}`);
  };

  return (
    <section id="categories" className="categories">
      <div className="container">
        <h2 className="section-title">Product Categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <div 
              key={category.id}
              className="category-card" 
              data-category={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-img">
                <i className={category.icon}></i>
              </div>
              <div className="category-title">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;