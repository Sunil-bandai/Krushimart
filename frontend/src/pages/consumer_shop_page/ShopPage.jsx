<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>KrushiMart | Premium Agritech Marketplace</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .glass-panel {
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .perspective-container {
            perspective: 1000px;
        }
        .tilt-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            transform-style: preserve-3d;
        }
        .tilt-card:hover {
            transform: rotateY(5deg) rotateX(5deg) scale(1.02);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #0e150f;
            overflow-x: hidden;
        }
        .floating-blob {
            position: fixed;
            filter: blur(80px);
            z-index: -1;
            border-radius: 50%;
            opacity: 0.15;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-secondary-container": "#adb4ce",
                      "surface-container-low": "#171d16",
                      "surface-container": "#1b211a",
                      "on-primary-container": "#003111",
                      "on-tertiary": "#660027",
                      "inverse-primary": "#006e2d",
                      "inverse-surface": "#dde5d9",
                      "secondary": "#bec6e0",
                      "on-background": "#dde5d9",
                      "tertiary": "#ffb2bf",
                      "on-error": "#690005",
                      "secondary-fixed": "#dae2fd",
                      "surface-tint": "#62df7d",
                      "secondary-fixed-dim": "#bec6e0",
                      "on-secondary-fixed-variant": "#3f465c",
                      "inverse-on-surface": "#2b322b",
                      "primary-container": "#1ca64d",
                      "surface": "#0e150f",
                      "on-error-container": "#ffdad6",
                      "surface-bright": "#343b33",
                      "on-primary-fixed": "#002109",
                      "on-surface-variant": "#bdcaba",
                      "surface-container-lowest": "#09100a",
                      "on-surface": "#dde5d9",
                      "outline-variant": "#3e4a3d",
                      "surface-container-high": "#252c24",
                      "on-primary-fixed-variant": "#005320",
                      "on-tertiary-fixed-variant": "#8a143c",
                      "outline": "#879485",
                      "on-tertiary-fixed": "#3f0016",
                      "background": "#0e150f",
                      "on-secondary": "#283044",
                      "tertiary-fixed": "#ffd9de",
                      "on-primary": "#003914",
                      "tertiary-container": "#ec6284",
                      "primary-fixed-dim": "#62df7d",
                      "primary-fixed": "#7ffc97",
                      "error": "#ffb4ab",
                      "secondary-container": "#3f465c",
                      "surface-container-highest": "#30372f",
                      "on-secondary-fixed": "#131b2e",
                      "surface-dim": "#0e150f",
                      "on-tertiary-container": "#5a0022",
                      "surface-variant": "#30372f",
                      "error-container": "#93000a",
                      "primary": "#62df7d",
                      "tertiary-fixed-dim": "#ffb2bf"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "sm": "16px",
                      "lg": "48px",
                      "xl": "80px",
                      "container-max": "1280px",
                      "md": "24px",
                      "base": "4px",
                      "xs": "8px",
                      "gutter": "24px"
              },
              "fontFamily": {
                      "body-md": ["Inter"],
                      "label-sm": ["Inter"],
                      "h2": ["Plus Jakarta Sans"],
                      "h3": ["Plus Jakarta Sans"],
                      "body-lg": ["Inter"],
                      "h1": ["Plus Jakarta Sans"]
              },
              "fontSize": {
                      "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                      "label-sm": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
                      "h2": ["36px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                      "h3": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
                      "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                      "h1": ["48px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}]
              }
            },
          },
        }
    </script>
