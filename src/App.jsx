import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export function App() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);

  const onInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://dummyjson.com/products/search?q=${keyword}`);
    const data = await response.json();
    setProducts(data.products);
  }

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  console.log("App.jsx rendered");

  return (
    <div className="container py-3">

      <form className="mb-3" onSubmit={handleSubmit}>
        <input name="search" onInput={onInput} value={keyword} />
        <button type="submit">Search</button>
      </form>

      <div>
        {products.map((product) => (
          <div className="card mb-3" style={{ width: "500px" }} key={product.id}>
            <img src={product.images[product.images.length - 1]} className="card-img-top" alt={product.category} />
            <div className="card-body">
              <h5 className="card-title">{product.brand}</h5>
              <p>price: ${product.price}</p>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
