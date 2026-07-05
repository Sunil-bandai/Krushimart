<html><head><meta charset="utf-8"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
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
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;600&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
</head><body class="dark bg-background font-body-md text-on-surface antialiased overflow-x-hidden">
<!-- Background Decorative Elements -->
<div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full"></div>
<div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary-container/10 blur-[120px] rounded-full"></div>
</div>
<div class="flex min-h-screen">
<!-- SideNavBar Component -->
<aside class="fixed left-0 top-0 h-full flex flex-col pt-20 bg-slate-950/60 backdrop-blur-lg font-['Plus_Jakarta_Sans'] font-medium text-sm h-screen w-64 border-r border-white/10 shadow-2xl z-40">
<div class="px-6 mb-10">
<div class="text-xl font-bold text-green-400">KrushiMart</div>
<div class="mt-4 flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-white/10">
<img alt="User Profile" class="w-full h-full object-cover" data-alt="Close up portrait of a middle-aged male farmer smiling with sun-kissed skin and warm lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxE7DD6d7ZzNKfz_pRaxERQ66-9RSSnGx_24Q3_suSrCCOcO1g4vPQU_lmX4svadJFAyEbfdXVGNDe0IfA8znlVR2PY3BSStG7ymD_YfGl-KQ2iuSGey1ynel9urbsLsltF2yI33UHboCsSz64WpTRT4eNtzvzMeP3BEg1l3PkPdfv1p1OChArSRu8NJfQYGy9ulCtreofw05wzDIq7-3IoLfJRrIn415zzjfoVXtEzI_gcWU3Cl971FCqsg-AlfFzu2HNVkMhvw"/>
</div>
<div>
<p class="text-on-surface font-bold">Farmer Dashboard</p>
<p class="text-xs text-slate-400">Premium Tier</p>
</div>
</div>
</div>
<nav class="flex-1 px-4 space-y-2">
<a class="flex items-center gap-3 bg-green-500/20 text-green-400 border-r-4 border-green-500 px-4 py-3 rounded-r-lg hover:translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="dashboard" data-weight="fill" style="font-variation-settings: 'FILL' 1;">dashboard</span>
          Dashboard
        </a>
<a class="flex items-center gap-3 text-slate-400 hover:bg-white/5 px-4 py-3 transition-colors hover:translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
          Inventory
        </a>
<a class="flex items-center gap-3 text-slate-400 hover:bg-white/5 px-4 py-3 transition-colors hover:translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
          Orders
        </a>
<a class="flex items-center gap-3 text-slate-400 hover:bg-white/5 px-4 py-3 transition-colors hover:translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
          Analytics
        </a>
<a class="flex items-center gap-3 text-slate-400 hover:bg-white/5 px-4 py-3 transition-colors hover:translate-x-1 duration-200" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
          Settings
        </a>
</nav>
<div class="p-6">
<button class="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
<span class="material-symbols-outlined">add</span>
          Add Product
        </button>
