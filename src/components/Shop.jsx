// Shop.jsx - With Pagination and Scroll to Top
import { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';

const Shop = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    // Add this useEffect to ensure header gets scrolled class on Shop page
// In Shop.jsx, modify the useEffect
useEffect(() => {
  // Force header to always have scrolled class on Shop page
  const header = document.querySelector('header');
  if (header) {
    header.classList.add('scrolled');
    
    // Prevent scroll event from removing the scrolled class
    const handleScroll = () => {
      if (!header.classList.contains('scrolled')) {
        header.classList.add('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
}, []);

    // Product categories based on your images
    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'disposables', name: 'Disposable Vapes' },
        { id: 'pods', name: 'Pods & Devices' },
        { id: 'e-liquids', name: 'E-liquids' },
        { id: 'accessories', name: 'Accessories' }
    ];

    // Updated product data with ALL images from your screenshot
    const productData = [
        // Disposable Vapes - NASTY BAR Series
        {
            id: 1,
            name: "NASTY BAR D9Ki",
            price: "R250.00",
            description: "Premium disposable vape with 9000 puffs and rich flavor.",
            image: "/images/nasty 9k.png",
            category: "disposables",
            brand: "Nasty"
        },
        {
            id: 2,
            name: "NASTY BAR D14Ki",
            price: "R280.00",
            description: "Extended battery life with 14000 puffs capacity.",
            image: "/images/d16ki-strawberryice.webp",
            category: "disposables",
            brand: "Nasty"
        },
        {
            id: 3,
            name: "NASTY BAR D16Ki",
            price: "R300.00",
            description: "High capacity disposable with 16000 puffs.",
            image: "/images/D14KJ_strawberry_mint_lemonade.webp",
            category: "disposables",
            brand: "Nasty"
        },
        {
            id: 4,
            name: "NASTY BAR 9K - Blue Razz Lemonade",
            price: "R250.00",
            description: "Blue raspberry with refreshing lemonade twist.",
            image: "/images/nasty 9k brl.png",
            category: "disposables",
            brand: "Nasty"
        },
        {
            id: 5,
            name: "NASTY BAR 9K - Strawberry Mint Lemonade",
            price: "R250.00",
            description: "Strawberry with cool mint and lemonade.",
            image: "/images/nasty 9k sml.jpg",
            category: "disposables",
            brand: "Nasty"
        },
        {
            id: 6,
            name: "NASTY BAR 9K - Sour Apple",
            price: "R250.00",
            description: "Tangy green apple with sour candy finish.",
            image: "/images/nasty 9k sp.jpg",
            category: "disposables",
            brand: "Nasty"
        },
        {
            id: 7,
            name: "NASTY BAR 9K - Watermelon Ice",
            price: "R250.00",
            description: "Sweet watermelon with ice cooling effect.",
            image: "/images/nasty 9k wi.jpg",
            category: "disposables",
            brand: "Nasty"
        },
        {
            id: 8,
            name: "NASTY BAR 9K - Wild Raspberry",
            price: "R250.00",
            description: "Bold wild raspberry flavor explosion.",
            image: "/images/nasty9k wr.png",
            category: "disposables",
            brand: "Nasty"
        },
        {
            id: 9,
            name: "NASTY BAR 9K - Banana",
            price: "R250.00",
            description: "Creamy ripe banana flavor.",
            image: "/images/nasty 9k b.jpg",
            category: "disposables",
            brand: "Nasty"
        },

        // OXBAR Disposables
        {
            id: 10,
            name: "OXBAR GT Turbo",
            price: "R270.00",
            description: "Powerful disposable vape with mesh coil technology.",
            image: "/images/oxbar gt turbo.jpg",
            category: "disposables",
            brand: "OXBAR"
        },
        {
            id: 11,
            name: "OXBAR GT Turbo Pro",
            price: "R290.00",
            description: "Advanced version with enhanced performance.",
            image: "/images/oxbar gt turbo 2.jpg",
            category: "disposables",
            brand: "OXBAR"
        },
        {
            id: 12,
            name: "OXBAR GT Turbo Max",
            price: "R310.00",
            description: "Maximum power and flavor delivery.",
            image: "/images/oxbar gt turbo 3.jpg",
            category: "disposables",
            brand: "OXBAR"
        },
        {
            id: 13,
            name: "OXBAR Standard",
            price: "R220.00",
            description: "Reliable disposable vape with great flavor.",
            image: "/images/oxbar1.jpg",
            category: "disposables",
            brand: "OXBAR"
        },
        {
            id: 14,
            name: "OXBAR Mini",
            price: "R200.00",
            description: "Compact disposable with excellent portability.",
            image: "/images/oxbar3.jpg",
            category: "disposables",
            brand: "OXBAR"
        },

        // Other Disposables
        {
            id: 15,
            name: "PX10 Watermelon Ice",
            price: "R240.00",
            description: "Refreshing watermelon flavor with ice cooling.",
            image: "/images/px10-watermelonice.webp",
            category: "disposables",
            brand: "PX10"
        },

        // Pods & Devices
        {
            id: 16,
            name: "NASTY POD PX10",
            price: "R250.00",
            description: "Refillable pods with exceptional flavor delivery.",
            image: "/images/nasty pod.webp",
            category: "pods",
            brand: "Nasty"
        },
        {
            id: 17,
            name: "NASTY POD CC",
            price: "R260.00",
            description: "Compact pod system with crystal clear flavor.",
            image: "/images/nasty pod cc.webp",
            category: "pods",
            brand: "Nasty"
        },
        {
            id: 18,
            name: "NASTY POD CG",
            price: "R255.00",
            description: "Colorful pod device with great performance.",
            image: "/images/nasty pod cg.webp",
            category: "pods",
            brand: "Nasty"
        },
        {
            id: 19,
            name: "NASTY POD PF",
            price: "R255.00",
            description: "Premium flavor pod system.",
            image: "/images/nasty pod pf.webp",
            category: "pods",
            brand: "Nasty"
        },
        {
            id: 20,
            name: "NASTY POD SML",
            price: "R255.00",
            description: "Strawberry mint lemonade specialty pod.",
            image: "/images/nasty pod sml.webp",
            category: "pods",
            brand: "Nasty"
        },
        {
            id: 21,
            name: "ARGUS DRAG 5",
            price: "R450.00",
            description: "Advanced mod device with customizable settings.",
            image: "/images/argus-drag5.jpg",
            category: "pods",
            brand: "Voopoo"
        },
        {
            id: 22,
            name: "OXBAR G Series",
            price: "R290.00",
            description: "Stylish pod system with multiple color options.",
            image: "/images/oxbar 2.jpg",
            category: "pods",
            brand: "OXBAR"
        },

        // E-liquids - G PRIME Series
        {
            id: 23,
            name: "G PRIME - Tropical Fruits",
            price: "R180.00",
            description: "Exotic blend of tropical fruits with sweet undertones.",
            image: "/images/g prime 1.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 24,
            name: "G PRIME - Grape Blackcurrant",
            price: "R180.00",
            description: "Rich grape flavor with tangy blackcurrant notes.",
            image: "/images/Grape blackcurrant.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 25,
            name: "G PRIME - Strawberry Raspberry Cherry",
            price: "R180.00",
            description: "Berry medley with sweet strawberry and tart cherry.",
            image: "/images/strawberry raspberry cherry.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 26,
            name: "G PRIME - Lemon Ice",
            price: "R180.00",
            description: "Zesty lemon with refreshing ice cooling.",
            image: "/images/Lemon Ice.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 27,
            name: "G PRIME - Tropical Ice Twist",
            price: "R180.00",
            description: "Tropical fruits with an icy menthol twist.",
            image: "/images/tropical ice twist.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 28,
            name: "G PRIME - Watermelon Ice Pop",
            price: "R180.00",
            description: "Sweet watermelon reminiscent of summer ice pops.",
            image: "/images/watermelon ice pop.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 29,
            name: "G PRIME - Sour Apple",
            price: "R180.00",
            description: "Tangy green apple with a sour candy finish.",
            image: "/images/Sour apple.png",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 30,
            name: "G PRIME - Mixed Berries",
            price: "R180.00",
            description: "Mixed berry blend with sweet and tart notes.",
            image: "/images/mixed berries.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 31,
            name: "G PRIME - Lemon Tangerine",
            price: "R180.00",
            description: "Citrus fusion of lemon and sweet tangerine.",
            image: "/images/Lemon tangerine.png",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 32,
            name: "G PRIME - Gummy Grape",
            price: "R180.00",
            description: "Sweet grape flavor like your favorite gummy candy.",
            image: "/images/gummy grape.png",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 33,
            name: "G PRIME - Raspberry Pomegranate",
            price: "R180.00",
            description: "Tart raspberry with exotic pomegranate.",
            image: "/images/rasberry pomegranate.png",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 34,
            name: "G PRIME - Honeydew Raspberry Strawberry",
            price: "R180.00",
            description: "Sweet honeydew with raspberry and strawberry.",
            image: "/images/honeydevraspberrystrawberry.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 35,
            name: "G PRIME - Energy Ice",
            price: "R180.00",
            description: "Energy drink flavor with ice cooling effect.",
            image: "/images/energy ice.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 36,
            name: "G PRIME - Fuji",
            price: "R180.00",
            description: "Crisp apple flavor inspired by Fuji apples.",
            image: "/images/fuji.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 37,
            name: "G PRIME - Tropical Fruits Deluxe",
            price: "R190.00",
            description: "Enhanced tropical fruit blend.",
            image: "/images/Tropical Fruits.webp",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 38,
            name: "G PRIME - Lychee Fusion",
            price: "R180.00",
            description: "Exotic lychee flavor with tropical notes.",
            image: "/images/titchi.webp",
            category: "e-liquids",
            brand: "G Prime"
        },

        // Additional G PRIME variants from your numbered images
        {
            id: 39,
            name: "G PRIME - Berry Mix",
            price: "R180.00",
            description: "Special berry combination for all-day vaping.",
            image: "/images/g prime 2.jpg",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 40,
            name: "G PRIME - Citrus Blast",
            price: "R180.00",
            description: "Explosive citrus flavor combination.",
            image: "/images/g prime 3.jpg",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 41,
            name: "G PRIME - Mango Tango",
            price: "R180.00",
            description: "Sweet mango with tropical dance of flavors.",
            image: "/images/g prime 4.jpg",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 42,
            name: "G PRIME - Pineapple Express",
            price: "R180.00",
            description: "Tropical pineapple with smooth finish.",
            image: "/images/g prime 5.jpg",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 43,
            name: "G PRIME - Blueberry Bliss",
            price: "R180.00",
            description: "Sweet blueberry with creamy undertones.",
            image: "/images/g prime 6.jpg",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 44,
            name: "G PRIME - Peach Paradise",
            price: "R180.00",
            description: "Juicy peach flavor that's simply heavenly.",
            image: "/images/g prime 7.jpg",
            category: "e-liquids",
            brand: "G Prime"
        },
        {
            id: 45,
            name: "G PRIME - Mint Fresh",
            price: "R180.00",
            description: "Cool mint with refreshing sensation.",
            image: "/images/g prime 8.webp",
            category: "e-liquids",
            brand: "G Prime"
        },

        // Other E-liquids
        {
            id: 46,
            name: "Triple Mango",
            price: "R190.00",
            description: "Triple layered mango flavor explosion.",
            image: "/images/triple mango.jpg",
            category: "e-liquids",
            brand: "Premium"
        },

        // Accessories
        {
            id: 47,
            name: "Vape Accessories Kit",
            price: "R150.00",
            description: "Essential accessories for your vaping needs.",
            image: "/images/Screenshot 2025-10-24 101850.png",
            category: "accessories",
            brand: "Various"
        },
        {
            id: 48,
            name: "Charger & Cable Set",
            price: "R120.00",
            description: "Complete charging solution for your devices.",
            image: "/images/Screenshot 2025-10-24 101918.png",
            category: "accessories",
            brand: "Universal"
        }
    ];

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setProducts(productData);
            setFilteredProducts(productData);
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page when filters change

        // Scroll to top when filters change
        scrollToTop();
    }, [selectedCategory, searchTerm, products]);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Change page with scroll to top
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        scrollToTop();
    };

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleCategoryFilter = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddToCart = (product) => {
        onAddToCart(product);
    };

    if (loading) {
        return (
            <div className="product-page">
                <div className="container">
                    <div className="page-header">
                        <h1>Our Shop</h1>
                        <p>Loading products...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="container">
                <div className="page-header">
                    <h1>Our Shop</h1>
                    <p>Discover our complete collection of premium vape products and accessories</p>
                </div>

                {/* Search and Filter Section */}
                <div className="shop-controls">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        <i className="fas fa-search search-icon"></i>
                    </div>

                    <div className="category-filters">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {currentProducts.length > 0 ? (
                        currentProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-img">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f8f8f8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%23ff6600'%3EProduct Image%3C/text%3E%3C/svg%3E";
                                        }}
                                    />
                                    <div className="product-badge">{product.brand}</div>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-title">{product.name}</h3>
                                    <p className="product-price">{product.price}</p>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-actions">
                                        <button
                                            className="product-btn"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <i className="fas fa-cart-plus"></i> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-products">
                            <i className="fas fa-search"></i>
                            <h3>No products found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredProducts.length > productsPerPage && (
                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <i className="fas fa-chevron-left"></i> Previous
                        </button>

                        <div className="pagination-numbers">
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>

                        <button
                            className="pagination-btn"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="results-count">
                    Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                    {selectedCategory !== 'all' && ` in ${categories.find(cat => cat.id === selectedCategory)?.name}`}
                </div>
            </div>
        </div>
    );
};

export default Shop;