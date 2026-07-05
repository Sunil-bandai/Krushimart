<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>KrushiMart Admin Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        body {
            background-color: #0e150f;
            overflow-x: hidden;
        }
        .perspective-container {
            perspective: 1000px;
        }
        .glass-panel {
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
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
<body class="bg-surface text-on-surface font-body-md">
<!-- Top Navigation Anchor -->
<header class="bg-white/10 dark:bg-slate-900/40 backdrop-blur-md font-['Plus_Jakarta_Sans'] antialiased tracking-tight shadow-xl flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 border-b border-white/20">
<div class="text-2xl font-black text-green-600 dark:text-green-400 drop-shadow-sm">KrushiMart</div>
<div class="hidden md:flex gap-8 items-center">
<nav class="flex gap-6">
<a class="text-green-500 dark:text-green-300 font-bold border-b-2 border-green-500" href="#">Home</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-green-500 hover:backdrop-blur-2xl hover:bg-white/20 transition-all duration-300" href="#">Shop</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-green-500 hover:backdrop-blur-2xl hover:bg-white/20 transition-all duration-300" href="#">About</a>
</nav>
<div class="flex items-center gap-4">
<button class="text-slate-300 hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
</button>
<button class="px-4 py-2 text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-all">Login</button>
<button class="px-4 py-2 bg-primary text-on-primary rounded-lg font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">Register</button>
</div>
</div>
</header>
<!-- Sidebar Navigation -->
<aside class="fixed left-0 top-0 h-full w-64 bg-slate-950/60 backdrop-blur-lg border-r border-white/10 flex flex-col pt-24 z-40">
<div class="px-6 mb-8 flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="admin_panel_settings">admin_panel_settings</span>
</div>
<div>
<h4 class="text-label-sm font-h3 text-on-surface">Farmer Dashboard</h4>
<p class="text-[10px] text-primary uppercase tracking-tighter">Premium Tier</p>
</div>
</div>
<nav class="flex-1 px-4 space-y-2">
<a class="flex items-center gap-4 bg-green-500/20 text-green-400 border-r-4 border-green-500 px-4 py-3 rounded-r-lg font-['Plus_Jakarta_Sans'] font-medium text-sm transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-4 text-slate-400 hover:bg-white/5 px-4 py-3 font-['Plus_Jakarta_Sans'] font-medium text-sm hover:translate-x-1 duration-200 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
<span>Inventory</span>
</a>
<a class="flex items-center gap-4 text-slate-400 hover:bg-white/5 px-4 py-3 font-['Plus_Jakarta_Sans'] font-medium text-sm hover:translate-x-1 duration-200 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
<span>Orders</span>
</a>
<a class="flex items-center gap-4 text-slate-400 hover:bg-white/5 px-4 py-3 font-['Plus_Jakarta_Sans'] font-medium text-sm hover:translate-x-1 duration-200 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span>Analytics</span>
</a>
<a class="flex items-center gap-4 text-slate-400 hover:bg-white/5 px-4 py-3 font-['Plus_Jakarta_Sans'] font-medium text-sm hover:translate-x-1 duration-200 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</a>
</nav>
<div class="p-6">
<button class="w-full py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all">
<span class="material-symbols-outlined" data-icon="add">add</span>
                Add Product
            </button>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-64 pt-28 px-8 pb-12 min-h-screen bg-surface">
<!-- Dashboard Header -->
<div class="mb-10 flex justify-between items-end">
<div>
<h1 class="font-h1 text-h2 text-on-surface mb-2">Overview</h1>
<p class="text-on-surface-variant font-body-md">Manage your agricultural ecosystem and monitor marketplace health.</p>
</div>
<div class="flex gap-3">
<div class="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-lg border border-outline-variant">
<span class="material-symbols-outlined text-slate-400" data-icon="calendar_today">calendar_today</span>
<span class="text-label-sm text-on-surface-variant">Last 30 Days</span>
</div>
</div>
</div>
<!-- 4 Large Stats Cards - Bento Grid Style -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 perspective-container">
<!-- Card 1 -->
<div class="glass-panel p-6 rounded-2xl bg-surface-container hover:scale-[1.02] transition-transform duration-300 border-l-4 border-primary">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-primary/10 rounded-xl">
<span class="material-symbols-outlined text-primary" data-icon="payments">payments</span>
</div>
<span class="text-primary text-xs font-bold">+12.5%</span>
</div>
<h3 class="text-on-surface-variant text-label-sm uppercase mb-1">Total Revenue</h3>
<p class="text-h3 font-h2 text-on-surface">₹4,28,400</p>
</div>
<!-- Card 2 -->
<div class="glass-panel p-6 rounded-2xl bg-surface-container hover:scale-[1.02] transition-transform duration-300 border-l-4 border-tertiary-container">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-tertiary-container/10 rounded-xl">
<span class="material-symbols-outlined text-tertiary-container" data-icon="groups">groups</span>
</div>
<span class="text-tertiary-container text-xs font-bold">+4.2%</span>
</div>
<h3 class="text-on-surface-variant text-label-sm uppercase mb-1">Active Farmers</h3>
<p class="text-h3 font-h2 text-on-surface">1,842</p>
</div>
<!-- Card 3 -->
<div class="glass-panel p-6 rounded-2xl bg-surface-container hover:scale-[1.02] transition-transform duration-300 border-l-4 border-secondary">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-secondary/10 rounded-xl">
<span class="material-symbols-outlined text-secondary" data-icon="package_2">package_2</span>
</div>
<span class="text-secondary text-xs font-bold">+18.0%</span>
</div>
<h3 class="text-on-surface-variant text-label-sm uppercase mb-1">Total Orders</h3>
<p class="text-h3 font-h2 text-on-surface">12,490</p>
</div>
<!-- Card 4 -->
<div class="glass-panel p-6 rounded-2xl bg-surface-container hover:scale-[1.02] transition-transform duration-300 border-l-4 border-surface-tint">
<div class="flex justify-between items-start mb-4">
<div class="p-3 bg-surface-tint/10 rounded-xl">
<span class="material-symbols-outlined text-surface-tint" data-icon="trending_up">trending_up</span>
</div>
<span class="text-surface-tint text-xs font-bold">+2.1%</span>
</div>
<h3 class="text-on-surface-variant text-label-sm uppercase mb-1">Conversion Rate</h3>
<p class="text-h3 font-h2 text-on-surface">3.8%</p>
</div>
</div>
<!-- Analytics Charts -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
<!-- Orders Area Chart Wireframe -->
<div class="lg:col-span-2 glass-panel p-8 rounded-2xl bg-surface-container h-[400px] flex flex-col">
<div class="flex justify-between items-center mb-8">
<h3 class="font-h3 text-on-surface">Order Performance Over Time</h3>
<div class="flex gap-4">
<div class="flex items-center gap-2">
<div class="w-3 h-3 bg-primary rounded-full"></div>
<span class="text-xs text-on-surface-variant">This Month</span>
</div>
<div class="flex items-center gap-2">
<div class="w-3 h-3 bg-secondary-container rounded-full"></div>
<span class="text-xs text-on-surface-variant">Last Month</span>
</div>
</div>
</div>
<div class="flex-1 relative border-l border-b border-outline-variant/30 ml-6 mb-6">
<!-- Wireframe Path -->
<svg class="absolute inset-0 w-full h-full" preserveaspectratio="none">
<path class="text-primary/50" d="M0,180 Q100,140 200,160 T400,80 T600,120 T800,40" fill="none" stroke="currentColor" stroke-width="3"></path>
<path class="opacity-20" d="M0,180 Q100,140 200,160 T400,80 T600,120 T800,40 L800,200 L0,200 Z" fill="url(#grad1)"></path>
<defs>
<lineargradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" style="stop-color:var(--tw-primary);stop-opacity:1"></stop>
<stop offset="100%" style="stop-color:var(--tw-primary);stop-opacity:0"></stop>
</lineargradient>
</defs>
</svg>
<!-- Y Axis Labels -->
<div class="absolute -left-8 inset-y-0 flex flex-col justify-between text-[10px] text-slate-500 py-2">
<span>20k</span><span>15k</span><span>10k</span><span>5k</span><span>0</span>
</div>
<!-- X Axis Labels -->
<div class="absolute -bottom-8 inset-x-0 flex justify-between text-[10px] text-slate-500 px-4">
<span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
</div>
</div>
</div>
<!-- Category Distribution Pie Chart Wireframe -->
<div class="glass-panel p-8 rounded-2xl bg-surface-container h-[400px] flex flex-col items-center">
<h3 class="font-h3 text-on-surface self-start mb-8">Category Distribution</h3>
<div class="relative w-48 h-48 mb-8">
<!-- Fake Pie Chart -->
<svg class="w-full h-full -rotate-90" viewbox="0 0 100 100">
<circle cx="50" cy="50" fill="transparent" r="40" stroke="#1ca64d" stroke-dasharray="160 251.2" stroke-width="20"></circle>
<circle cx="50" cy="50" fill="transparent" r="40" stroke="#3f465c" stroke-dasharray="60 251.2" stroke-dashoffset="-160" stroke-width="20"></circle>
<circle cx="50" cy="50" fill="transparent" r="40" stroke="#fbbf24" stroke-dasharray="31.2 251.2" stroke-dashoffset="-220" stroke-width="20"></circle>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center">
<span class="text-h3 font-h2 text-on-surface">100%</span>
<span class="text-[10px] text-on-surface-variant uppercase">Inventory</span>
</div>
</div>
<div class="w-full grid grid-cols-2 gap-4">
<div class="flex items-center gap-2">
<div class="w-2 h-2 bg-primary rounded-full"></div>
<span class="text-xs text-on-surface-variant">Vegetables</span>
</div>
<div class="flex items-center gap-2">
<div class="w-2 h-2 bg-secondary-container rounded-full"></div>
<span class="text-xs text-on-surface-variant">Fruits</span>
</div>
<div class="flex items-center gap-2">
<div class="w-2 h-2 bg-[#fbbf24] rounded-full"></div>
<span class="text-xs text-on-surface-variant">Grains</span>
</div>
</div>
</div>
</div>
<!-- Users Table -->
<div class="mb-8">
<div class="flex justify-between items-center mb-6">
<h3 class="font-h3 text-on-surface">Recent User Activity</h3>
<button class="text-primary text-label-sm font-bold hover:underline">View All Users</button>
</div>
<div class="glass-panel overflow-hidden rounded-2xl bg-surface-container border border-outline-variant/30">
<table class="w-full text-left">
<thead>
<tr class="border-b border-outline-variant/30 bg-white/5">
<th class="px-6 py-4 text-label-sm text-slate-400 font-medium">User</th>
<th class="px-6 py-4 text-label-sm text-slate-400 font-medium">Role</th>
<th class="px-6 py-4 text-label-sm text-slate-400 font-medium">Status</th>
<th class="px-6 py-4 text-label-sm text-slate-400 font-medium">Joined</th>
<th class="px-6 py-4 text-label-sm text-slate-400 font-medium text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/10">
<tr>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<img class="w-10 h-10 rounded-full border border-primary/20 object-cover" data-alt="professional portrait of a middle-aged man with a friendly smile wearing a linen shirt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGibm9wNtD3Zb5uHWTF4dLgxxvaufpUPX-UHFrm4tRFckMSw3Bo32W1qL2zGCsa9-bSsQGz-qVzdRDKo21hRAjsT-gUWJssnstU-HaassbPUj8B1eF8mEILwz_1GlFj11Bn_QYvkPAsOqwH6snXrnAQuusEA6tPbV5qB7RJsqXtf4cjJUpgNmZf63yHd4py934-PBukuE9Pn-WmQDXftc33LDKjUACeIAxUnn9UQ8gd8pI3JD_xzwsp3Fys3xnIvHJTf4N03MyZg"/>
<div>
<div class="text-on-surface font-semibold text-body-md">Rajesh Kumar</div>
<div class="text-slate-500 text-xs">rajesh.k@agrimail.com</div>
</div>
</div>
</td>
<td class="px-6 py-4">
<span class="px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold rounded-full border border-primary/20 uppercase tracking-widest">Farmer</span>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2">
<div class="w-2 h-2 bg-primary rounded-full"></div>
<span class="text-on-surface text-sm">Active</span>
</div>
</td>
<td class="px-6 py-4 text-slate-400 text-sm">Oct 12, 2023</td>
<td class="px-6 py-4 text-right">
<button class="p-2 text-slate-400 hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr>
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<img class="w-10 h-10 rounded-full border border-primary/20 object-cover" data-alt="close-up portrait of a young professional woman with natural lighting and soft blurred background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwr2IYLi83FfSMd2K0csmsYkoj68l8VDEltsqD7lZvM3ngdPor8s4ufwm_7XUuRDw8tCR3sHBq_RRCZgx15LWVP1jYLyqheqiAGj8UgBvMTWbrcbW4DXUO5Es-F9v5Xyao94isZHSZe5fAN_8bTPPMyiJrCUn5N6cuS--y7PoGNeOB76x34b9tCE9FkkiyeY9lkahbkSVt3HfOzqYEClbjki8RtOyVqB-ya9TUTlhzHxFAmf2whk6YBfp9NywWyxZOw8qwLceWkw"/>
<div>
<div class="text-on-surface font-semibold text-body-md">Ananya Singh</div>
<div class="text-slate-500 text-xs">ananya.s@homemarket.in</div>
</div>
</div>
</td>
<td class="px-6 py-4">
<span class="px-3 py-1 bg-secondary-container/20 text-secondary text-[11px] font-bold rounded-full border border-secondary/20 uppercase tracking-widest">Buyer</span>
</td>
<td class="px-6 py-4">
<div class="flex items-center gap-2">
<div class="w-2 h-2 bg-primary rounded-full"></div>
<span class="text-on-surface text-sm">Active</span>
</div>
</td>
<td class="px-6 py-4 text-slate-400 text-sm">Nov 05, 2023</td>
<td class="px-6 py-4 text-right">
<button class="p-2 text-slate-400 hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Products Pending Approval -->
<div>
<div class="flex justify-between items-center mb-6">
<h3 class="font-h3 text-on-surface">Product Moderation</h3>
<div class="flex gap-2">
<span class="px-2 py-1 bg-tertiary-container/20 text-tertiary-container text-[10px] font-bold rounded border border-tertiary-container/30">4 PENDING</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Product Card 1 -->
<div class="glass-panel p-4 rounded-2xl bg-surface-container flex gap-4 hover:border-primary/40 transition-colors duration-300">
<div class="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
<img class="w-full h-full object-cover" data-alt="fresh organic green spinach leaves with water droplets in a dark rustic basket" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF9Oz-ySt2Rf62TP6GPf7phx7K3xoAJtVILzrkWBGIIJt4HiEYcId1BDQqOlpbIt6FGpjTdhsB2nhyOvUcRa_ykKctkeGUikd9MfpF_ckEPyW2DqwF2S2KzEjjTNBzmaIgGdf0m-ik-_lxUzU6q3g-IsTqXQZ16p9SS_HKyqFAZXzMXoIe3YbOwzTJe3tvLbK0xmYZrpYCURzf5o5IJnR23wDMaLUNWUZkwSstQ42weljpOUTgNSK4fo1lpPRAXNqFAmI975IsIg"/>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-2">
<div>
<h4 class="text-body-lg font-h3 text-on-surface leading-tight">Organic Baby Spinach</h4>
<p class="text-xs text-slate-500">By Green Earth Farm (Verified)</p>
</div>
<span class="text-primary font-bold">₹85/kg</span>
</div>
<div class="flex gap-3 mt-4">
<button class="flex-1 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 transition-all">Approve</button>
<button class="flex-1 py-2 border border-error/30 text-error rounded-lg text-xs font-bold hover:bg-error/10 transition-all">Reject</button>
</div>
</div>
</div>
<!-- Product Card 2 -->
<div class="glass-panel p-4 rounded-2xl bg-surface-container flex gap-4 hover:border-primary/40 transition-colors duration-300">
<div class="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
<img class="w-full h-full object-cover" data-alt="pile of vibrant orange organic carrots with green stems on a dark wooden table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCS1JBxDvliarEnbhWd5dk_iOc0EH4X2uq8DKzb2dexhggRmC7UYBfgczuuLjIIhFW2MGjc_4rJZUi9HTDBU8IX2u9o6L5eMcIF9y4cEx5o38M3Xe_3PUf-OvtaTmKhn8Hi7v6s003gZw9hCoqTPYAIMeTxwFBbil3bncq8kVxvzeUVNcct18qqO9QcdIMfZwvetCFI5-q3QOFw3ob_bhvARD22fIr5d5cyxdEbP-7DMAgPI5tIAQMriIeUUYVgsawSFefjnUVAw"/>
</div>
<div class="flex-1">
<div class="flex justify-between items-start mb-2">
<div>
<h4 class="text-body-lg font-h3 text-on-surface leading-tight">Heritage Carrots</h4>
<p class="text-xs text-slate-500">By Sunny Valley Seeds</p>
</div>
<span class="text-primary font-bold">₹120/kg</span>
</div>
<div class="flex gap-3 mt-4">
<button class="flex-1 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 transition-all">Approve</button>
<button class="flex-1 py-2 border border-error/30 text-error rounded-lg text-xs font-bold hover:bg-error/10 transition-all">Reject</button>
</div>
</div>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="ml-64 w-[calc(100%-16rem)] py-12 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-900 border-t-4 border-green-600 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest text-slate-500">
<div class="text-lg font-bold text-white">KrushiMart</div>
<div class="flex flex-wrap gap-4 justify-center">
<a class="hover:text-green-400 transition-colors" href="#">Privacy Policy</a>
<a class="hover:text-green-400 transition-colors" href="#">Terms of Service</a>
<a class="hover:text-green-400 transition-colors" href="#">Contact Us</a>
<a class="hover:text-green-400 transition-colors" href="#">Sustainability</a>
</div>
<div class="text-right">© 2024 KrushiMart. Future-Forward Growth.</div>
</footer>
</body></html>