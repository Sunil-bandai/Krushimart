<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600;700&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
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
        body {
            background-color: #0e150f;
            color: #dde5d9;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .perspective-1000 {
            perspective: 1000px;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .product-tilt:hover {
            transform: rotateY(5deg) rotateX(2deg) scale(1.02);
            transition: transform 0.4s ease-out;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .floating-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            z-index: -1;
            opacity: 0.15;
        }
    </style>
</head>
<body class="antialiased">
<!-- Background Decorative Orbs -->
<div class="floating-orb bg-primary w-[500px] h-[500px] -top-20 -left-20"></div>
<div class="floating-orb bg-tertiary-container w-[400px] h-[400px] top-1/2 -right-20"></div>
<!-- TopNavBar -->
<header class="flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md font-['Plus_Jakarta_Sans'] antialiased tracking-tight shadow-xl border-b border-white/20">
<div class="text-2xl font-black text-green-600 dark:text-green-400 drop-shadow-sm">KrushiMart</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-slate-600 dark:text-slate-300 hover:text-green-500 transition-all duration-300" href="#">Home</a>
<a class="text-green-500 dark:text-green-300 font-bold border-b-2 border-green-500" href="#">Shop</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-green-500 transition-all duration-300" href="#">About</a>
</nav>
<div class="flex items-center gap-4">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" data-icon="shopping_cart">shopping_cart</button>
<div class="h-6 w-[1px] bg-white/10 mx-2"></div>
<button class="text-slate-300 hover:text-green-400 font-medium px-4 py-2">Login</button>
<button class="bg-primary-container text-on-primary-container font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform">Register</button>
</div>
</header>
<main class="pt-32 pb-20 px-6 container-max mx-auto">
<!-- Two-column Product Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 perspective-1000">
<!-- Left: Image Gallery -->
<div class="lg:col-span-7 space-y-6">
<div class="glass-panel rounded-[20px] overflow-hidden product-tilt aspect-[4/3] group relative">
<img alt="Organic Alphonso Mangoes" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Close-up of premium golden alphonso mangoes in a wooden crate, soft morning sunlight, vibrant orange skin with subtle dew drops" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJIXrv6JXt2BJC_Q95HhDNgvjJ7ssjsm3Pwxs_7SFpGxp0FqNWeR2XKBLmMuNzbxdPQEzGG4_iDTw3FXFfgmsT2M7ekVTXEGburUyOlP-_IN0gm_CCP0ccBpfooH1O0kLAhvK_BfdaYQnaF9TkjHvg5lLFhg8Da7ASdXem8g5KLdfYJLsIdbhLyM9dteeRFuCe0W9c_CjoqavHz_rpS76qdosdHHxiFFZyULG1utxEGC2hCpxLgB1dFBPalVXuUsiHEV1dsiFPFQ"/>
<div class="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-primary font-bold text-sm">Organic Certified</div>
</div>
<div class="grid grid-cols-4 gap-4">
<button class="glass-panel rounded-xl overflow-hidden border-2 border-primary">
<img class="w-full h-24 object-cover" data-alt="thumbnail of mangoes in crate" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyH51zVpSoJ8Avq0d2yPXdfGHVvXeFZ8Ues8EfAsDxhDQc2TNC8bDJWiBje3ReNls8yMut006Z18wIsMXZJc0snpf3DhOPjIHdPm5x9VyNd_WFf111-BHNVOjq7IH0vrX7Mz2vnmFkAg9gL16Whmi-dIkN6Y2YFFiF0xFJNniyIrYDMThmp-3l4GJwGDeeTlUNJXYr7k2UWEKoC3W9ou7gwQl4OTkq2tK804lkpYSnv8v8Ig6uE8-0Y9PGqjP7IQQ66wYeX4PpNw"/>
</button>
<button class="glass-panel rounded-xl overflow-hidden hover:border-white/40 transition-colors">
<img class="w-full h-24 object-cover" data-alt="close up of sliced mango showing juicy yellow flesh" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrSJrMgQc_XXcOf4GN4wHXCH57oB1Wp3xs-WLV7sBBojikNLZt3nsduL_njyLLJpPoV3gGHmdrRMHV1rhncMpmU_HFptHbMn-UIGpoYJZvkMX9LdXNJrjOfn5jz7Qe46hWS31zdfyDFi8sQeZq5o-jhSfW_keWItJXBX93A51EYRYJSq0FG8ZdFhdT99QLtc-91CwQ98sY6w5G8P1EgnijVXgGxjyN47RnaI7a5FEdsCsk0WfTENkG_iN-qChiN-WAOq_fqGdhuA"/>
</button>
<button class="glass-panel rounded-xl overflow-hidden hover:border-white/40 transition-colors">
<img class="w-full h-24 object-cover" data-alt="mango tree with ripe fruit hanging in a lush orchard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABjPkZGyI7xzxbRi2XS5DNx8eHXnS9swlm8dGpJdQ5epenfD83D4zoxvv2hg9Eosse7uo8-e9jH0XxuCdgGLr_5lS2bi5wDYc48BlRxi9S8MxJoPtO3UPHZ99Yd1kpqSZBi0cclFFK3m3KzVBg5zQviLPn1a9akgcZi5iNI1aVxnq5ljVaMjV38N9M4piKEJ2VqqN328_DBnde7avUZGokyAZzxrtY7kt5iD9iTw1XVfyycvTIn2ZVmhPVrFDFKNhkYgd7agf6LQ"/>
</button>
<button class="glass-panel rounded-xl overflow-hidden hover:border-white/40 transition-colors">
<img class="w-full h-24 object-cover" data-alt="farmer holding fresh mangoes in hands" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMrY8kXtp8SMhy3XsPDBcUYYy9HCMhxtVKbYa9-xMvbAxVzYQe_SlOSNyLtttzOYj7LnZruVyRKUjLutAx0Np7IQhfhKusPiNFNWnzdqSFwJGWZb_tx4R9VZInfVJ8FRjlvZjRdrU2LiYkT0ykJ6OWq0Kw8m1yw4h7INZHEujEB6LL8NVZnJNAYE_9v8OLveFOZKZuXfI4vwMc5CbvUfgqApcoM4MhW2LLxfS1TDqSe8wSinIXOVKlO4uVxHqQghfXw5_8S5YI1w"/>
</button>
</div>
</div>
<!-- Right: Product Information -->
<div class="lg:col-span-5 space-y-8">
<div class="space-y-2">
<span class="text-primary font-label-sm uppercase tracking-widest text-sm">Direct from Ratnagiri</span>
<h1 class="font-h1 text-h1 text-on-surface leading-tight">Premium Alphonso Mangoes (Hapus)</h1>
<div class="flex items-center gap-4 mt-4">
<span class="text-primary font-h2 text-h2">₹850</span>
<span class="text-on-surface-variant font-body-lg text-body-lg">/ Dozen</span>
<span class="bg-primary/20 text-primary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">In Stock</span>
</div>
</div>
<!-- Farmer Info Card -->
<div class="glass-panel p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors group">
<div class="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
<img alt="Farmer Avatar" class="w-full h-full object-cover" data-alt="Close-up portrait of a smiling Indian farmer in traditional attire with a lush green field background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8933X3moV3f1YC1j7nkraV_ue1vJ3t1NI35WibnXWPUVxS9QWWlM7gaaLiU-NApw_KZOpjDrhr8pC2O3fNStf5nUaZIH_qdqeIgJHCkbwaPAE5FmQ5x6ZgWkRSwFOTfc8Twmt8ZceYIYtdni4bb6rmLCZNdhkSa6C6gAXt0Hv_0ACYvYVeN2oFLX_cLXQgoDKFLweTBlc7MnNjQr3ycI93Q7qgZVPijQ2O0pgt7Gyumy7mbGlRLBpKGH97opRUQA9ZO4FePuyjw"/>
</div>
<div class="flex-1">
<p class="text-on-surface font-bold text-lg">Rajesh Deshmukh</p>
<p class="text-on-surface-variant text-sm flex items-center gap-1">
<span class="material-symbols-outlined text-xs" data-icon="location_on">location_on</span>
                            Ratnagiri, Maharashtra
                        </p>
</div>
<div class="glass-panel px-3 py-2 rounded-lg text-center">
<div class="flex items-center text-[#fbbf24] gap-1">
<span class="material-symbols-outlined text-sm" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="font-bold">4.9</span>
</div>
<p class="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">120+ Orders</p>
</div>
</div>
<!-- Quantity Selector & CTA -->
<div class="space-y-6">
<div class="flex items-center gap-6">
<span class="font-bold text-on-surface">Quantity</span>
<div class="flex items-center glass-panel rounded-lg overflow-hidden h-12">
<button class="px-4 hover:bg-white/10 transition-colors material-symbols-outlined" data-icon="remove">remove</button>
<input class="w-12 bg-transparent border-none text-center font-bold text-on-surface focus:ring-0" type="text" value="01"/>
<button class="px-4 hover:bg-white/10 transition-colors material-symbols-outlined" data-icon="add">add</button>
</div>
</div>
<div class="grid grid-cols-2 gap-4">
<button class="bg-primary-container text-on-primary-container py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
<span class="material-symbols-outlined" data-icon="shopping_basket">shopping_basket</span>
                            Add to Cart
                        </button>
<a href="tel:+919876543210" class="border border-primary text-primary py-4 rounded-xl font-bold hover:bg-primary/5 active:scale-95 transition-all text-center flex items-center justify-center gap-2">
    <span class="material-symbols-outlined text-base">call</span>
    Call: +91 98765 43210
</a>
</div>
</div>
<!-- Delivery Details -->
<div class="grid grid-cols-2 gap-4">
<div class="glass-panel p-3 rounded-lg flex items-center gap-3">
<span class="material-symbols-outlined text-primary" data-icon="local_shipping">local_shipping</span>
<div>
<p class="text-xs text-on-surface-variant uppercase font-bold">Delivery</p>
<p class="text-sm font-semibold">2-3 Days</p>
</div>
</div>
<div class="glass-panel p-3 rounded-lg flex items-center gap-3">
<span class="material-symbols-outlined text-primary" data-icon="assignment_return">assignment_return</span>
<div>
<p class="text-xs text-on-surface-variant uppercase font-bold">Returns</p>
<p class="text-sm font-semibold">48h Policy</p>
</div>
</div>
</div>
</div>
</div>
<!-- Tabs Section -->
<div class="mt-24">
<div class="flex gap-12 border-b border-white/10 mb-12 overflow-x-auto whitespace-nowrap">
<button class="pb-4 text-primary border-b-2 border-primary font-bold text-lg">Description</button>
<button class="pb-4 text-on-surface-variant hover:text-on-surface font-bold text-lg transition-colors">Specifications</button>
<button class="pb-4 text-on-surface-variant hover:text-on-surface font-bold text-lg transition-colors">Reviews (48)</button>
<button class="pb-4 text-on-surface-variant hover:text-on-surface font-bold text-lg transition-colors">Farmer's Story</button>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
<!-- Description Content -->
<div class="lg:col-span-2 space-y-6">
<h3 class="font-h3 text-h3 text-on-surface">The King of Mangoes</h3>
<p class="text-on-surface-variant leading-relaxed font-body-md text-body-md">
                        Directly sourced from the sun-drenched orchards of Ratnagiri, our Alphonso mangoes are known for their rich, creamy texture and distinctively sweet aroma. Each fruit is hand-picked at the optimal stage of maturity to ensure peak flavor during delivery. We practice sustainable farming methods, avoiding harsh chemicals to bring you nature's bounty in its purest form.
                    </p>
<ul class="space-y-3">
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
<span>Naturally ripened without calcium carbide</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
<span>Grown in the volcanic soil of the Konkan belt</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
<span>GI Tagged Ratnagiri Hapus authenticity</span>
</li>
</ul>
</div>
<!-- Recent Reviews Mini-Section -->
<div class="space-y-6">
<h3 class="font-h3 text-h3 text-on-surface flex items-center justify-between">
                        Reviews
                        <span class="text-sm font-normal text-primary underline cursor-pointer">View All</span>
</h3>
<!-- Review Card 1 -->
<div class="glass-panel p-5 rounded-xl space-y-3">
<div class="flex justify-between items-start">
<div class="flex items-center gap-3">
<img class="w-10 h-10 rounded-full object-cover" data-alt="customer profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9U0Vm18G6bC_aTTKx6wUYJq9mm0i3pcx2191trj4q8T3nt-kXRnqPdvjoHblbltJ7diDffasmcAhZtiDQJn5hXqDntSb2redlyICdPSb7vzeUWCkUHmvb36KhT47aMrhA88WcYVWH0w0AegIaxmucsRIxmAGJ3mwRpqPLW7G664M3ROfuFeAmSSaS3JSWw_0UDevl00hgf-m6ddQ5bh7VlyBmDSlpuOXwqXwNd_0CDUFh4cV3tTP88ObednLvymxVGvswbaCCXQ"/>
<div>
<p class="font-bold text-sm">Amit Varma</p>
<div class="flex text-[#fbbf24] text-xs">
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
</div>
</div>
<span class="text-[10px] text-on-surface-variant uppercase font-bold">2 days ago</span>
</div>
<p class="text-sm text-on-surface-variant italic">"Absolutely incredible quality. The fragrance filled the whole house as soon as I opened the box. Truly premium!"</p>
</div>
<!-- Review Card 2 -->
<div class="glass-panel p-5 rounded-xl space-y-3">
<div class="flex justify-between items-start">
<div class="flex items-center gap-3">
<img class="w-10 h-10 rounded-full object-cover" data-alt="female customer profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGW-ljoaq7sw2TSI3UeKySz3WqU_uSsT4y70__75s_pcIPFbRaCMGtC1oUWOyPOOC5LjTQf7rl_l1Hy0KgAs8YZvamCcr4uTX6_0a9dO-YV7jsToOr1Gqzb2jNCWxHRo3DeukBetj03jN-IqkZUpZprKD-LpThFNqo_PSYAyZXardVYEmjTeKrL1nSTX4D6-e2HJjow9nqikYfcMuYTdafG0OytsUqBlYQD2qvW2CQgoLML8k1Y5fN68ot4LsrmrWRg7IjvRwYQg"/>
<div>
<p class="font-bold text-sm">Priya Singh</p>
<div class="flex text-[#fbbf24] text-xs">
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[12px]" data-icon="star" data-weight="fill" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-[12px]" data-icon="star">star</span>
</div>
</div>
</div>
<span class="text-[10px] text-on-surface-variant uppercase font-bold">1 week ago</span>
</div>
<p class="text-sm text-on-surface-variant italic">"Fast delivery and very well packaged. Most mangoes were perfectly ripe, just one was slightly over."</p>
</div>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="w-full py-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-900 border-t-4 border-green-600 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest mt-20">
<div class="flex flex-col gap-4">
<div class="text-lg font-bold text-white">KrushiMart</div>
<p class="text-slate-500 lowercase tracking-normal text-sm leading-relaxed">Connecting modern farmers with direct consumers through a premium, tech-driven marketplace.</p>
</div>
<div class="flex flex-wrap gap-6 justify-center md:justify-start">
<a class="text-slate-500 hover:text-green-400 transition-colors" href="#">Privacy Policy</a>
<a class="text-slate-500 hover:text-green-400 transition-colors" href="#">Terms of Service</a>
<a class="text-slate-500 hover:text-green-400 transition-colors" href="#">Contact Us</a>
<a class="text-slate-500 hover:text-green-400 transition-colors" href="#">Sustainability</a>
</div>
<div class="text-slate-500 text-right">
            © 2024 KrushiMart. Future-Forward Growth.
        </div>
</footer>
</body></html>