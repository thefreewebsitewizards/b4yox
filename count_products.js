// This script will count the actual product elements on the page
// Open the shop.html page in a browser, then open the developer console and run this script

// Count visible product cards
function countVisibleProducts() {
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Count how many are visible
    const visibleProducts = Array.from(productCards).filter(card => {
        const rect = card.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && window.getComputedStyle(card).display !== 'none';
    });
    
    console.log(`Total product cards found: ${productCards.length}`);
    console.log(`Visible product cards: ${visibleProducts.length}`);
    
    // List all product titles to verify
    const productTitles = Array.from(productCards).map((card, index) => {
        const title = card.querySelector('h3')?.textContent?.trim() || 'Untitled';
        return `Product ${index + 1}: ${title}`;
    });
    
    console.log('Product titles list:');
    productTitles.forEach(title => console.log(title));
    
    // Check for duplicate IDs or titles
    const seenTitles = new Set();
    const duplicateTitles = [];
    
    productTitles.forEach(title => {
        if (seenTitles.has(title)) {
            duplicateTitles.push(title);
        } else {
            seenTitles.add(title);
        }
    });
    
    if (duplicateTitles.length > 0) {
        console.log('Potential duplicate products found:');
        duplicateTitles.forEach(title => console.log(title));
    }
    
    return visibleProducts.length;
}

// Run the count when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', countVisibleProducts);
} else {
    countVisibleProducts();
}