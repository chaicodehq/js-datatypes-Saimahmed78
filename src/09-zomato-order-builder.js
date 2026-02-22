/**
 * 🍕 Zomato Order Builder
 *
 * Zomato jaisa order summary banana hai! Cart mein items hain (with quantity
 * aur addons), ek optional coupon code hai, aur tujhe final bill banana hai
 * with itemwise breakdown, taxes, delivery fee, aur discount.
 *
 * Rules:
 *   - cart is array of items:
 *     [{ name: "Butter Chicken", price: 350, qty: 2, addons: ["Extra Butter:50", "Naan:40"] }, ...]
 *   - Each addon string format: "AddonName:Price" (split by ":" to get price)
 *   - Per item total = (price + sum of addon prices) * qty
 *   - Calculate:
 *     - items: array of { name, qty, basePrice, addonTotal, itemTotal }
 *     - subtotal: sum of all itemTotals
 *     - deliveryFee: Rs 30 if subtotal < 500, Rs 15 if 500-999, FREE (0) if >= 1000
 *     - gst: 5% of subtotal, rounded to 2 decimal places parseFloat(val.toFixed(2))
 *     - discount: based on coupon (see below)
 *     - grandTotal: subtotal + deliveryFee + gst - discount (minimum 0, use Math.max)
 *     - Round grandTotal to 2 decimal places
 *
 *   Coupon codes (case-insensitive):
 *     - "FIRST50"  => 50% off subtotal, max Rs 150 (use Math.min)
 *     - "FLAT100"  => flat Rs 100 off
 *     - "FREESHIP" => delivery fee becomes 0 (discount = original delivery fee value)
 *     - null/undefined/invalid string => no discount (0)
 *
 *   - Items with qty <= 0 ko skip karo
 *   - Hint: Use map(), reduce(), filter(), split(), parseFloat(),
 *     toFixed(), Math.max(), Math.min(), toLowerCase()
 *
 * Validation:
 *   - Agar cart array nahi hai ya empty hai, return null
 *
 * @param {Array<{ name: string, price: number, qty: number, addons?: string[] }>} cart
 * @param {string} [coupon] - Optional coupon code
 * @returns {{ items: Array<{ name: string, qty: number, basePrice: number, addonTotal: number, itemTotal: number }>, subtotal: number, deliveryFee: number, gst: number, discount: number, grandTotal: number } | null}
 *
 * @example
 *   buildZomatoOrder([{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }], "FLAT100")
 *   // subtotal: 330, deliveryFee: 30, gst: 16.5, discount: 100
 *   // grandTotal: 330 + 30 + 16.5 - 100 = 276.5
 *
 *   buildZomatoOrder([{ name: "Pizza", price: 500, qty: 2, addons: [] }], "FIRST50")
 *   // subtotal: 1000, deliveryFee: 0, gst: 50, discount: min(500, 150) = 150
 *   // grandTotal: 1000 + 0 + 50 - 150 = 900
 */
export function buildZomatoOrder(cart, coupon) {
  // Your code here
  if (
    cart === null ||
    cart.length == 0 ||
    cart === undefined ||
    !Array.isArray(cart)
  )
    return null;
  // coupon=coupon.toUpperCase();
  let filteredCart = cart.filter((el) => el.qty > 0);
  console.log("Filtered Cart", filteredCart);
  let subTotal = filteredCart.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0,
  );
  let addsOnTotal = filteredCart.reduce((acc, curr) => {
    if (curr.addons && Array.isArray(curr.addons)) {
      let addonSum = curr.addons.reduce((addonAcc, addonCurr) => {
        let addonPrice = parseFloat(addonCurr.split(":")[1]);
        return addonAcc + addonPrice;
      }, 0);
      return acc + addonSum * curr.qty;
    }
    return acc;
  }, 0);
  console.log("Addons Total", addsOnTotal);
  subTotal += addsOnTotal;

  console.log("Total", subTotal);
  let deliveryFee = 0;
  if (subTotal < 500) deliveryFee = 30;
  else if (subTotal <= 999) deliveryFee = 15;
  else deliveryFee = 0;
  console.log("Delivery fee", deliveryFee);
  let gst = parseFloat(((5 / 100) * subTotal).toFixed(2));
  console.log("gst", gst);
  let upperCaseCoupon = coupon ? coupon.toUpperCase() : null;
  let discount = calculateDiscount(upperCaseCoupon);
  console.log("Discount", discount);
  function calculateDiscount(coupon) {
    let discount = 0;
    switch (upperCaseCoupon) {
      case "FIRST50":
        discount = Math.min((50 / 100) * subTotal, 150);
        break;
      case "FLAT100":
        discount = 100;
        break;
      case "FREESHIP":
        discount = deliveryFee;
        deliveryFee = 0;
        break;
      default:
        discount = 0;
    }
    return discount;
  }

  let grandTotal = Math.max(subTotal + deliveryFee + gst - discount, 0);
  grandTotal = parseFloat(grandTotal.toFixed(2));
  console.log("Grand total", grandTotal);
  return {
    subTotal,
    deliveryFee,
    gst,
    discount,
    grandTotal,
  };
}
console.log(
  buildZomatoOrder(
    [{ name: "Biryani", price: 200, qty: 2, addons: ["X:50"] }],
    "FLAT100",
  ),
);
