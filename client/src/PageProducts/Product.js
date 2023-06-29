export default function Product({product, addToCart}) {
    
    return (
        <div className='p-3' style={{backgroundColor: '#C2D9B8', borderRadius: 10, height: "100%"}}>
             <h3>{product.name}</h3>
            <h4>Pour {product.prix} €</h4>
            <h5>Il en reste {product.quantity}</h5>
            <p>{product.description}</p>
            <button disabled={product.quantity === 0} onClick={() => addToCart(product)}>Ajouter au panier</button>
        </div>
    )
}