</div>
</aside>
<!-- TopNavBar Component -->
<header class="flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md font-['Plus_Jakarta_Sans'] antialiased tracking-tight docked full-width border-b border-white/20 shadow-xl ml-64 w-[calc(100%-16rem)]">
<div class="flex items-center gap-8">
<div class="relative w-96">
<input class="w-full bg-surface-container/50 border border-white/10 rounded-xl px-4 py-2 pl-10 focus:outline-none focus:border-primary/50 text-body-md font-body-md" placeholder="Search products, orders..." type="text"/>
<span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">search</span>
</div>
</div>
<div class="flex items-center gap-6">
<button class="relative text-slate-300 hover:text-primary transition-colors">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
</button>
<button class="text-slate-300 hover:text-primary transition-colors">
<span class="material-symbols-outlined">shopping_cart</span>
</button>
<div class="flex gap-2">
<button class="px-4 py-2 text-slate-300 hover:text-white transition-colors">Login</button>
<button class="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg hover:brightness-110 transition-all">Register</button>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="ml-64 pt-24 pb-20 px-8 w-[calc(100%-16rem)]">
<!-- Welcome Header -->
<div class="mb-8">
<h1 class="font-h1 text-h1 text-on-surface mb-2">Grow your harvest, <span class="text-primary">Farmer Brown.</span></h1>
<p class="text-slate-400 font-body-md">Your marketplace performance is looking healthy today.</p>
</div>
<!-- Stats Grid (Perspective Containers) -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12" style="perspective: 1000px;">
<!-- Card 1 -->
<div class="bg-surface-container/40 backdrop-blur-md border border-white/10 p-6 rounded-[20px] hover:scale-105 transition-all duration-300 hover:rotate-x-2 shadow-xl group">
<div class="flex items-center justify-between mb-4">
<div class="p-3 bg-primary/20 rounded-xl text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span class="material-symbols-outlined" data-icon="inventory" data-weight="fill" style="font-variation-settings: 'FILL' 1;">inventory</span>
</div>
<span class="text-primary text-xs font-bold">+12%</span>
</div>
<p class="text-slate-400 text-sm uppercase tracking-widest font-label-sm">Total Products</p>
<h2 class="text-h2 font-h2 mt-1">142</h2>
</div>
<!-- Card 2 -->
<div class="bg-surface-container/40 backdrop-blur-md border border-white/10 p-6 rounded-[20px] hover:scale-105 transition-all duration-300 hover:rotate-x-2 shadow-xl group">
<div class="flex items-center justify-between mb-4">
<div class="p-3 bg-secondary-container/50 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
<span class="material-symbols-outlined" data-icon="local_shipping" data-weight="fill" style="font-variation-settings: 'FILL' 1;">local_shipping</span>
</div>
<span class="text-primary text-xs font-bold">Active</span>
</div>
<p class="text-slate-400 text-sm uppercase tracking-widest font-label-sm">Active Orders</p>
<h2 class="text-h2 font-h2 mt-1">28</h2>
</div>
<!-- Card 3 -->
<div class="bg-surface-container/40 backdrop-blur-md border border-white/10 p-6 rounded-[20px] hover:scale-105 transition-all duration-300 hover:rotate-x-2 shadow-xl group">
<div class="flex items-center justify-between mb-4">
<div class="p-3 bg-tertiary-container/30 rounded-xl text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
<span class="material-symbols-outlined" data-icon="payments" data-weight="fill" style="font-variation-settings: 'FILL' 1;">payments</span>
</div>
<span class="text-[#fbbf24] text-xs font-bold">Premium</span>
</div>
<p class="text-slate-400 text-sm uppercase tracking-widest font-label-sm">Total Earnings</p>
<h2 class="text-h2 font-h2 mt-1">$4,280</h2>
</div>
<!-- Card 4 -->
<div class="bg-surface-container/40 backdrop-blur-md border border-white/10 p-6 rounded-[20px] hover:scale-105 transition-all duration-300 hover:rotate-x-2 shadow-xl group">
<div class="flex items-center justify-between mb-4">
<div class="p-3 bg-error-container/30 rounded-xl text-error group-hover:bg-error group-hover:text-on-error transition-colors">
<span class="material-symbols-outlined" data-icon="pending_actions" data-weight="fill" style="font-variation-settings: 'FILL' 1;">pending_actions</span>
</div>
<span class="text-error text-xs font-bold">Action Req.</span>
</div>
<p class="text-slate-400 text-sm uppercase tracking-widest font-label-sm">Pending Orders</p>
<h2 class="text-h2 font-h2 mt-1">05</h2>
</div>
</div>
<!-- Main Bento Section -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- My Product Listings (2/3 width) -->
<div class="lg:col-span-2 space-y-6">
<div class="flex items-center justify-between">
<h3 class="font-h3 text-h3">My Product Listings</h3>
<button class="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              View All <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Product Item 1 -->
<div class="bg-surface-container/30 backdrop-blur-md border border-white/10 rounded-[20px] overflow-hidden hover:scale-[1.02] transition-all group">
<div class="h-40 overflow-hidden relative">
<img alt="Fresh Organic Tomatoes" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Vibrant red organic vine tomatoes with water droplets in a rustic wooden basket, soft morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSFMm_UABa0GLHH1cVBsiJcPcKpxNJBNTqReU9FD_0dyS14LBPNWizJdykeQROwlp95tqePHoN9xAR3xWXsbC2LyQe8zfCbtuUFCWh8HYg7lD2LvxBkIYcd0Axwy6JlL0TQTGH2_GvJsNas0uG_osYFhfgmKHm0Yv9JeajbrPD8QwvC0Le7Gy9IIZEC7oCHuJAUEaDwEz2P7rYBlqm_Nima8YN25BdU6bAk8cmByjTjuM6xOH8g1yFGEFx5DjRYG3KymFpvHuuDA"/>
<div class="absolute top-3 right-3 bg-primary-container/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">Active</div>
</div>
<div class="p-5">
<div class="flex justify-between items-start mb-2">
<div>
<p class="text-xs text-primary font-bold uppercase tracking-wider">Vegetables</p>
<h4 class="font-bold text-lg">Heirloom Tomatoes</h4>
</div>
<div class="text-right">
<p class="text-[#fbbf24] font-black text-lg">$4.50</p>
<p class="text-xs text-slate-400">per lb</p>
</div>
</div>
<div class="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-slate-500 text-sm">inventory_2</span>
<span class="text-sm text-slate-300">85 in stock</span>
</div>
<div class="flex gap-2">
<button class="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
<span class="material-symbols-outlined text-sm">edit</span>
</button>
<button class="p-2 hover:bg-error/20 rounded-lg text-error/80 transition-colors">
<span class="material-symbols-outlined text-sm">delete</span>
</button>
</div>
</div>
</div>
</div>
<!-- Product Item 2 -->
<div class="bg-surface-container/30 backdrop-blur-md border border-white/10 rounded-[20px] overflow-hidden hover:scale-[1.02] transition-all group">
<div class="h-40 overflow-hidden relative">
<img alt="Organic Honey" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Golden jars of artisanal organic honey on a sunlit wooden shelf with honeycomb fragments nearby" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV4IxOkcy8kZInVE9YEA3gEsJccJ-rlTkJf3QG6U_ytpHD1oCjrO_cML4vjP1YRTQjqM-MoHCXBudh-NMQPVPvVhu-vGlz2HG4hhWS4KxAeRcEylHxrBIfeljiGGOj8AAtOHju5FDPyk-Yo-Nms4c530B7NjxUXATB7hIcKJlJuYRBpB4VqDiXzgpzkFxGTU4cLYPHRuoXkk7669kojpuu_wHGCebcWU3G-KbuJeWCE7uBV_4BQCYBuLi7A0EdPvqNI01pIgLQcA"/>
<div class="absolute top-3 right-3 bg-secondary-container/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">Pending</div>
</div>
<div class="p-5">
<div class="flex justify-between items-start mb-2">
<div>
<p class="text-xs text-secondary font-bold uppercase tracking-wider">Pantry</p>
<h4 class="font-bold text-lg">Wildflower Honey</h4>
</div>
<div class="text-right">
<p class="text-[#fbbf24] font-black text-lg">$12.00</p>
<p class="text-xs text-slate-400">per jar</p>
</div>
</div>
<div class="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-slate-500 text-sm">inventory_2</span>
<span class="text-sm text-slate-300">12 in stock</span>
</div>
<div class="flex gap-2">
<button class="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
<span class="material-symbols-outlined text-sm">edit</span>
</button>
<button class="p-2 hover:bg-error/20 rounded-lg text-error/80 transition-colors">
<span class="material-symbols-outlined text-sm">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Incoming Orders (1/3 width) -->
<div class="space-y-6">
<h3 class="font-h3 text-h3">Incoming Orders</h3>
<div class="bg-surface-container/30 backdrop-blur-md border border-white/10 rounded-[20px] p-6 space-y-4">
<!-- Order 1 -->
<div class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
<div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-white/5">
<span class="material-symbols-outlined text-slate-400">person</span>
</div>
<div class="flex-1">
<div class="flex justify-between">
<p class="font-bold text-sm">Sarah Jenkins</p>
<span class="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full font-bold">Pending</span>
</div>
<p class="text-xs text-slate-400">3 items • $45.20</p>
</div>
</div>
<!-- Order 2 -->
<div class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
<div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-white/5">
<span class="material-symbols-outlined text-slate-400">person</span>
</div>
<div class="flex-1">
<div class="flex justify-between">
<p class="font-bold text-sm">Mike Ross</p>
<span class="text-[10px] bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded-full font-bold">Confirmed</span>
</div>
<p class="text-xs text-slate-400">1 item • $12.00</p>
</div>
</div>
<!-- Order 3 -->
<div class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
<div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-white/5">
<span class="material-symbols-outlined text-slate-400">person</span>
</div>
<div class="flex-1">
<div class="flex justify-between">
<p class="font-bold text-sm">Elena Gilbert</p>
<span class="text-[10px] bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded-full font-bold">Dispatched</span>
</div>
<p class="text-xs text-slate-400">5 items • $82.50</p>
</div>
</div>
<!-- Order 4 -->
<div class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
<div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center border border-white/5">
<span class="material-symbols-outlined text-slate-400">person</span>
</div>
<div class="flex-1">
<div class="flex justify-between">
<p class="font-bold text-sm">John Doe</p>
<span class="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full font-bold">Delivered</span>
</div>
<p class="text-xs text-slate-400">2 items • $22.10</p>
</div>
</div>
<button class="w-full py-3 mt-4 border border-white/10 rounded-xl text-slate-400 text-sm font-bold hover:bg-white/5 transition-colors">
              Manage All Orders
            </button>
</div>
</div>
</div>
</main>
</div>
<!-- Floating Add Button -->
<button class="fixed bottom-10 right-10 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-50 group">
<span class="material-symbols-outlined text-4xl group-hover:rotate-90 transition-transform">add</span>
<span class="absolute right-20 bg-primary-container text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Add New Listing</span>
</button>
<!-- Footer Component -->
<footer class="ml-64 w-[calc(100%-16rem)] py-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-900 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest border-t-4 border-green-600 border-t border-slate-800">
<div class="space-y-4">
<div class="text-lg font-bold text-white">KrushiMart</div>
<p class="text-slate-500 normal-case tracking-normal">Empowering farmers with direct-to-consumer technology and transparent logistics.</p>
</div>
<div class="flex flex-wrap gap-4 justify-center">
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