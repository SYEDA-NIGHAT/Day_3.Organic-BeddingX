import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  id: string;
  name: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get<Product[]>("https://example.com/api/products");
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Welcome to Organic Bedding Store</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}
