const fs = require('fs');
const path = require('path');

// 检查产品图片文件是否存在
const productImages = ['assets/product1.jpg', 'assets/product2.jpg', 'assets/product3.jpg', 'assets/product4.jpg', 'assets/product5.jpg', 'assets/product6.jpg'];
const missingImages = [];

console.log('正在检查产品图片文件...\n');

productImages.forEach(image => {
    const imagePath = path.join(__dirname, image);
    
    if (fs.existsSync(imagePath)) {
        console.log(`✅ ${image} - 存在`);
    } else {
        console.log(`❌ ${image} - 不存在`);
        missingImages.push(image);
    }
});

console.log('\n检查结果总结:');
if (missingImages.length === 0) {
    console.log('✅ 所有6个产品图片文件都已找到！');
} else {
    console.log(`❌ 缺少 ${missingImages.length} 个图片文件:`);
    missingImages.forEach(image => console.log(`   - ${image}`));
    console.log('\n请确保这些图片文件存在于项目根目录中。');
}