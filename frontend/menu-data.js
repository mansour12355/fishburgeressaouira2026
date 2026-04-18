/**
 * Central Menu Data & Overrides
 * consolidate menu items here to keep menu.html and order.html in sync.
 */

const menuData = {
    essaouira: {
        burgers: [
            { name: "Crispy Fish Burger", price: "70 DH", desc: "Crispy fish filet, lettuce, coleslaw, chipotle, salsa verde, tartar & cornichons", note: "Best Seller - Includes 1 side for free", mini: "55 DH", image: "menu/crispyburger.jpeg" },
            { name: "Double Crispy Fish Burger", price: "110 DH", desc: "2 crispy fish filets, lettuce, coleslaw, chipotle, salsa verde, tartar & cornichons", note: "Includes 1 side for free", image: "menu/doblecrispy.PNG" },
            { name: "Sardine Burger", price: "60 DH", desc: "2 grilled hashed sardine patties, cheese, lettuce, tomatoes & caramelized onions", note: "Signature - Includes 1 side for free", mini: "45 DH", image: "menu/sardineburger.jpeg" },
            { name: "Tofu Burger", price: "75 DH", desc: "Crispy tofu, cheese, lettuce, tomatoes, salsa verde and chipotle sauce", veg: true, note: "Vegetarian - Includes 1 side for free", mini: "60 DH" },
            { name: "Calamari Burger", price: "75 DH", desc: "Crispy calamari rings, lettuce, cornichons & tartar", note: "Includes 1 side for free", mini: "60 DH" },
            { name: "Octopus Burger", price: "75 DH", desc: "Crispy chopped octopus legs, lettuce, tomatoes, cornichons & salsa verde", note: "Includes 1 side for free", mini: "60 DH" },
            { name: "Burger of the Month", price: "70 DH", desc: "Monthly burger inspired by a local artist. Ask your waiter for more details", note: "Limited Edition - Includes 1 side for free", mini: "55 DH", image: "menu/burgerofmonth.PNG" },
        ],
        sides: [
            { name: "Potato Fries", price: "20 DH", desc: "", image: "menu/pitatos.jpeg" },
            { name: "Onion Rings", price: "25 DH", desc: "", image: "menu/Onion Rings.jpeg" },
            { name: "Guacamole", price: "20 DH", desc: "" },
            { name: "Coleslaw", price: "20 DH", desc: "", image: "menu/coleslaw.jpeg" },
        ],
        tapas: [
            { name: "Summer Salad", price: "35 DH", desc: "Avocados, lettuce, tomatoes, onions, cucumbers & vinaigrette" },
            { name: "Msemmen Fish Tacos", price: "35 DH", desc: "2 Moroccan tortilla, crispy white fish, veggies, salsa verde and chipotle sauce", image: "menu/Msemmen Fish Tacos.jpeg" },
            { name: "Fancy Sardines", price: "20 DH", desc: "3 crispy fresh sardines, stuffed with sharmoula" },
            { name: "Sardine Croquettes", price: "30 DH", desc: "3 crispy sardine balls, cheese stuffed", image: "menu/Sardine Croquettes.jpeg" },
            { name: "Seafood Basket", price: "60 DH", desc: "Fried seafood mix & potato chips" },
            { name: "Calamari Rings", price: "40 DH", desc: "5 crispy rings & tartar sauce" },
            { name: "Nachos", price: "45 DH", desc: "Golden tortilla chips, guacamole, pico de gallo, chipotle sauce and salsa verde" },
            { name: "Fish Nuggets", price: "30 DH", desc: "3 crispy fish nuggets & tartar sauce" },
            { name: "Mozzarella Sticks", price: "30 DH", desc: "5 sticks & marinara sauce" },
            { name: "Fried Octopus", price: "40 DH", desc: "Crispy octopus slices", image: "menu/Fried Octopus.jpeg" },
        ],
        globe: [
            { name: "Fish & Chips", price: "70 DH", desc: "Crispy fish fillets, potato chips, coleslaw & tartar", image: "menu/Fish & Chips.jpeg" },
            { name: "Seafood Burrito", price: "70 DH", desc: "Crispy white fish, guacamole, rice, lettuce, coleslaw, salsa verde & chipotle sauce \ud83c\udf36\ufe0f" },
            { name: "Po' Boy Sandwich", price: "50 DH", desc: "Crispy white fish, lettuce, tomatoes & tartar" },
            { name: "Bocadillo de Calamares", price: "50 DH", desc: "Crispy calamari rings, lettuce, tomatoes, onions & tartar" },
            { name: "Octopus Sandwich", price: "60 DH", desc: "Marinated octopus, marinara, pico de gallo & chipotle sauce \ud83c\udf36\ufe0f" },
            { name: "Calamari Bruschetta", price: "45 DH", desc: "Sourdough, crispy calamari rings, marinara & cilantro" },
            { name: "Avocado Toast", price: "45 DH", desc: "Sourdough, avocados, fresh herbs & salsa verde" },
            { name: "Fish Fillet Toast", price: "60 DH", desc: "Sourdough, crispy fish fillet, tartar, cornichons & chipotle sauce \ud83c\udf36\ufe0f" },
        ],
        desserts: [
            { name: "Cinnabun Crumble Topped Icecream", price: "35 DH", desc: "" },
            { name: "Ice Cream Cookie-Burger", price: "40 DH", desc: "" },
            { name: "2 Chocolate Chip Cookies", price: "20 DH", desc: "" },
        ],
        drinks: [
            { name: "Soda", price: "15 DH", desc: "" },
            { name: "Still Water 33cl/1.5l", price: "10/30 DH", desc: "" },
            { name: "Sparkling Water 33cl", price: "15 DH", desc: "" },
            { name: "Ginger Mint Lemonade", price: "20 DH", desc: "" },
            { name: "Espresso", price: "20 DH", desc: "" },
            { name: "Americano", price: "20 DH", desc: "" },
            { name: "Iced Coffee", price: "25 DH", desc: "" },
            { name: "Iced Tea", price: "20 DH", desc: "" },
        ]
    }
};

function getMenuData(location) {
    return menuData.essaouira;
}


/**
 * Applies robust image overrides to ensure new photography is always used.
 * @param {Object} item The menu item object to refine.
 * @returns {Object} The refined item object.
 */
function applyMenuOverrides(item) {
    const photofixes = {
        "Sardine Burger": "menu/sardineburger.jpeg",
        "Crispy Fish Burger": "menu/crispyburger.jpeg",
        "Potato Fries": "menu/pitatos.jpeg",
        "Coleslaw": "menu/coleslaw.jpeg",
        "Sardine Croquettes": "menu/Sardine Croquettes.jpeg",
        "Fried Octopus": "menu/Fried Octopus.jpeg",
        "Onion Rings": "menu/Onion Rings.jpeg",
        "Fish & Chips": "menu/Fish & Chips.jpeg",
        "Msemmen Fish Tacos": "menu/Msemmen Fish Tacos.jpeg",
        "Burger of the Month": "menu/burgerofmonth.PNG",
        "Double Crispy Fish Burger": "menu/doblecrispy.PNG"
    };

    if (photofixes[item.name]) {
        item.image = photofixes[item.name];
    }
    return item;
}

// Export for use in order.html and menu.html
if (typeof window !== 'undefined') {
    window.menuData = menuData;
    window.applyMenuOverrides = applyMenuOverrides;
}