</head>
<body class="font-body-md text-on-surface">
<!-- Background Elements -->
<div class="floating-blob bg-primary w-96 h-96 top-[-10%] left-[-5%]"></div>
<div class="floating-blob bg-tertiary-container w-[500px] h-[500px] bottom-[-10%] right-[-5%]"></div>
<!-- TopNavBar -->
<header class="bg-white/10 dark:bg-slate-900/40 backdrop-blur-md font-['Plus_Jakarta_Sans'] antialiased tracking-tight docked full-width top-0 border-b border-white/20 shadow-xl flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
<div class="flex items-center gap-8">
<span class="text-2xl font-black text-green-600 dark:text-green-400 drop-shadow-sm">KrushiMart</span>
<nav class="hidden md:flex items-center gap-6">
<a class="text-slate-600 dark:text-slate-300 hover:text-green-500 hover:backdrop-blur-2xl hover:bg-white/20 transition-all duration-300" href="#">Home</a>
<a class="text-green-500 dark:text-green-300 font-bold border-b-2 border-green-500 hover:backdrop-blur-2xl hover:bg-white/20 transition-all duration-300" href="#">Shop</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-green-500 hover:backdrop-blur-2xl hover:bg-white/20 transition-all duration-300" href="#">About</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="relative hidden lg:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="bg-surface-variant border-none rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary w-64 text-label-sm" placeholder="Search premium harvest..." type="text"/>
</div>
<button class="p-2 text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
</button>
<div class="h-6 w-[1px] bg-outline-variant mx-2"></div>
<button class="text-slate-600 dark:text-slate-300 hover:text-green-500 font-medium">Login</button>
<button class="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">Register</button>
</div>
</header>
<main class="pt-32 pb-xl px-6 max-w-container-max mx-auto">
<!-- Hero Header -->
<div class="mb-xl text-center">
<h1 class="font-h1 text-h1 text-on-surface mb-xs">Direct from the Soil</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Experience the intersection of traditional wisdom and modern agritech. Premium produce, harvested with precision, delivered to your door.</p>
</div>
<!-- Sticky Filter Bar -->
<div class="sticky top-24 z-40 mb-lg">
<div class="glass-panel bg-surface-container/60 rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
<div class="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
<span class="text-label-sm text-primary uppercase mr-2 shrink-0">Categories</span>
<button class="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap">All Produce</button>
<button class="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap hover:bg-primary/20 transition-colors">Organic Greens</button>
<button class="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap hover:bg-primary/20 transition-colors">Exotic Fruits</button>
<button class="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap hover:bg-primary/20 transition-colors">Root Crops</button>
<button class="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap hover:bg-primary/20 transition-colors">Grains</button>
</div>
<div class="flex items-center gap-8 w-full md:w-auto">
<div class="flex items-center gap-4 flex-1 md:w-48">
<span class="text-label-sm text-on-surface-variant shrink-0">Price Range</span>
<input class="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary" type="range"/>
</div>
<button class="flex items-center gap-2 bg-surface-variant text-on-surface px-4 py-2 rounded-xl text-label-sm">
<span class="material-symbols-outlined text-sm">tune</span>
                        Filters
                    </button>
