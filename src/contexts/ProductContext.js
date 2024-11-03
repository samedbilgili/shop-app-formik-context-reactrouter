import React, { createContext, useEffect, useState } from "react";

const initialData = [{
    category: 'Technology',
    name: 'Samsung Galaxy S24 Ultra 5g',
    price: '54.999 TL',
    image: 'https://productimages.hepsiburada.net/s/537/424-600/110000596386757.jpg/format:webp',
    description: 'Tempor deserunt duis magna cillum. Voluptate aliqua irure veniam id ullamco non irure. Cillum deserunt eiusmod irure incididunt. Ex laboris pariatur nulla in magna amet adipisicing.'
},
{
    category: 'Technology',
    name: 'Iphone 16 Pro Max 1 TB',
    price: '121.999 TL',
    image: 'https://productimages.hepsiburada.net/s/777/424-600/110000767807706.jpg/format:webp',
    description: 'Ut laborum minim exercitation do incididunt consequat incididunt anim voluptate magna nisi amet. Consectetur reprehenderit non adipisicing voluptate officia. Labore elit Lorem enim aliquip laboris eiusmod aliqua voluptate aliquip.'
}, {
    category: 'Technology',
    name: 'Xiaomi Redmi Pad Se 8/256 GB Tablet (Xiaomi Türkiye Garantili)',
    price: '6.700 TL',
    image: 'https://productimages.hepsiburada.net/s/487/424-600/110000534697384.jpg/format:webp',
    description: 'Eiusmod ut dolor excepteur cillum aliquip aliquip voluptate. Quis veniam cupidatat commodo sunt nisi reprehenderit amet nostrud veniam. Ex exercitation sint cupidatat enim elit et laborum magna.'
}, {
    category: 'Technology',
    name: 'Anker Soundcore Q21i NC Bluetooth Kablosuz Kulaklık ',
    price: '1.500 TL',
    image: 'https://productimages.hepsiburada.net/s/457/424-600/110000493459396.jpg/format:webp',
    description: 'Est in irure ad sit id laborum fugiat. Deserunt veniam elit velit labore eu aliqua eiusmod ipsum aute ullamco velit. Veniam cillum officia est sint Lorem non sit consequat Lorem officia dolor. Sunt id ullamco aliqua eu enim qui proident amet ipsum pariatur proident dolor consequat.'
}]

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");
        return savedProducts ? JSON.parse(savedProducts) : initialData; // Eğer ürünler varsa parse et, yoksa boş bir dizi olarak başlat
    });

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const value = {
        products,
        setProducts
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export default ProductContext;