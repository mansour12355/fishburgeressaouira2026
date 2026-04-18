function isTranslatableTextNode(node) {
    if (!node || !node.parentElement) return false;

    const tagName = node.parentElement.tagName;
    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(tagName)) {
        return false;
    }

    if (node.parentElement.closest('[data-no-translate]')) {
        return false;
    }

    return node.nodeValue.trim().length > 0;
}

function createTextWalker() {
    return document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                return isTranslatableTextNode(node)
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            }
        }
    );
}

const translations = {
    "The Story": { "es": "La Historia", "ar": "القصة", "fr": "L'Histoire" },
    "Gallery": { "es": "Galería", "ar": "المعرض", "fr": "Galerie" },
    "Menu": { "es": "Menú", "ar": "القائمة", "fr": "Menu" },
    "AI Chef": { "es": "Chef de IA", "ar": "طاهي الذكاء الاصطناعي", "fr": "Chef IA" },
    "Order": { "es": "Pedir", "ar": "طلب", "fr": "Commander" },
    "Visit Us": { "es": "Visítanos", "ar": "زورونا", "fr": "Rendez-nous visite" },
    "Ocean to ": { "es": "Del Océano a ", "ar": "من المحيط إلى ", "fr": "De l'Océan à " },
    "Table.": { "es": "la Mesa.", "ar": "المائدة.", "fr": "la Table." },
    "Essaouira": { "es": "Esauira", "ar": "الصويرة", "fr": "Essaouira" },
    "Order Now": { "es": "Pedir Ahora", "ar": "اطلب الآن", "fr": "Commander Maintenant" },
    "Ask AI Chef": { "es": "Preguntar al Chef IA", "ar": "اسأل طاهي الذكاء الاصطناعي", "fr": "Demander au Chef IA" },
    "Order Online": { "es": "Pedir en Línea", "ar": "اطلب عبر الإنترنت", "fr": "Commander en Ligne" },
    "Open Daily": { "es": "Abierto Todos los Días", "ar": "مفتوح يوميا", "fr": "Ouvert Tous les Jours" },
    "FishBurger": { "es": "FishBurger", "ar": "فيش برجر", "fr": "FishBurger" },
    "Made In Essaouira": { "es": "Hecho en Esauira", "ar": "صنع في الصويرة", "fr": "Fabriqué à Essaouira" },
    "The Visual": { "es": "La Visual", "ar": "المرئية", "fr": "La Visuelle" },
    "Experience": { "es": "Experiencia", "ar": "تجربة", "fr": "Expérience" },
    "Life at": { "es": "Vida en", "ar": "الحياة في", "fr": "La vie à" },
    "Local fish": { "es": "Pescado local", "ar": "سمك محلي", "fr": "Poisson local" },
    "Global vibes": { "es": "Vibras globales", "ar": "أجواء عالمية", "fr": "Ambiance globale" },
    "Big flavours": { "es": "Grandes sabores", "ar": "نكهات رائعة", "fr": "Grandes saveurs" },
    "STORY": { "es": "HISTORIA", "ar": "القصة", "fr": "HISTOIRE" },
    "Experience the authentic taste of Essaouira's local seafood, homemade sauce and soft delicious buns": { "es": "Experimenta el sabor auténtico de los mariscos locales de Essaouira, salsa casera y panecillos deliciosamente suaves", "ar": "استمتع بالطعم الأصيل للمأكولات البحرية المحلية في الصويرة، والصلصة منزلية الصنع، وخبز البرجر الطري واللذيذ", "fr": "Découvrez le goût authentique des fruits de mer d'Essaouira, notre sauce maison et nos pains délicieusement moelleux" },
    "Fishburger was born out of a simple": { "es": "Fishburger nació de un simple", "ar": "ولد فيش برجر من", "fr": "Fishburger est né d'un simple" },
    "Market gap": { "es": "vacío en el mercado", "ar": "فجوة في السوق", "fr": "vide sur le marché" },
    "and a simple recipe": { "es": "y una receta sencilla", "ar": "ووصفة بسيطة", "fr": "et d'une recette simple" },
    "So, he started cooking for himself, using family recipes passed down from his mum": { "es": "Así que empezó a cocinar para sí mismo, usando recetas familiares transmitidas por su madre", "ar": "لذا بدأ يطبخ لنفسه باستخدام وصفات العائلة المتوارثة من والدته", "fr": "Alors, il a commencé à cuisiner pour lui-même, en utilisant les recettes familiales transmises par sa mère" },
    "From the very first burger to every new opening, one thing stays the same:": { "es": "Desde la primera hamburguesa hasta cada nueva apertura, una cosa sigue igual:", "ar": "من أول برجر إلى كل افتتاح جديد، شيء واحد يبقى كما هو:", "fr": "Du tout premier burger à chaque nouvelle ouverture, une chose reste la même:" },
    "A glimpse into our kitchen, our port, and the soul of Essaouira's finest seafood": { "es": "Un vistazo a nuestra cocina, nuestro puerto y el alma de los mejores mariscos de Essaouira", "ar": "لمحة عن مطبخنا ومينائنا وروح أفضل المأكولات البحرية في الصويرة", "fr": "Un aperçu de notre cuisine, de notre port et de l'âme des meilleurs fruits de mer d'Essaouira" },
    "Behind the Scenes": { "es": "Detrás de escena", "ar": "خلف الكواليس", "fr": "Dans les coulisses" },
    "Authentic moments captured in the heart": { "es": "Momentos auténticos capturados en el corazón", "ar": "لحظات أصيلة ملتقطة في القلب", "fr": "Des moments authentiques capturés au cœur" },
    "The Local Catch": { "es": "La Captura Local", "ar": "الصيد المحلي", "fr": "La Prise Locale" },
    "Sourced daily from the blue boats": { "es": "Obtenido diariamente de los barcos azules", "ar": "يتم جلبه يوميا من القوارب الزرقاء", "fr": "Provenant chaque jour des bateaux bleus" },
    "Atmosphere": { "es": "Atmósfera", "ar": "أجواء", "fr": "Ambiance" },
    "Medina Secrets": { "es": "Secretos de la Medina", "ar": "أسرار المدينة", "fr": "Secrets de la Médina" },
    "Where the soul of the city meets our kitchen.": { "es": "Donde el alma de la ciudad se encuentra con nuestra cocina.", "ar": "حيث تلتقي روح المدينة بمطبخنا.", "fr": "Là où l'âme de la ville rencontre notre cuisine." },
    "Live Kitchen": { "es": "Cocina en Vivo", "ar": "مطبخ مباشر", "fr": "Cuisine en Direct" },
    "Kitchen Soul": { "es": "Alma de Cocina", "ar": "روح المطبخ", "fr": "L'Âme de la Cuisine" },
    "Witness the passion behind every plate": { "es": "Sé testigo de la pasión detrás de cada plato", "ar": "شاهد الشغف وراء كل طبق", "fr": "Témoignez de la passion derrière chaque assiette" },
    "Celebrating years of flavor and community in Essaouira": { "es": "Celebrando años de sabor y comunidad en Essaouira", "ar": "نحتفل بسنوات من النكهة والمجتمع في الصويرة", "fr": "Célébration d'années de saveur et de communauté à Essaouira" },
    "New Feature": { "es": "Nueva Función", "ar": "ميزة جديدة", "fr": "Nouvelle Fonctionnalité" },
    "Can't Decide?": { "es": "¿No Puedes Decidir?", "ar": "لا تستطيع أن تقرر؟", "fr": "Vous N'arrivez Pas à Décider ?" },
    "Ask our AI Chef": { "es": "Pregunta a nuestro Chef de IA", "ar": "اسأل طاهي الذكاء الاصطناعي", "fr": "Demandez à notre Chef IA" },
    "Tell us what you're craving": { "es": "Dinos qué se te antoja", "ar": "أخبرنا بما تشتهيه", "fr": "Dites-nous ce dont vous avez envie" },
    "Powered by FishBurger": { "es": "Desarrollado por FishBurger", "ar": "مدعوم من فيش برجر", "fr": "Propulsé par FishBurger" },
    "Your Craving": { "es": "Tu Antojo", "ar": "شهيتك", "fr": "Votre Envie" },
    "Try asking:": { "es": "Intenta preguntar:", "ar": "جرب أن تسأل:", "fr": "Essayez de demander:" },
    "Spicy & crunchy": { "es": "Picante y crujiente", "ar": "حار ومقرمش", "fr": "Épicé et croustillant" },
    "Best seller": { "es": "Mejor vendido", "ar": "الأكثر مبيعا", "fr": "Meilleure vente" },
    "Super hungry": { "es": "Súper hambriento", "ar": "جائع جدا", "fr": "Super faim" },
    "Vegetarian": { "es": "Vegetariano", "ar": "نباتي", "fr": "Végétarien" },
    "Light & healthy": { "es": "Ligero y saludable", "ar": "خفيف وصحي", "fr": "Léger et sain" },
    "Chef Recommends:": { "es": "El Chef Recomienda:", "ar": "يوصي الشيف:", "fr": "Notre Chef Recommande:" },
    "The Perfect Refreshment": { "es": "El Refresco Perfecto", "ar": "الانتعاش المثالي", "fr": "Le Rafraîchissement Parfait" },
    "Iced Coffee": { "es": "Café Helado", "ar": "قهوة مثلجة", "fr": "Café Glacé" },
    "Fresh Lemonade": { "es": "Limonada Fresca", "ar": "عصير ليمون طازج", "fr": "Limonade Fraîche" },
    "Sidi Ali Water": { "es": "Agua Sidi Ali", "ar": "ماء سيدي علي", "fr": "Eau Sidi Ali" },
    "Chef's Tip": { "es": "Consejo del Chef", "ar": "نصيحة الشيف", "fr": "Conseil du Chef" },
    "Heat Seeker's Choice": { "es": "Elección del Buscador de Picante", "ar": "اختيار محبي التوابل", "fr": "Choix des Amateurs de Piquant" },
    "Crispy Fish Burger": { "es": "Hamburguesa de Pescado Crujiente", "ar": "برجر السمك المقرمش", "fr": "Burger de Poisson Croustillant" },
    "Seafood Burrito": { "es": "Burrito de Mariscos", "ar": "بوريتو المأكولات البحرية", "fr": "Burrito aux Fruits de Mer" },
    "Nachos": { "es": "Nachos", "ar": "ناتشوز", "fr": "Nachos" },
    "Texture Paradise": { "es": "Paraíso de Texturas", "ar": "جنة القرمشة", "fr": "Paradis des Textures" },
    "Double Crispy Fish": { "es": "Pescado Crujiente Doble", "ar": "سمك مقرمش مزدوج", "fr": "Double Poisson Croustillant" },
    "Calamari Rings": { "es": "Anillos de Calamar", "ar": "حلقات الكالاماري", "fr": "Rondelles de Calamars" },
    "Onion Rings": { "es": "Aros de Cebolla", "ar": "حلقات البصل", "fr": "Rondelles d'Oignon" },
    "Light & Nourishing": { "es": "Ligero y Nutritivo", "ar": "خفيف ومغذي", "fr": "Léger et Nourrissant" },
    "Shrimp Salad": { "es": "Ensalada de Camarones", "ar": "سلطة الروبيان", "fr": "Salade de Crevettes" },
    "Avocado Toast": { "es": "Tostada de Aguacate", "ar": "توست الأفوكادو", "fr": "Toast à l'Avocat" },
    "Grilled Fish Fillet": { "es": "Filete de Pescado a la Parrilla", "ar": "فيليه سمك مشوي", "fr": "Filet de Poisson Grillé" },
    "The Full Experience": { "es": "La Experiencia Completa", "ar": "التجربة الكاملة", "fr": "L'Expérience Complète" },
    "Fish & Chips": { "es": "Pescado con Papas Fritas", "ar": "سمك وبطاطا مقلية", "fr": "Fish & Chips" },
    "Add Potato Fries": { "es": "Añadir Papas Fritas", "ar": "إضافة بطاطس مقلية", "fr": "Ajouter des Frites" },
    "Plant-Based Goodness": { "es": "Bondad Basada en Plantas", "ar": "أطباق نباتية صحية", "fr": "Bonté Végétale" },
    "Tofu Burger": { "es": "Hamburguesa de Tofu", "ar": "برجر التوفو", "fr": "Burger au Tofu" },
    "Essaouira Special": { "es": "Especial de Essaouira", "ar": "خاصية الصويرة", "fr": "Spécial Essaouira" },
    "Sardine Burger": { "es": "Hamburguesa de Sardina", "ar": "برجر السردين", "fr": "Burger de Sardine" },
    "Fancy Sardines": { "es": "Sardinas Elegantes", "ar": "سردين فاخر", "fr": "Sardines Fantaisie" },
    "Local Catch Plate": { "es": "Plato de Captura Local", "ar": "طبق الصيد المحلي", "fr": "Plat de Prise Locale" },
    "Chef's Signature Selection": { "es": "Selección de la Firma del Chef", "ar": "اختيارات الشيف المميزة", "fr": "Sélection Signature du Chef" },
    "Our Kitchen": { "es": "Nuestra Cocina", "ar": "مطبخنا", "fr": "Notre Cuisine" },
    "Fresh Seafood": { "es": "Mariscos Frescos", "ar": "مأكولات بحرية طازجة", "fr": "Fruits de Mer Frais" },
    "Moroccan Soul": { "es": "Alma Marroquí", "ar": "روح مغربية", "fr": "Âme Marocaine" },
    "From our signature crispy fish burger with homemade sharmoula to refreshing mint tea": { "es": "Desde nuestra exclusiva hamburguesa de pescado crujiente con sharmoula casera hasta el refrescante té de menta", "ar": "من برجر السمك المقرمش الخاص بنا مع الشرمولة المنزلية إلى شاي النعناع المنعش", "fr": "De notre burger de poisson croustillant signature avec sa charmoula maison à un thé à la menthe rafraîchissant" },
    "Daily Fresh Catch": { "es": "Pesca Fresca Diaria", "ar": "صيد طازج يوميا", "fr": "Pêche Fraîche Quotidienne" },
    "Sourced directly from local fishermen every morning": { "es": "Obtenido directamente de pescadores locales cada mañana", "ar": "يتم جلبه مباشرة من الصيادين المحليين كل صباح", "fr": "Provenant directement des pêcheurs locaux chaque matin" },
    "Authentic Spices": { "es": "Especias Auténticas", "ar": "توابل أصيلة", "fr": "Épices Authentiques" },
    "Traditional Moroccan sauce secret family recipes": { "es": "Recetas familiares secretas de salsas tradicionales marroquíes", "ar": "وصفات عائلية سرية للصلصة المغربية التقليدية", "fr": "Recettes familiales secrètes de sauce marocaine traditionnelle" },
    "Crafted with Love": { "es": "Hecho con Amor", "ar": "صنع بحب", "fr": "Fait avec Amour" },
    "Each dish prepared fresh to order with passion": { "es": "Cada plato preparado fresco a pedido con pasión", "ar": "كل طبق يُعد طازجًا عند الطلب بشغف", "fr": "Chaque plat préparé frais à la commande avec passion" },
    "Discover Our Menu": { "es": "Descubre Nuestro Menú", "ar": "اكتشف قائمتنا", "fr": "Découvrez Notre Menu" },
    "Experience authentic Essaouira seafood": { "es": "Experimenta los auténticos mariscos de Essaouira", "ar": "جرب المأكولات البحرية الأصيلة في الصويرة", "fr": "Découvrez les fruits de mer authentiques d'Essaouira" },
    "Location": { "es": "Ubicación", "ar": "الموقع", "fr": "Emplacement" },
    "Opening Hours": { "es": "Horario de Apertura", "ar": "ساعات العمل", "fr": "Heures d'Ouverture" },
    "Follow Us": { "es": "Síguenos", "ar": "تابعنا", "fr": "Suivez-nous" },
    "All rights reserved": { "es": "Todos los derechos reservados", "ar": "جميع الحقوق محفوظة", "fr": "Tous droits réservés" },
    "Top Seller": { "es": "Más Vendido", "ar": "الأكثر مبيعا", "fr": "Meilleures Ventes" },
    "Order Sent to Kitchen!": { "es": "¡Orden Enviada a Cocina!", "ar": "تم إرسال الطلب إلى المطبخ!", "fr": "Commande Envoyée en Cuisine!" },
    "Confirm Order": { "es": "Confirmar Orden", "ar": "تأكيد الطلب", "fr": "Confirmer la Commande" },
    "Customer Details": { "es": "Detalles del Cliente", "ar": "تفاصيل العميل", "fr": "Détails du Client" },
    "Your Name": { "es": "Tu Nombre", "ar": "اسمك", "fr": "Votre Nom" },
    "Delivery Address": { "es": "Dirección de Entrega", "ar": "عنوان التوصيل", "fr": "Adresse de Livraison" },
    "Estimated preparation time": { "es": "Tiempo estimado de preparación", "ar": "وقت التحضير المقدر", "fr": "Temps de préparation estimé" },
    "Thank you for your order!": { "es": "¡Gracias por su orden!", "ar": "شكراً لطلبك!", "fr": "Merci pour votre commande!" },
    "Oops! Something went wrong": { "es": "¡Ups! Algo salió mal", "ar": "عفوًا! حدث خطأ ما", "fr": "Oups! Un problème est survenu" },
    "Please try again or call us directly.": { "es": "Por favor intente de nuevo o llámenos directamente.", "ar": "يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.", "fr": "Veuillez réessayer ou nous appeler directement." },
    "In 2022, while living in Essaouira, the founder noticed a gap in the market. If you wanted fish, your choices were either cheap and basic or overpriced and fancy. There was no fun, affordable middle ground for fresh, vibrant pescatarian food.": { "es": "En 2022, mientras vivía en Essaouira, el fundador notó un vacío en el mercado. Si querías pescado, las opciones eran baratas y básicas o caras y elegantes. No había un término medio divertido y asequible para comida pescatariana fresca y vibrante.", "ar": "في عام 2022، أثناء إقامته في الصويرة، لاحظ المؤسس فجوة في السوق. إذا كنت تريد الأسماك، فإن الخيارات إما رخيصة وأساسية أو باهظة الثمن وفاخرة. لم يكن هناك حل وسط ممتع وبأسعار معقولة للمأكولات البحرية الطازجة والحيوية.", "fr": "En 2022, alors qu'il vivait à Essaouira, le fondateur a remarqué un vide sur le marché. Si vous vouliez du poisson, vos choix étaient soit bon marché et basiques, soit chers et sophistiqués. Il n'y avait pas de juste milieu amusant et abordable pour une nourriture pescatarienne fraîche et vibrante." },
    "Along with a group of talented artists, they transformed a rundown corner of the Medina into a flagship restaurant full of colour, character, and care which opened its doors officially on 16th November 2022. It quickly became known for being quirky, welcoming, and proudly different.": { "es": "Junto con un grupo de talentosos artistas, transformaron una esquina deteriorada de la Medina en un restaurante insignia lleno de color, carácter y cuidado que abrió sus puertas oficialmente el 16 de noviembre de 2022. Rápidamente se hizo conocido por ser peculiar, acogedor y orgullosamente diferente.", "ar": "جنبًا إلى جنب مع مجموعة من الفنانين الموهوبين، قاموا بتحويل زاوية متداعية من المدينة إلى مطعم رئيسي مليء بالألوان والشخصية والاهتمام الذي فتح أبوابه رسميًا في 16 نوفمبر 2022. وسرعان ما أصبح معروفًا بكونه غريبًا وترحيبيًا ومختلفًا بفخر.", "fr": "En collaboration avec un groupe d'artistes talentueux, ils ont transformé un coin délabré de la Médina en un restaurant phare plein de couleurs, de caractère et de soins qui a ouvert officiellement ses portes le 16 novembre 2022. Il est rapidement devenu connu pour être excentrique, accueillant et fièrement différent." },
    "Now with our flagship locations and a growing team, Fishburger continues to shake up the food scene—bringing fresh, local fish and bold ideas to everyone who walks through our doors.": { "es": "Ahora, con nuestras ubicaciones insignia y un equipo en crecimiento, Fishburger continúa sacudiendo la escena culinaria: trayendo pescado local fresco e ideas audaces a todos los que entran por nuestras puertas.", "ar": "الآن ، مع مواقعنا الرئيسية وفريقنا المتنامي ، يواصل فيش برجر هز مشهد الطعام - حيث يقدم أسماكًا محلية طازجة وأفكارًا جريئة لكل من يمر عبر أبوابنا.", "fr": "Maintenant avec nos emplacements phares et une équipe grandissante, Fishburger continue de bousculer la scène culinaire en apportant du poisson local frais et des idées audacieuses à tous ceux qui franchissent nos portes." },
    "A glimpse into our kitchen, our port, and the soul of Essaouira's finest seafood.": { "es": "Un vistazo a nuestra cocina, nuestro puerto y el alma de los mejores mariscos de Essaouira.", "ar": "لمحة عن مطبخنا ومينائنا وروح أفضل المأكولات البحرية في الصويرة.", "fr": "Un aperçu de notre cuisine, de notre port et de l'âme des meilleurs fruits de mer d'Essaouira." },
    "Follow on Instagram": { "es": "Síguenos en Instagram", "ar": "تابع على إنستغرام", "fr": "Suivre sur Instagram" },
    "Follow on TikTok": { "es": "Síguenos en TikTok", "ar": "تابع على تيك توك", "fr": "Suivre sur TikTok" },
    "Follow on Facebook": { "es": "Síguenos en Facebook", "ar": "تابع على فيسبوك", "fr": "Suivre sur Facebook" },
    "Rate us on": { "es": "Califícanos en", "ar": "قيمنا على", "fr": "Évaluez-nous sur" },
    "Google Reviews": { "es": "Reseñas de Google", "ar": "مراجعات جوجل", "fr": "Avis Google" },
    "Essaouira Vibes": { "es": "Vibras de Essaouira", "ar": "أجواء الصويرة", "fr": "Ambiance d'Essaouira" },
    "Authentic moments captured in the heart of our kitchen.": { "es": "Momentos auténticos capturados en el corazón de nuestra cocina.", "ar": "لحظات أصيلة ملتقطة في قلب مطبخنا.", "fr": "Des moments authentiques capturés au cœur de notre cuisine." },
    "Sourced daily from the blue boats of the port.": { "es": "Obtenido diariamente de los barcos azules del puerto.", "ar": "يتم جلبه يوميا من القوارب الزرقاء في الميناء.", "fr": "Provenant quotidiennement des bateaux bleus du port." },
    "Witness the passion behind every plate.": { "es": "Sé testigo de la pasión detrás de cada plato.", "ar": "شاهد الشغف وراء كل طبق.", "fr": "Témoignez de la passion derrière chaque assiette." },
    "Fishburger Birthday": { "es": "Cumpleaños de Fishburger", "ar": "عيد ميلاد فيش برجر", "fr": "Anniversaire de Fishburger" },
    "Every morning, we hand-select the finest catch from Essaouira's port. Our chefs transform this fresh seafood into extraordinary burgers, crispy tapas, and fusion dishes that blend Atlantic flavors with traditional Moroccan spices.": { "es": "Cada mañana, seleccionamos a mano la mejor captura del puerto de Essaouira. Nuestros chefs transforman estos mariscos frescos en extraordinarias hamburguesas, tapas crujientes y platos de fusión que combinan sabores atlánticos con especias tradicionales marroquíes.", "ar": "كل صباح، نختار أفضل صيد يدويًا من ميناء الصويرة. يقوم الطهاة لدينا بتحويل هذه المأكولات البحرية الطازجة إلى برجر استثنائي وتاباس مقرمش وأطباق فيوجن تمزج النكهات الأطلسية مع التوابل المغربية التقليدية.", "fr": "Chaque matin, nous sélectionnons à la main les meilleures prises du port d'Essaouira. Nos chefs transforment ces fruits de mer frais en burgers extraordinaires, en tapas croustillantes et en plats fusion qui mélangent les saveurs de l'Atlantique avec les épices marocaines traditionnelles." },
    "From our signature crispy fish burger with homemade sharmoula to refreshing mint tea, each item on our menu tells the story of Essaouira's vibrant culinary heritage.": { "es": "Desde nuestra exclusiva hamburguesa de pescado crujiente con sharmoula casera hasta el refrescante té de menta, cada elemento de nuestro menú cuenta la historia de la vibrante herencia culinaria de Essaouira.", "ar": "من برجر السمك المقرمش الخاص بنا المميز مع الشرمولة المنزلية إلى شاي النعناع المنعش، يروي كل عنصر في قائمتنا قصة تراث الصويرة للطهي النابض بالحياة.", "fr": "De notre burger de poisson croustillant signature avec de la charmoula maison au thé à la menthe rafraîchissant, chaque élément de notre menu raconte l'histoire du patrimoine culinaire dynamique d'Essaouira." },
    "Call Us": { "es": "Llámanos", "ar": "اتصل بنا", "fr": "Appelez-nous" },
    "Medina / Near the Port": { "es": "Medina / Cerca del Puerto", "ar": "المدينة / بالقرب من الميناء", "fr": "Médina / Près du Port" },
    "Essaouira, Morocco": { "es": "Esauira, Marruecos", "ar": "الصويرة، المغرب", "fr": "Essaouira, Maroc" },
    "Get Directions": { "es": "Obtener Direcciones", "ar": "احصل على الاتجاهات", "fr": "Obtenir des Itinéraires" },
    "Monday - Sunday": { "es": "Lunes - Domingo", "ar": "الاثنين - الأحد", "fr": "Lundi - Dimanche" },
    "Fresh seafood, local vibes, and the best spices in Essaouira": { "es": "Mariscos frescos, vibras locales y las mejores especias en Essaouira", "ar": "مأكولات بحرية طازجة، أجواء محلية، وأفضل التوابل في الصويرة", "fr": "Fruits de mer frais, ambiance locale et les meilleures épices d'Essaouira" }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    const sortedKeys = Object.keys(translations).sort((a, b) => b.length - a.length);

    const walker = createTextWalker();
    let node;
    while ((node = walker.nextNode())) {
        if (node.originalText === undefined) {
            node.originalText = node.nodeValue;
            node.normalizedText = node.nodeValue.trim().replace(/\s+/g, ' ');
        }
        
        if (lang === 'en') {
            if (node.nodeValue !== node.originalText) {
                node.nodeValue = node.originalText;
            }
            continue;
        }

        let normalized = node.normalizedText;
        if (normalized && translations[normalized] && translations[normalized][lang]) {
            const translation = translations[normalized][lang];
            node.nodeValue = node.originalText.replace(node.originalText.trim(), translation);
            continue;
        }
        
        let currentText = node.originalText;
        let textModified = false;
        
        for (const enText of sortedKeys) {
            const translatedMap = translations[enText];
            if (!translatedMap[lang]) continue;
            
            if (currentText.includes(enText)) {
                currentText = currentText.replace(enText, translatedMap[lang]);
                textModified = true;
            }
        }
        
        if (textModified && node.nodeValue !== currentText) {
            node.nodeValue = currentText;
        }
    }
    
    const langDisplay = document.getElementById('current-lang-text');
    if (langDisplay) langDisplay.textContent = lang.toUpperCase();
    
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.add('hidden');

    const mobileDropdown = document.getElementById('mobile-lang-dropdown');
    if (mobileDropdown) mobileDropdown.classList.add('hidden');
}