</div>
</div>
</div>
<!-- Product Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter perspective-container">
<!-- Product Card 1 -->
<div class="tilt-card glass-panel bg-surface-container rounded-xl overflow-hidden group">
<div class="relative h-64 overflow-hidden p-4">
<img class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" data-alt="close-up of fresh vibrant organic strawberries in a rustic wooden crate with soft natural lighting and water droplets" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK5IvgAt6t221nH9Eo_N4omtdxvRHKbPMgBAyb8qC4lHbV3A-N12htGlQaiRhQfBPBVEqnraLx6FYtuH1eAKI0XZHFYFCTsx4wkfmZehG0otAFEM2exdk8OJGHwqrMoxz1W3I1mbh2LaQZu2oovYtx9e668JGYfRYuzbE2jZW8LhhSxBLOuJGiMIL0Q1aWR70dGp5vXOpjaqp_1wj4haF7vDOOpJtZypEiL3ikRXB0a3IDaXgUm8RjCa0ZWddZ7WRB3gKFzg_28g"/>
<span class="absolute top-8 right-8 bg-primary/90 text-on-primary-container px-3 py-1 rounded-lg text-label-sm font-bold shadow-lg">In Stock</span>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">Organic Ruby Strawberries</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[#fbbf24] text-lg" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-label-sm text-on-surface">4.9</span>
</div>
</div>
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary text-sm">person</span>
<span class="text-label-sm text-on-surface-variant">Farmer Ramesh K.</span>
</div>
<div class="flex items-center justify-between mt-6">
<div>
<span class="text-h2 font-h2 text-[#fbbf24]">₹450</span>
<span class="text-label-sm text-on-surface-variant ml-1">/ 500g</span>
</div>
<button class="bg-surface-variant hover:bg-primary hover:text-on-primary-container hover:shadow-[0_0_20px_rgba(98,223,125,0.4)] px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-base">shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
</div>
<!-- Product Card 2 -->
<div class="tilt-card glass-panel bg-surface-container rounded-xl overflow-hidden group">
<div class="relative h-64 overflow-hidden p-4">
<img class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" data-alt="hand-harvested premium golden yukon potatoes on a dark earth background with moody high-contrast lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcVMTT27OlGRDKgP-IYJxIbgSPW1qqbF-ixHLkhCB2RZ-zHDrWzSINwEdpn1s3N3TX9A2nDpjiF0dEN1j7SsWt5uhecYZbXJ9O4atFd6j1pLrq7CqWXkjzb-4BMHBAyC9yozd9LgjpQiUSC3Alqw250fddPJKGspZJRrd0ZQywVqRNV_9KqtuhrWrKiqfgdWPUTRU1Cgg-7N9lKp94L-8-k3iCku6ucRK8ndm4Yyp_S-JdePukY3orFKQ8zH_TdS0qbcnPnez8kw"/>
<span class="absolute top-8 right-8 bg-primary/90 text-on-primary-container px-3 py-1 rounded-lg text-label-sm font-bold shadow-lg">Low Stock</span>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">Golden Yukon Potatoes</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[#fbbf24] text-lg" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-label-sm text-on-surface">4.7</span>
</div>
</div>
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary text-sm">person</span>
<span class="text-label-sm text-on-surface-variant">Sunita Farms</span>
</div>
<div class="flex items-center justify-between mt-6">
<div>
<span class="text-h2 font-h2 text-[#fbbf24]">₹120</span>
<span class="text-label-sm text-on-surface-variant ml-1">/ 1kg</span>
</div>
<button class="bg-surface-variant hover:bg-primary hover:text-on-primary-container hover:shadow-[0_0_20px_rgba(98,223,125,0.4)] px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-base">shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
</div>
<!-- Product Card 3 -->
<div class="tilt-card glass-panel bg-surface-container rounded-xl overflow-hidden group">
<div class="relative h-64 overflow-hidden p-4">
<img class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" data-alt="vibrant greenhouse bell peppers in yellow red and green colors with cinematic side lighting and dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGlStGfD_ChhPiKn8DBDeZLJy4RjH8kAg57j2grWHCRIDBX1RZqcu-sAQRBus7RyJGK_iv9hgyULGhEstg0ihbyHwQyzEp4653pvTe7TdtHQB-w3mVi3bZgbVV6GSupNsu3m7htgISU8m3KrKyrkgnW3fyE7XZwJ7p5Pe3nC567btVzicWDYMl0jroIZAQ7h0XfnTEWTwWU5uruAkS92TN_xxvv7DGUJiRJCNUGKYVf4FmwdazXCbHKEJKu6U_EIfDtShuxWc2rA"/>
<span class="absolute top-8 right-8 bg-primary/90 text-on-primary-container px-3 py-1 rounded-lg text-label-sm font-bold shadow-lg">In Stock</span>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">Tri-Color Bell Peppers</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[#fbbf24] text-lg" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-label-sm text-on-surface">4.8</span>
</div>
</div>
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary text-sm">person</span>
<span class="text-label-sm text-on-surface-variant">Green Valley Coop</span>
</div>
<div class="flex items-center justify-between mt-6">
<div>
<span class="text-h2 font-h2 text-[#fbbf24]">₹280</span>
<span class="text-label-sm text-on-surface-variant ml-1">/ Pack</span>
</div>
<button class="bg-surface-variant hover:bg-primary hover:text-on-primary-container hover:shadow-[0_0_20px_rgba(98,223,125,0.4)] px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-base">shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
</div>
<!-- Product Card 4 -->
<div class="tilt-card glass-panel bg-surface-container rounded-xl overflow-hidden group">
<div class="relative h-64 overflow-hidden p-4">
<img class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" data-alt="cluster of fresh green broccoli florets with detailed texture and professional culinary studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYqnpKNkuh5gRDC_27dIOTSKrx6PAS8lp7VybPfqcEppwfBz9lgVADelFna_Y57MQ_Vk8nSPzu7SPwZfzuQJvno8zL7KhA3RsIJtKzFfg1dlqcJdrm9Lat6MBkgUzYYcITZJ2rlymkEbLjDTT4ChZMPu8OSSAiOqmW7UbCA_80U-zoYQiW4NwJ_0LDPWYUJ0a7bqCNho_sqXiy3suZsqaIf8ngF0wGupcxmYH1rRsDjRkj7ZZRadU8FDxAd1zZsE6Ek07lhchdRA"/>
<span class="absolute top-8 right-8 bg-primary/90 text-on-primary-container px-3 py-1 rounded-lg text-label-sm font-bold shadow-lg">In Stock</span>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">Hydroponic Broccoli</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[#fbbf24] text-lg" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-label-sm text-on-surface">4.6</span>
</div>
</div>
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary text-sm">person</span>
<span class="text-label-sm text-on-surface-variant">Dr. Green Labs</span>
</div>
<div class="flex items-center justify-between mt-6">
<div>
<span class="text-h2 font-h2 text-[#fbbf24]">₹180</span>
<span class="text-label-sm text-on-surface-variant ml-1">/ 250g</span>
</div>
<button class="bg-surface-variant hover:bg-primary hover:text-on-primary-container hover:shadow-[0_0_20px_rgba(98,223,125,0.4)] px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-base">shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
</div>
<!-- Product Card 5 -->
<div class="tilt-card glass-panel bg-surface-container rounded-xl overflow-hidden group">
<div class="relative h-64 overflow-hidden p-4">
<img class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" data-alt="pile of ripe organic oranges with vibrant orange skin and soft ambient sunlight in an orchard setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw7zlayMcVdw9ZmCSecUStgg9k1Ympe5Ndm0hWqbIwr3zhlwv2wNPURSYfkvmQwfUnCFt6bm6Y6XFJyZlYe9JKPImALpD0zVq7zYIIh8Q_OWCyr98SCrQkRO_ISBCbJwKErzMKkJh0RjhhH0G8znzXX1uSqxgqpQwSSCIXaerCCwrkEtmxrtxrs6H07eGQnffbY0a_IuBStLw0crXsOqhNyqxv49qlQdxK-yTJhRaxeNREGvVaQjimdiNY3LRr_Mh83zXsRqt6fA"/>
<span class="absolute top-8 right-8 bg-primary/90 text-on-primary-container px-3 py-1 rounded-lg text-label-sm font-bold shadow-lg">In Stock</span>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">Nagpur Zest Oranges</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[#fbbf24] text-lg" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-label-sm text-on-surface">4.9</span>
</div>
</div>
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary text-sm">person</span>
<span class="text-label-sm text-on-surface-variant">Citrus Heights</span>
</div>
<div class="flex items-center justify-between mt-6">
<div>
<span class="text-h2 font-h2 text-[#fbbf24]">₹320</span>
<span class="text-label-sm text-on-surface-variant ml-1">/ Dozen</span>
</div>
<button class="bg-surface-variant hover:bg-primary hover:text-on-primary-container hover:shadow-[0_0_20px_rgba(98,223,125,0.4)] px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-base">shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
</div>
<!-- Product Card 6 -->
<div class="tilt-card glass-panel bg-surface-container rounded-xl overflow-hidden group">
<div class="relative h-64 overflow-hidden p-4">
<img class="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110" data-alt="close-up of purple organic eggplants with glossy skins and artistic top-down lighting on a rustic background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn_sb2PW6emvwf1ANpP7mpm3nZxwgffpCtjHRb61c5NTRCVqy6ZQW1s3vjHHIRvilpfGLhLR-JLqjd5nohMcPy6vuigqK6_9D5nb2PYV73ZKq_BeAqL_0UzJlsMZw-Qm77EaLDXm8jSzJGg-wZJVYfT9ErytUi5qn8OKP5hb16gkg5xwiR0-RW4EVtMHTDUiNO0wFEnFhXwC5HnZ4_zI8JifAMDwunXj1i_V0LpkT2oklEaWqu8NeDKvsh-uq07gReGSlrude91w"/>
<span class="absolute top-8 right-8 bg-error-container text-on-error-container px-3 py-1 rounded-lg text-label-sm font-bold shadow-lg">Out of Stock</span>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-h3 text-h3 text-on-surface group-hover:text-primary transition-colors">Heritage Purple Brinjal</h3>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-[#fbbf24] text-lg" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="text-label-sm text-on-surface">4.5</span>
</div>
</div>
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary text-sm">person</span>
<span class="text-label-sm text-on-surface-variant">Patel Heirloom Seeds</span>
</div>
<div class="flex items-center justify-between mt-6">
<div>
<span class="text-h2 font-h2 text-[#fbbf24]">₹95</span>
<span class="text-label-sm text-on-surface-variant ml-1">/ 500g</span>
</div>
<button class="bg-surface-variant opacity-50 cursor-not-allowed px-6 py-3 rounded-xl font-bold flex items-center gap-2" disabled="">
<span class="material-symbols-outlined text-base">notifications</span>
                            Notify Me
                        </button>
