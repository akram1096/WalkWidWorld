document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.querySelector('.toggle-mobile-search');
  const mobileSearch = document.querySelector('.mobile-search-input');
  const navToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarContent');

  // Toggle search bar
  if (searchToggle && mobileSearch) {
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();

      // Close nav menu if open
      if (navbarCollapse.classList.contains('show')) {
        navToggler.click(); // trigger collapse
      }

      mobileSearch.classList.toggle('active');
    });
  }

  // Close search if nav toggler clicked
  if (navToggler) {
    navToggler.addEventListener('click', () => {
      if (mobileSearch.classList.contains('active')) {
        mobileSearch.classList.remove('active');
      }
    });
  }
});

// Contact form validation and success message
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Basic validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const topic = document.getElementById('topic').value;

  if (!name || !email || !subject || !message || !topic) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email format check (simple)
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate success
  document.getElementById('formResponse').style.display = 'block';
  this.reset();
});



// Collections Page JavaScript
class CollectionsManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilters = {
            price: { min: 0, max: 5000 },
            brands: [],
            colors: [],
            genders: [],
            fabrics: [],
            ages: [],
            search: ''
        };
        this.currentSort = 'recommended';
        this.currentView = 'grid';
        this.productsPerPage = 6;
        this.currentPage = 1;
        
        this.init();
    }

    // Initialize the application
    init() {
        this.loadSampleProducts();
        this.setupEventListeners();
        this.renderProducts();
        this.updatePriceDisplay();
    }

    // Sample product data
    loadSampleProducts() {
        this.products = [
            {
                id: 1,
                title: "BARE ONES",
                description: "Boys Printed T-shirt",
                currentPrice: 699,
                originalPrice: 899,
                image: "https://via.placeholder.com/300x300/f8f9fa/6c757d?text=T-Shirt",
                brand: "walkwid",
                colors: ["white", "black"],
                gender: "boy",
                fabric: "cotton",
                age: "2-3",
                rating: 4,
                reviews: 28,
                badges: ["new"],
                isNew: true
            },
            {
                id: 2,
                title: "COMFORT KIDS",
                description: "Girls Yellow Hoodie",
                currentPrice: 1299,
                originalPrice: 1599,
                image: "https://via.placeholder.com/300x300/fff3cd/856404?text=Hoodie",
                brand: "kids",
                colors: ["yellow", "pink"],
                gender: "girl",
                fabric: "blend",
                age: "3-5",
                rating: 5,
                reviews: 45,
                badges: ["sale"],
                isNew: false
            },
            {
                id: 3,
                title: "LITTLE ONES",
                description: "Unisex Denim Shirt",
                currentPrice: 899,
                originalPrice: null,
                image: "https://via.placeholder.com/300x300/e3f2fd/1976d2?text=Shirt",
                brand: "comfort",
                colors: ["blue", "white"],
                gender: "unisex",
                fabric: "cotton",
                age: "1-2",
                rating: 4,
                reviews: 32,
                badges: [],
                isNew: false
            },
            {
                id: 4,
                title: "PRINCESS WEAR",
                description: "Girls Party Dress",
                currentPrice: 1599,
                originalPrice: 1999,
                image: "https://via.placeholder.com/300x300/f3e5f5/7b1fa2?text=Dress",
                brand: "walkwid",
                colors: ["purple", "pink"],
                gender: "girl",
                fabric: "polyester",
                age: "3-5",
                rating: 5,
                reviews: 67,
                badges: ["trending"],
                isNew: true
            },
            {
                id: 5,
                title: "ACTIVE KIDS",
                description: "Boys Cotton Shorts",
                currentPrice: 499,
                originalPrice: null,
                image: "https://via.placeholder.com/300x300/fff8e1/f57f17?text=Shorts",
                brand: "kids",
                colors: ["orange", "blue"],
                gender: "boy",
                fabric: "cotton",
                age: "2-3",
                rating: 3,
                reviews: 15,
                badges: [],
                isNew: false
            },
            {
                id: 6,
                title: "WINTER COLLECTION",
                description: "Unisex Winter Jacket",
                currentPrice: 2199,
                originalPrice: 2599,
                image: "https://via.placeholder.com/300x300/e8f5e8/2e7d32?text=Jacket",
                brand: "comfort",
                colors: ["green", "black"],
                gender: "unisex",
                fabric: "blend",
                age: "3-5",
                rating: 4,
                reviews: 23,
                badges: ["limited"],
                isNew: false
            },
            // Additional sample products for pagination
            {
                id: 7,
                title: "SUMMER VIBES",
                description: "Girls Floral Dress",
                currentPrice: 799,
                originalPrice: 999,
                image: "https://via.placeholder.com/300x300/fce4ec/c2185b?text=Floral+Dress",
                brand: "walkwid",
                colors: ["pink", "white"],
                gender: "girl",
                fabric: "cotton",
                age: "1-2",
                rating: 4,
                reviews: 41,
                badges: ["new"],
                isNew: true
            },
            {
                id: 8,
                title: "COOL BOYS",
                description: "Boys Casual Jeans",
                currentPrice: 1099,
                originalPrice: null,
                image: "https://via.placeholder.com/300x300/e1f5fe/0277bd?text=Jeans",
                brand: "kids",
                colors: ["blue", "black"],
                gender: "boy",
                fabric: "cotton",
                age: "3-5",
                rating: 4,
                reviews: 35,
                badges: [],
                isNew: false
            }
        ];
        
        this.filteredProducts = [...this.products];
        this.updateAvailableColors();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Price range slider
        const priceRange = document.getElementById('priceRange');
        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                this.currentFilters.price.max = parseInt(e.target.value);
                this.updatePriceDisplay();
                this.applyFilters();
            });
        }

        // Brand filters
        const brandCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="brand"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleCheckboxFilter('brands', e.target.value, e.target.checked);
            });
        });

        // Color filters
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(color => {
            color.addEventListener('click', (e) => {
                const colorValue = e.target.dataset.color;
                const isSelected = e.target.classList.contains('selected');
                
                if (isSelected) {
                    e.target.classList.remove('selected');
                    this.removeFromFilter('colors', colorValue);
                } else {
                    e.target.classList.add('selected');
                    this.addToFilter('colors', colorValue);
                }
                this.applyFilters();
            });
        });

        // Gender filters
        const genderCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="gender"]');
        genderCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleCheckboxFilter('genders', e.target.value, e.target.checked);
            });
        });

        // Fabric filters
        const fabricCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="fabric"]');
        fabricCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleCheckboxFilter('fabrics', e.target.value, e.target.checked);
            });
        });

        // Age filters
        const ageCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="age"]');
        ageCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleCheckboxFilter('ages', e.target.value, e.target.checked);
            });
        });

        // Sort dropdown
        const sortSelect = document.getElementById('sortBy');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortProducts();
                this.renderProducts();
            });
        }

        // View toggle buttons
        const gridViewBtn = document.getElementById('gridView');
        const listViewBtn = document.getElementById('listView');
        
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => {
                this.setView('grid');
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
            });
        }
        
        if (listViewBtn) {
            listViewBtn.addEventListener('click', () => {
                this.setView('list');
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
            });
        }

        // Clear filters button
        const clearFiltersBtn = document.getElementById('clearFilters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProducts();
            });
        }

        // Search functionality (mobile)
        const mobileSearchInput = document.querySelector('.mobile-search-input input');
        const searchToggle = document.querySelector('.toggle-mobile-search');
        
        if (searchToggle) {
            searchToggle.addEventListener('click', (e) => {
                e.preventDefault();
                const searchContainer = document.querySelector('.mobile-search-input');
                searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
            });
        }

        // Wishlist buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn')) {
                e.preventDefault();
                this.toggleWishlist(e.target.closest('.wishlist-btn'));
            }
            
            if (e.target.closest('.btn-close-tag')) {
                e.preventDefault();
                this.removeFilterTag(e.target.closest('.filter-tag'));
            }
        });
    }

    // Handle checkbox filter changes
    handleCheckboxFilter(filterType, value, isChecked) {
        if (isChecked) {
            this.addToFilter(filterType, value);
        } else {
            this.removeFromFilter(filterType, value);
        }
        this.applyFilters();
    }

    // Add value to filter array
    addToFilter(filterType, value) {
        if (!this.currentFilters[filterType].includes(value)) {
            this.currentFilters[filterType].push(value);
        }
    }

    // Remove value from filter array
    removeFromFilter(filterType, value) {
        this.currentFilters[filterType] = this.currentFilters[filterType].filter(item => item !== value);
    }

    // Apply all active filters
    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            return this.matchesPriceFilter(product) &&
                   this.matchesBrandFilter(product) &&
                   this.matchesColorFilter(product) &&
                   this.matchesGenderFilter(product) &&
                   this.matchesFabricFilter(product) &&
                   this.matchesAgeFilter(product);
        });

        this.sortProducts();
        this.currentPage = 1;
        this.renderProducts();
        this.updateActiveFilters();
    }

    // Filter matching functions
    matchesPriceFilter(product) {
        return product.currentPrice >= this.currentFilters.price.min && 
               product.currentPrice <= this.currentFilters.price.max;
    }

    matchesBrandFilter(product) {
        return this.currentFilters.brands.length === 0 || 
               this.currentFilters.brands.includes(product.brand);
    }

    matchesColorFilter(product) {
        return this.currentFilters.colors.length === 0 || 
               this.currentFilters.colors.some(color => product.colors.includes(color));
    }

    matchesGenderFilter(product) {
        return this.currentFilters.genders.length === 0 || 
               this.currentFilters.genders.includes(product.gender);
    }

    matchesFabricFilter(product) {
        return this.currentFilters.fabrics.length === 0 || 
               this.currentFilters.fabrics.includes(product.fabric);
    }

    matchesAgeFilter(product) {
        return this.currentFilters.ages.length === 0 || 
               this.currentFilters.ages.includes(product.age);
    }

    // Sort products based on selected option
    sortProducts() {
        switch (this.currentSort) {
            case 'popularity':
                this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
                break;
            case 'recommended':
            default:
                this.filteredProducts.sort((a, b) => {
                    if (a.isNew && !b.isNew) return -1;
                    if (!a.isNew && b.isNew) return 1;
                    return b.rating - a.rating;
                });
                break;
        }
    }

    // Render products in the grid
    renderProducts() {
        const productsGrid = document.querySelector('.products-grid .row');
        if (!productsGrid) return;

        const startIndex = 0;
        const endIndex = this.currentPage * this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        productsGrid.innerHTML = '';

        if (productsToShow.length === 0) {
            productsGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="no-products">
                        <i class="bi bi-search" style="font-size: 3rem; color: #6c757d;"></i>
                        <h4 class="mt-3">No products found</h4>
                        <p class="text-muted">Try adjusting your filters or search terms</p>
                    </div>
                </div>
            `;
            this.hideLoadMoreButton();
            return;
        }

        productsToShow.forEach(product => {
            const productCard = this.createProductCard(product);
            productsGrid.appendChild(productCard);
        });

        // Show/hide load more button
        if (endIndex >= this.filteredProducts.length) {
            this.hideLoadMoreButton();
        } else {
            this.showLoadMoreButton();
        }
    }

    // Create individual product card
    createProductCard(product) {
        const col = document.createElement('div');
        col.className = this.currentView === 'grid' ? 'col-lg-4 col-md-6 col-sm-6' : 'col-12';
        
        const badges = product.badges.map(badge => {
            const badgeClass = {
                'new': 'bg-danger',
                'sale': 'bg-success',
                'trending': 'bg-info',
                'limited': 'bg-warning'
            }[badge] || 'bg-secondary';
            
            return `<span class="badge ${badgeClass}">${badge}</span>`;
        }).join('');

        const originalPriceHtml = product.originalPrice ? 
            `<span class="original-price text-muted text-decoration-line-through ms-2">Rs. ${product.originalPrice}</span>` : '';

        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

        col.innerHTML = `
            <div class="product-card h-100" data-product-id="${product.id}">
                <div class="product-image-container position-relative">
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-badges">
                        ${badges}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-light btn-sm wishlist-btn" data-product-id="${product.id}">
                            <i class="bi bi-heart"></i>
                        </button>
                        <button class="btn btn-light btn-sm quick-view-btn" data-product-id="${product.id}">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info p-3">
                    <h6 class="product-title mb-2">${product.title}</h6>
                    <p class="product-description text-muted small mb-2">${product.description}</p>
                    <div class="product-price mb-2">
                        <span class="current-price fw-bold">Rs. ${product.currentPrice}</span>
                        ${originalPriceHtml}
                    </div>
                    <div class="product-rating mb-2">
                        <span class="rating-stars">${stars}</span>
                        <span class="rating-count text-muted small">(${product.reviews})</span>
                    </div>
                    <button class="btn btn-primary btn-sm w-100" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;

        return col;
    }

    // Update price display
    updatePriceDisplay() {
        const currentPriceSpan = document.getElementById('currentPrice');
        if (currentPriceSpan) {
            currentPriceSpan.textContent = `Rs. ${this.currentFilters.price.max}`;
        }
    }

    // Update active filters display
    updateActiveFilters() {
        const activeFiltersContainer = document.querySelector('.active-filters');
        if (!activeFiltersContainer) return;

        activeFiltersContainer.innerHTML = '';

        // Add filter tags
        this.addFilterTags('Brand', this.currentFilters.brands, activeFiltersContainer);
        this.addFilterTags('Color', this.currentFilters.colors, activeFiltersContainer);
        this.addFilterTags('Gender', this.currentFilters.genders, activeFiltersContainer);
        this.addFilterTags('Fabric', this.currentFilters.fabrics, activeFiltersContainer);
        this.addFilterTags('Age', this.currentFilters.ages, activeFiltersContainer);

        // Add price filter if not default
        if (this.currentFilters.price.max < 5000) {
            const priceTag = document.createElement('span');
            priceTag.className = 'filter-tag';
            priceTag.innerHTML = `Under Rs. ${this.currentFilters.price.max} <button class="btn-close-tag" data-filter-type="price">&times;</button>`;
            activeFiltersContainer.appendChild(priceTag);
        }
    }

    // Add filter tags helper
    addFilterTags(label, values, container) {
        values.forEach(value => {
            const tag = document.createElement('span');
            tag.className = 'filter-tag';
            tag.innerHTML = `${this.capitalizeFirst(value)} <button class="btn-close-tag" data-filter-type="${label.toLowerCase()}" data-filter-value="${value}">&times;</button>`;
            container.appendChild(tag);
        });
    }

    // Remove filter tag
    removeFilterTag(tagElement) {
        const closeBtn = tagElement.querySelector('.btn-close-tag');
        const filterType = closeBtn.dataset.filterType;
        const filterValue = closeBtn.dataset.filterValue;

        if (filterType === 'price') {
            this.currentFilters.price.max = 5000;
            const priceRange = document.getElementById('priceRange');
            if (priceRange) priceRange.value = 5000;
            this.updatePriceDisplay();
        } else {
            const filterMapping = {
                'brand': 'brands',
                'color': 'colors',
                'gender': 'genders',
                'fabric': 'fabrics',
                'age': 'ages'
            };
            
            const filterKey = filterMapping[filterType];
            if (filterKey) {
                this.removeFromFilter(filterKey, filterValue);
                
                // Update corresponding checkbox or color option
                if (filterType === 'color') {
                    const colorOption = document.querySelector(`.color-option[data-color="${filterValue}"]`);
                    if (colorOption) colorOption.classList.remove('selected');
                } else {
                    const checkbox = document.querySelector(`input[value="${filterValue}"]`);
                    if (checkbox) checkbox.checked = false;
                }
            }
        }
        
        this.applyFilters();
    }

    // Clear all filters
    clearAllFilters() {
        // Reset filter object
        this.currentFilters = {
            price: { min: 0, max: 5000 },
            brands: [],
            colors: [],
            genders: [],
            fabrics: [],
            ages: [],
            search: ''
        };

        // Reset UI elements
        const priceRange = document.getElementById('priceRange');
        if (priceRange) priceRange.value = 5000;
        
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('.color-option.selected').forEach(co => co.classList.remove('selected'));

        this.updatePriceDisplay();
        this.applyFilters();
    }

    // Set view mode
    setView(viewMode) {
        this.currentView = viewMode;
        this.renderProducts();
    }

    // Load more products
    loadMoreProducts() {
        this.currentPage++;
        this.renderProducts();
    }

    // Show/hide load more button
    showLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) loadMoreBtn.style.display = 'inline-block';
    }

    hideLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    }

    // Toggle wishlist
    toggleWishlist(button) {
        const icon = button.querySelector('i');
        const productId = button.dataset.productId;
        
        if (icon.classList.contains('bi-heart')) {
            icon.classList.remove('bi-heart');
            icon.classList.add('bi-heart-fill');
            button.classList.add('text-danger');
            this.addToWishlist(productId);
        } else {
            icon.classList.remove('bi-heart-fill');
            icon.classList.add('bi-heart');
            button.classList.remove('text-danger');
            this.removeFromWishlist(productId);
        }
    }

    // Wishlist management (placeholder functions)
    addToWishlist(productId) {
        console.log(`Added product ${productId} to wishlist`);
        // Implement wishlist functionality
    }

    removeFromWishlist(productId) {
        console.log(`Removed product ${productId} from wishlist`);
        // Implement wishlist functionality
    }

    // Update available colors dynamically
    updateAvailableColors() {
        const allColors = [...new Set(this.products.flatMap(product => product.colors))];
        // This function can be used to dynamically update color filters based on available products
        console.log('Available colors:', allColors);
    }

    // Utility function
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Global functions
function addToCart(productId) {
    console.log(`Adding product ${productId} to cart`);
    // Implement add to cart functionality
    
    // Show success message (example)
    const button = document.querySelector(`[onclick="addToCart(${productId})"]`);
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.classList.add('btn-success');
        button.classList.remove('btn-primary');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.add('btn-primary');
            button.classList.remove('btn-success');
        }, 1500);
    }
}

// Initialize the collections manager when the page loads
document.addEventListener('DOMContentLoaded', function() {
    window.collectionsManager = new CollectionsManager();
});

// Mobile search toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileSearchToggle = document.querySelector('.toggle-mobile-search');
    const mobileSearchInput = document.querySelector('.mobile-search-input');
    
    if (mobileSearchToggle && mobileSearchInput) {
        mobileSearchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (mobileSearchInput.style.display === 'block') {
                mobileSearchInput.style.display = 'none';
            } else {
                mobileSearchInput.style.display = 'block';
                mobileSearchInput.querySelector('input').focus();
            }
        });
        
        // Hide search when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileSearchInput.contains(e.target) && !mobileSearchToggle.contains(e.target)) {
                mobileSearchInput.style.display = 'none';
            }
        });
    }
});
