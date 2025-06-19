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

  const updateTotal = () => {
    const qty40 = parseInt(quantity40l.value, 10) || 0;
    const qty1000 = parseInt(quantity1000l.value, 10) || 0;
    const deliveryCost = deliveryYes.checked ? 400 : 0;
    console.log(deliveryYes.checked);

    console.log(deliveryYes.checked);
    const total = qty40 * 70 + qty1000 * 1250 + deliveryCost;
    totalDisplay.textContent = `Sum: ${total} kr`;
  };

  minus40l.addEventListener("click", () => {
    let current = parseInt(quantity40l.value, 10);
    quantity40l.value = current - 1;
    updateTotal();
  });

  plus40l.addEventListener("click", () => {
    let current = parseInt(quantity40l.value, 10);
    quantity40l.value = current + 1;
    updateTotal();
  });

  minus1000l.addEventListener("click", () => {
    let current = parseInt(quantity1000l.value, 10);
    quantity1000l.value = current - 1;
    updateTotal();
  });

  plus1000l.addEventListener("click", () => {
    let current = parseInt(quantity1000l.value, 10);
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