</div>
</div>
</div>
</div>
<!-- Pagination -->
<div class="mt-xl flex items-center justify-center gap-4">
<button class="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-on-surface hover:bg-primary transition-colors">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<div class="flex items-center gap-2">
<button class="w-12 h-12 rounded-xl bg-primary text-on-primary-container font-bold shadow-[0_0_20px_rgba(98,223,125,0.3)]">1</button>
<button class="w-12 h-12 rounded-xl glass-panel text-on-surface hover:bg-primary/20 transition-colors font-bold">2</button>
<button class="w-12 h-12 rounded-xl glass-panel text-on-surface hover:bg-primary/20 transition-colors font-bold">3</button>
<span class="text-on-surface-variant mx-2">...</span>
<button class="w-12 h-12 rounded-xl glass-panel text-on-surface hover:bg-primary/20 transition-colors font-bold">12</button>
</div>
<button class="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-on-surface hover:bg-primary transition-colors">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</main>
<!-- Footer -->
<footer class="bg-slate-900 w-full border-t-4 border-green-600 w-full py-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-xl">
<div>
<span class="text-lg font-bold text-white mb-xs block">KrushiMart</span>
<p class="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest text-slate-500">© 2024 KrushiMart. Future-Forward Growth.</p>
</div>
<div class="flex justify-center gap-8">
<a class="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest text-slate-500 hover:text-green-400 transition-colors" href="#">Privacy Policy</a>
<a class="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest text-slate-500 hover:text-green-400 transition-colors" href="#">Terms of Service</a>
<a class="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest text-slate-500 hover:text-green-400 transition-colors" href="#">Contact Us</a>
</div>
<div class="flex justify-end gap-6">
<a class="text-green-500 hover:text-green-400" href="#">
<span class="material-symbols-outlined">social_leaderboard</span>
</a>
<a class="text-green-500 hover:text-green-400" href="#">
<span class="material-symbols-outlined">eco</span>
</a>
<a class="text-green-500 hover:text-green-400" href="#">
<span class="material-symbols-outlined">mail</span>
</a>
</div>
</footer>
</body></html>