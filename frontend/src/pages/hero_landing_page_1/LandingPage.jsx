<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
<style>
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .perspective-container {
            perspective: 1000px;
        }
        .tilt-card {
            transform: rotateY(-15deg) rotateX(5deg);
            transition: transform 0.5s ease;
        }
        .tilt-card:hover {
            transform: rotateY(0deg) rotateX(0deg) scale(1.05);
        }
        .glow-blob {
            filter: blur(80px);
            opacity: 0.4;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md selection:bg-primary selection:text-on-primary overflow-x-hidden">
<nav class="flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md font-['Plus_Jakarta_Sans'] antialiased tracking-tight shadow-xl border-b border-white/20">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-3xl" data-icon="eco" style="font-variation-settings: 'FILL' 1;">eco</span>
<span class="text-2xl font-black text-green-600 dark:text-green-400 drop-shadow-sm">KrushiMart</span>
</div>
<div class="hidden md:flex gap-8">
<a class="text-green-500 dark:text-green-300 font-bold border-b-2 border-green-500" href="#">Home</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-green-500 transition-all duration-300" href="#">Shop</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-green-500 transition-all duration-300" href="#">About</a>
</div>
<div class="flex items-center gap-6">
<div class="relative group">
<span class="material-symbols-outlined text-on-surface cursor-pointer hover:text-primary transition-colors" data-icon="shopping_cart">shopping_cart</span>
<span class="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
</div>
<div class="flex gap-4">
<button class="px-5 py-2 text-slate-300 font-semibold hover:text-white transition-colors">Login</button>
<button class="px-5 py-2 bg-primary text-on-primary rounded-lg font-bold shadow-lg shadow-primary/20 active:scale-95 duration-150">Register</button>
</div>
</div>
</nav>
<main class="relative pt-20">
<div class="absolute top-20 left-1/4 w-96 h-96 bg-primary glow-blob rounded-full -z-10 animate-pulse"></div>
<div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-tertiary glow-blob rounded-full -z-10"></div>
<section class="min-h-screen flex items-center px-6 md:px-xl py-xl max-w-container-max mx-auto">
<div class="grid grid-cols-1 md:grid-cols-2 gap-xl items-center w-full">
<div class="space-y-md">
<div class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-label-sm">
<span class="material-symbols-outlined text-sm mr-2" data-icon="verified" style="font-variation-settings: 'FILL' 1;">verified</span>
                        DIRECT FARM-TO-CONSUMER
                    </div>
<h1 class="font-h1 text-h1 text-white leading-tight">
                        Fresh from Farm to <br/>
<span class="text-primary italic">Your Table</span>
</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                        Connecting farmers directly to consumers. No middlemen. Just fresh produce harvested at its peak and delivered to your doorstep.
                    </p>
<div class="flex flex-wrap gap-md pt-sm">
<button class="px-xl py-md bg-primary text-on-primary font-h3 rounded-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                            Start Selling
                        </button>
<button class="px-xl py-md glass-panel text-white font-h3 rounded-xl border border-white/20 hover:bg-white/10 transition-all">
                            Shop Now
                        </button>
</div>
</div>
<div class="perspective-container hidden md:block">
<div class="relative w-full h-[500px]">
<div class="absolute top-0 right-0 w-64 h-80 glass-panel rounded-2xl tilt-card p-6 shadow-2xl overflow-hidden">
<img alt="Fresh Produce" class="w-full h-40 object-cover rounded-xl mb-4" data-alt="Close-up of vibrant organic green broccoli with dew drops under professional studio lighting, macro photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSydIFg_IFxqll-6P1sfv4XZ9P7UzfaddbQG1HgtcA-IgnHixxNFZzLOfAAYJ60Wl34IuycJbPlJ8VI4yISyzd33cKFPF9FYm12WrdiEixLDCupKXw0y7wSNbWnhvLOuX-eFCKmEvAcpAGmIFqFzLiy1wbTGpRcS9C9lt2eSxWpfDUUd7Lmg-PSxGOdCpRk06MJNZ7_x5sK49vFuK0KPHmFjcKWQPOeUf6nrxtDJJ99V-DDGXjRdI0DrmuHreZ_Oqo-5Q_Mb9goA"/>
<div class="font-h3 text-white">Fresh Broccoli</div>
<div class="text-primary font-bold text-xl">$4.50 <span class="text-xs text-on-surface-variant font-normal">/kg</span></div>
<div class="mt-4 flex gap-2">
<span class="px-2 py-1 bg-primary/20 text-primary text-[10px] rounded-full">Organic</span>
<span class="px-2 py-1 bg-on-secondary-container/10 text-on-secondary-container text-[10px] rounded-full">In Stock</span>
</div>
</div>
<div class="absolute bottom-10 left-0 w-64 h-80 glass-panel rounded-2xl tilt-card p-6 shadow-2xl z-10" style="transition-delay: 0.1s;">
<img alt="Organic Carrots" class="w-full h-40 object-cover rounded-xl mb-4" data-alt="Bunch of freshly harvested organic carrots with green tops on a dark rustic wooden surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPi_eKSiZ8t5iCE45BbJmttS7O49P48BCWbQF80gGy3G7DCSgBfOjouXCHmK5nal9qf2tg0rIGATiBeI8-m8Q5ZwOMk_75aXhMKmoG2EKUAQRl_fcd5J1xqkwwqsgC66gdbl72Iye-WFdHvovOhuVdWy6QZPULgmCoMCMgFbA32euhgvwMaXjqlNZ1o7lEufwhPROlV5h5DW9usnYVXUkxHP7e1lpLjKgXxV1j_KnxOrFYusUi8bjhOG_Hs4DjokmVARscNjJVfg"/>
<div class="font-h3 text-white">Organic Carrots</div>
<div class="text-primary font-bold text-xl">$2.99 <span class="text-xs text-on-surface-variant font-normal">/bunch</span></div>
<div class="mt-4 flex gap-2">
<span class="px-2 py-1 bg-primary/20 text-primary text-[10px] rounded-full">Direct</span>
<span class="px-2 py-1 bg-on-secondary-container/10 text-on-secondary-container text-[10px] rounded-full">Local</span>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="w-full py-lg glass-panel border-y border-white/5">
<div class="max-w-container-max mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-lg text-center">
<div class="flex flex-col items-center">
<div class="text-h1 font-black text-primary">500+</div>
<div class="text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">Active Farmers</div>
</div>
<div class="flex flex-col items-center">
<div class="text-h1 font-black text-primary">10,000+</div>
<div class="text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">Fresh Products</div>
</div>
<div class="flex flex-col items-center">
<div class="text-h1 font-black text-primary">50+</div>
<div class="text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">Cities Served</div>
</div>
</div>
</section>
<section class="py-xl px-6 max-w-container-max mx-auto">
<div class="text-center mb-xl">
<h2 class="font-h2 text-h2 text-white mb-4">How It Works</h2>
<div class="w-24 h-1 bg-primary mx-auto rounded-full"></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<div class="glass-panel p-xl rounded-3xl hover:bg-white/5 transition-all group">
<div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary text-4xl" data-icon="person_add">person_add</span>
</div>
<h3 class="font-h3 text-h3 text-white mb-sm">Register</h3>
<p class="text-on-surface-variant">Create your account as a farmer or a buyer. Simple onboarding to get you started in minutes.</p>
</div>
<div class="glass-panel p-xl rounded-3xl hover:bg-white/5 transition-all group">
<div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary text-4xl" data-icon="list_alt">list_alt</span>
</div>
<h3 class="font-h3 text-h3 text-white mb-sm">List</h3>
<p class="text-on-surface-variant">Farmers list their harvest dates and prices. Quality checks ensure only the best reaches you.</p>
</div>
<div class="glass-panel p-xl rounded-3xl hover:bg-white/5 transition-all group">
<div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary text-4xl" data-icon="shopping_basket">shopping_basket</span>
</div>
<h3 class="font-h3 text-h3 text-white mb-sm">Buy</h3>
<p class="text-on-surface-variant">Securely purchase fresh produce and track your order from the farm to your doorstep.</p>
</div>
</div>
</section>
<section class="py-xl px-6 max-w-container-max mx-auto">
<div class="flex justify-between items-end mb-xl">
<div>
<h2 class="font-h2 text-h2 text-white">Product Categories</h2>
<p class="text-on-surface-variant mt-2">Explore the freshest harvest by category</p>
</div>
<button class="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
                    View All <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-2 md:grid-cols-5 gap-md">
<div class="glass-panel p-md rounded-2xl text-center group cursor-pointer hover:border-primary/50 transition-all">
<div class="text-4xl mb-4 group-hover:scale-125 transition-transform">🥬</div>
<div class="font-bold text-white">Leafy Greens</div>
</div>
<div class="glass-panel p-md rounded-2xl text-center group cursor-pointer hover:border-primary/50 transition-all">
<div class="text-4xl mb-4 group-hover:scale-125 transition-transform">🍎</div>
<div class="font-bold text-white">Fresh Fruits</div>
</div>
<div class="glass-panel p-md rounded-2xl text-center group cursor-pointer hover:border-primary/50 transition-all">
<div class="text-4xl mb-4 group-hover:scale-125 transition-transform">🥔</div>
<div class="font-bold text-white">Root Veggies</div>
</div>
<div class="glass-panel p-md rounded-2xl text-center group cursor-pointer hover:border-primary/50 transition-all">
<div class="text-4xl mb-4 group-hover:scale-125 transition-transform">🥛</div>
<div class="font-bold text-white">Dairy Farm</div>
</div>
<div class="glass-panel p-md rounded-2xl text-center group cursor-pointer hover:border-primary/50 transition-all">
<div class="text-4xl mb-4 group-hover:scale-125 transition-transform">🍯</div>
<div class="font-bold text-white">Organic Honey</div>
</div>
</div>
</section>
<section class="py-xl px-6 max-w-container-max mx-auto mb-xl">
<div class="text-center mb-xl">
<h2 class="font-h2 text-h2 text-white">Featured Products</h2>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
<div class="glass-panel rounded-3xl overflow-hidden group">
<div class="relative h-64 overflow-hidden">
<img alt="Organic Spinach" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Top down view of fresh organic spinach leaves in a rustic wooden bowl, dark moody background, high contrast" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlVqpsKnCx690eWrI0HjBelxdw76dCBB0gx5MD8MCnDUb05gC8kWTVGw86v5U2sdMcQD1XlN9cwUhV8_5qj5CV05pqKBmbrQVri1mJ6dqvw1tOeVeiWu3-r3s-5ipaxATSTquBDz9W2cEEeXFawDRdT1w_YaLPxYryLH9W8AYTUvh56BpwagwnvPkoxbOZc2dP4c710clVxvfHWdY2rSPiG2cE_i6fGIPw3PzmWTKhyFejVQxg5thwxE5Le25yF9F1QaNzaHXEhA"/>
<div class="absolute top-4 right-4 bg-primary text-on-primary font-bold px-3 py-1 rounded-full text-xs">New</div>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-white text-lg">Fresh Spinach</h3>
<span class="text-primary font-bold">$3.20</span>
</div>
<p class="text-on-surface-variant text-sm mb-4">Farm-picked today, rich in iron and nutrients.</p>
<button class="w-full py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors">
<span class="material-symbols-outlined text-sm" data-icon="add_shopping_cart">add_shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
<div class="glass-panel rounded-3xl overflow-hidden group">
<div class="relative h-64 overflow-hidden">
<img alt="Fresh Oranges" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Juicy halved oranges showing vibrant segments with water droplets, bright sunlit background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6v1Jzg0ufRsCI0zslowThIOZmydF4sdDwwzwBzihC7yd2w8Tc1uk4g9c14IsJ6EVBC4p9ZOqLMBQ3jm-eJgEouEv-R7kHE8oYqwpHOBYx572akdjLa8fpXXZhYcWpU6ltzT8u2q9WTIwkgm8H8f6eLbhvVjxgZ2T9lNt2WUpF3CyClJzK8Hok_LnXA5jJ301dkKPYN-SYnQFWSW34np7r7I0wdbI2Wtvm9iLS73ePT2QHCKEKKIlBy4cYhPVOUoNzTl1u7ISdCQ"/>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-white text-lg">Valencia Oranges</h3>
<span class="text-primary font-bold">$5.50</span>
</div>
<p class="text-on-surface-variant text-sm mb-4">Sweet and juicy, perfect for fresh morning juice.</p>
<button class="w-full py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors">
<span class="material-symbols-outlined text-sm" data-icon="add_shopping_cart">add_shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
<div class="glass-panel rounded-3xl overflow-hidden group">
<div class="relative h-64 overflow-hidden">
<img alt="Potatoes" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Group of earthy russet potatoes on a burlap sack, cinematic lighting, earthy tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7BA0-SheqF_j7EQMw0o9IEREsYX7u3u4iZ7-UQWyFPwRnMfqXHucja-6Pz0hWRGDPY6zj_nptvjwj5ZrADwlCPybz6v5VQHuu7Hl9ic3XjpNIS-dEwwJBAeaGN5_5ZdFNTIfSi4fUzI1QAAkx20Lg8pR9D8S7KKCbdHt19MZNheOl73EvfR3JzypW27638hLLf_zwdO3E19JZZJe2oi8FC73XdgXz8X4dG5njsI6Z8qgCqxqU3pJKwjl90fJVz75ftzOppKVXdg"/>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-white text-lg">Russet Potatoes</h3>
<span class="text-primary font-bold">$2.10</span>
</div>
<p class="text-on-surface-variant text-sm mb-4">Earthy taste, great for roasting or mashing.</p>
<button class="w-full py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors">
<span class="material-symbols-outlined text-sm" data-icon="add_shopping_cart">add_shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
<div class="glass-panel rounded-3xl overflow-hidden group">
<div class="relative h-64 overflow-hidden">
<img alt="Farm Eggs" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="A carton of brown organic farm eggs with a single feather resting on one, soft natural morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp1HtZsM2ylS9nI072fwo6acchmlJM9YUT2EXGqY34AO-9v7cZzp-1UBA2KBrCR7gTlqLjUW8LoJAgjYqym7RfZAsHfalvi6WBKA1IYbmzDJZxoF5xXka8wmIfn60ypi3s17HQkJJ39zc4h1CZsvL479vkWA1OdYzV7O5WiBRxSET5PmcBcQHR0g8awxI4dzp-YU-OESzRV8f9OKsJ7Q1Wtou_Bckvk96OfM7QxZM6wxxA-JP6hsm-MwSqeQeyEDPLEbRYs9BzVw"/>
<div class="absolute top-4 right-4 bg-tertiary-container text-white font-bold px-3 py-1 rounded-full text-xs">Best Seller</div>
</div>
<div class="p-6">
<div class="flex justify-between items-start mb-2">
<h3 class="font-bold text-white text-lg">Organic Farm Eggs</h3>
<span class="text-primary font-bold">$6.00</span>
</div>
<p class="text-on-surface-variant text-sm mb-4">Free-range, high protein, golden yolks.</p>
<button class="w-full py-3 bg-secondary-container text-on-secondary-container rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-colors">
<span class="material-symbols-outlined text-sm" data-icon="add_shopping_cart">add_shopping_cart</span>
                            Add to Cart
                        </button>
</div>
</div>
</div>
</section>
</main>
<footer class="w-full py-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-900 border-t-4 border-green-600 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest">
<div class="space-y-4">
<div class="text-lg font-bold text-white">KrushiMart</div>
<p class="text-slate-500 normal-case tracking-normal text-sm leading-relaxed">
                Empowering farmers with direct access to global markets while ensuring consumers get the freshest harvest.
            </p>
</div>
<div class="flex flex-col md:flex-row gap-6 justify-center">
<a class="text-slate-500 hover:text-green-400 transition-colors" href="#">Privacy Policy</a>
<a class="text-slate-500 hover:text-green-400 transition-colors" href="#">Terms of Service</a>
<a class="text-slate-500 hover:text-green-400 transition-colors" href="#">Contact Us</a>
<a class="text-slate-500 hover:text-green-400 transition-colors" href="#">Sustainability</a>
</div>
<div class="text-right">
<p class="text-slate-500">© 2024 KrushiMart. Future-Forward Growth.</p>
</div>
</footer>
</body></html>