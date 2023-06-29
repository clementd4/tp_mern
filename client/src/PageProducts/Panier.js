export default function Panier({ cart, totalPrice, removeFromCart, confirmCart  }) {
    return (
      <div>
        <h2>Panier</h2>
        {cart.length === 0 ? (
          <p>Aucun produit dans le panier</p>
        ) : (
          <div>
            {cart.map((product) => (
              <div key={product._id}>
                <h4>{product.name}</h4>
                <button onClick={() => removeFromCart(product._id)}>Supprimer</button>
              </div>
            ))}
            <h4>Total à payer : {totalPrice} €</h4>
            <button onClick={confirmCart}>Confirmer le panier</button>
          </div>
        )}
      </div>
    );
  }
