import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from "../../feature/cart/cartSlice";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="card bg-base-100 w-full ">
      <div className="card-body">
        <div className="grid grid-cols-2">
          <div>
            <h2 className="card-title">Your Cart</h2>
          </div>
          <div className="text-end">
            <button
              onClick={() => dispatch(clearCart())}
              className="btn btn-error"
            >
              Clear Cart
            </button>
            <Link to={"/checkout"} className="btn btn-primary">
              Checkout
            </Link>
            <Link to={"/"} className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
        {items && items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.map((item, idx) => (
                    <tr key={idx}>
                      <th>{idx + 1}</th>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>
                        <div className="flex">
                          <button
                            className="btn btn-soft btn-primary"
                            onClick={() => dispatch(addToCart(item))}
                          >
                            +
                          </button>
                          <button className="btn btn-soft btn-primary">
                            {item.quantity}
                          </button>
                          <button
                            className="btn btn-soft btn-primary"
                            onClick={() => dispatch(decreaseQuantity(item._id))}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>{item.price * item.quantity}</td>
                      <td>
                        <button
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className="btn btn-error"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
