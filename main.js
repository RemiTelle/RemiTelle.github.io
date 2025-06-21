document.addEventListener("DOMContentLoaded", () => {
  const minus40l = document.getElementById("minus-40l");
  const plus40l = document.getElementById("plus-40l");
  const quantity40l = document.getElementById("quantity-40l");

  const minus1000l = document.getElementById("minus-1000l");
  const plus1000l = document.getElementById("plus-1000l");
  const quantity1000l = document.getElementById("quantity-1000l");
  const deliveryYes = document.getElementById("delivery-yes");
  const deliveryNo = document.getElementById("delivery-no");

  const totalDisplay = document.getElementById("total-sum");
  const qty40PriceDisplay = document.getElementById("qty40PriceDisplay");
  const deliveryCostDisplay = document.getElementById("deliveryCostDisplay");

  const updateTotal = () => {
    const qty40 = parseInt(quantity40l.value, 10) || 0;
    const qty1000 = parseInt(quantity1000l.value, 10) || 0;
    const totalBags = qty40 + qty1000 * 19;
    const deliveryCost = deliveryYes.checked ? (totalBags > 34 ? 250 : 400) : 0;
    const qty40Price = totalBags > 24 ? 67 : 70;
    const qty1000Price = 1250;

    const total = qty40 * qty40Price + qty1000 * qty1000Price + deliveryCost;

    qty40PriceDisplay.textContent = `${qty40Price} kr`;
    deliveryCostDisplay.textContent = `Levering ${deliveryCost} kr`;
    totalDisplay.textContent = `Sum: ${total} kr`;
  };

  minus40l.addEventListener("click", () => {
    let current = quantity40l.value ? parseInt(quantity40l.value, 10) : 0;
    console.log(current);
    quantity40l.value = current - 1;
    updateTotal();
  });

  plus40l.addEventListener("click", () => {
    let current = quantity40l.value ? parseInt(quantity40l.value, 10) : 0;
    quantity40l.value = current + 1;
    updateTotal();
  });

  minus1000l.addEventListener("click", () => {
    let current = quantity1000l.value ? parseInt(quantity1000l.value, 10) : 0;
    quantity1000l.value = current - 1;
    updateTotal();
  });

  plus1000l.addEventListener("click", () => {
    let current = quantity1000l.value ? parseInt(quantity1000l.value, 10) : 0;
    quantity1000l.value = current + 1;
    updateTotal();
  });

  quantity40l.addEventListener("input", updateTotal);
  quantity1000l.addEventListener("input", updateTotal);
  deliveryYes.addEventListener("input", updateTotal);
  deliveryNo.addEventListener("input", updateTotal);

  // Initial total
  updateTotal();
});