function toggleLangDropdown() {
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
    // Close mobile one if open
    const mobileDropdown = document.getElementById('mobile-lang-dropdown');
    if (mobileDropdown) mobileDropdown.classList.add('hidden');
}

function toggleMobileLangDropdown() {
    const dropdown = document.getElementById('mobile-lang-dropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
    // Close desktop one if open
    const desktopDropdown = document.getElementById('lang-dropdown');
    if (desktopDropdown) desktopDropdown.classList.add('hidden');
}

document.addEventListener('click', (e) => {
    // Close desktop dropdown
    const dropdown = document.getElementById('lang-dropdown');
    const langContainer = dropdown?.parentElement;
    if (langContainer && !langContainer.contains(e.target) && !e.target.closest('button[onclick="toggleLangDropdown()"]')) {
        dropdown.classList.add('hidden');
    }
    // Close mobile dropdown
    const mobileDropdown = document.getElementById('mobile-lang-dropdown');
    const mobileLangContainer = mobileDropdown?.parentElement;
    if (mobileLangContainer && !mobileLangContainer.contains(e.target) && !e.target.closest('button[onclick="toggleMobileLangDropdown()"]')) {
        mobileDropdown.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        const walker = createTextWalker();
        let node;
        while ((node = walker.nextNode())) {
            if (node.originalText === undefined) {
                node.originalText = node.nodeValue;
                node.normalizedText = node.nodeValue.trim().replace(/\s+/g, ' ');
            }
        }
    }, 100);
});
