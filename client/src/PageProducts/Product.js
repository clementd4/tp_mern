export default function Product({product}) {
    return (
        <div className='p-3' style={{backgroundColor: '#C2D9B8', borderRadius: 10, height: "100%"}}>
            <h3>{product.name}</h3>
            <h4>pour {product.price}</h4>
            <h5>Il en reste {product.quantity}</h5>
            <p>{product.description}</p>
        </div>
    )
}
