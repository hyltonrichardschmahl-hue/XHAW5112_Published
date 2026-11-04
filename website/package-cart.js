(function () {
    var storageKey = "nextLevelGamingCart";

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(storageKey)) || [];
        } catch (error) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }

    var main = document.querySelector("[data-package-id]");
    var addButton = document.querySelector(".js-add-cart");

    if (main && addButton) {
        addButton.addEventListener("click", function () {
            var cart = getCart();
            var item = cart.find(function (entry) {
                return entry.id === main.dataset.packageId;
            });

            if (item) {
                item.quantity += 1;
            } else {
                cart.push({
                    id: main.dataset.packageId,
                    name: main.dataset.packageName,
                    price: Number(main.dataset.packagePrice),
                    quantity: 1
                });
            }

            saveCart(cart);
            addButton.textContent = "Added to Cart";
            addButton.disabled = true;
            window.setTimeout(function () {
                addButton.textContent = "Add to Cart";
                addButton.disabled = false;
            }, 1400);
        });
    }

    window.nextLevelGamingCart = {
        getCart: getCart,
        saveCart: saveCart
    };
}());
