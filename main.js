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
  const deliveryText = document.getElementById("delivery-text");

  const leveringskostnad = document.getElementById("leveringskostnad");
  const vedkostnad = document.getElementById("vedkostnad");

  let totalPrice = 0;

  emailjs.init("GnJ4BJ1PgpmKm49ID");

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const hiddenEmailInput = document.createElement("input");
      hiddenEmailInput.type = "hidden";
      hiddenEmailInput.name = "email";
      hiddenEmailInput.value = "jonathan@hamarvedsentral.no";
      this.appendChild(hiddenEmailInput);

      const hiddenToalPriceInput = document.createElement("input");
      hiddenToalPriceInput.type = "hidden";
      hiddenToalPriceInput.name = "totalPrice";
      hiddenToalPriceInput.value = String(totalPrice);
      this.appendChild(hiddenToalPriceInput);

      const serviceID = "hamarVedsentral";
      const templateID = "template_yilq9iz";

      emailjs
        .sendForm(serviceID, templateID, this)
        .then(
          () => {
            window.location.href = "./bestilling-registrert/";
          },
          (err) => {
            alert("Sending feilet");
          }
        )
        .finally(() => {
          this.removeChild(hiddenEmailInput);
          this.removeChild(hiddenToalPriceInput);
        });
    });

  const updateTotal = () => {
    const qty40 = parseInt(quantity40l.value, 10) || 0;
    const qty1000 = parseInt(quantity1000l.value, 10) || 0;
    const totalBags = qty40 + qty1000 * 19;

    const trips = Math.max(1, Math.ceil(totalBags / 76));
    const costOfDeliveryCalculated = trips * 250;

    const deliveryCost = deliveryYes.checked
      ? totalBags > 25
        ? costOfDeliveryCalculated
        : 400
      : 0;
    const qty40Price = totalBags > 25 ? 67 : 70;
    const qty1000Price = 1250;

    const woodCost = qty40 * qty40Price + qty1000 * qty1000Price;
    totalPrice = woodCost + deliveryCost;

    qty40PriceDisplay.textContent = `${qty40Price} kr`;
    deliveryCostDisplay.textContent = `Levering ${
      totalBags > 25 ? costOfDeliveryCalculated : 400
    } kr`;
    totalDisplay.textContent = `Sum: ${totalPrice} kr`;
    leveringskostnad.textContent = `Leveringskostnad: ${deliveryCost} kr`;
    vedkostnad.textContent = `Vedkostnad: ${woodCost} kr`;

    if (totalBags > 76) {
      deliveryText.innerHTML = `Ved store bestillinger tar vi 250 kr per lass (4 storsekker / 76 sekker)`;
    } else {
      deliveryText.innerHTML = `Levering over 25 sekker kun 250 kr!`;
    }
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
