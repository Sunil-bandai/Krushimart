<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
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
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .perspective-container {
            perspective: 1000px;
        }
        .tilt-card {
            transition: transform 0.3s ease;
        }
        .tilt-card:hover {
            transform: rotateX(2deg) rotateY(2deg) scale(1.01);
        }
        .floating-shape {
            filter: blur(40px);
            z-index: 0;
        }
    </style>
</head>
<body class="bg-surface font-body-md text-on-surface overflow-hidden">
<!-- Auth Split Screen Container -->
<main class="flex min-h-screen w-full overflow-hidden">
<!-- Left Panel: Branding & 3D Visuals -->
<section class="hidden lg:flex lg:w-1/2 relative bg-surface-container-lowest items-center justify-center p-xl overflow-hidden">
<!-- Background Gradients & Shapes -->
<div class="absolute inset-0 bg-gradient-to-br from-on-primary-fixed-variant via-surface-container-lowest to-surface-dim"></div>
<div class="floating-shape absolute top-1/4 -left-20 w-80 h-80 bg-primary-container/20 rounded-full"></div>
<div class="floating-shape absolute bottom-1/4 -right-20 w-96 h-96 bg-surface-tint/10 rounded-full"></div>
<!-- Branding Content -->
<div class="relative z-10 flex flex-col items-start max-w-md">
<div class="mb-lg">
<span class="text-h1 font-h1 text-primary tracking-tighter">KrushiMart</span>
<div class="h-1.5 w-24 bg-primary mt-xs rounded-full"></div>
</div>
<h2 class="text-h1 font-h1 text-on-surface mb-md">Empowering the Future of Agriculture.</h2>
<p class="text-body-lg font-body-lg text-on-surface-variant mb-lg">Experience a premium marketplace connecting local farmers directly to modern consumers through high-end digital commerce.</p>
<!-- Floating 3D Perspective Card -->
<div class="perspective-container w-full">
<div class="tilt-card glass-panel bg-white/5 p-md rounded-xl shadow-2xl">
<div class="flex items-center gap-md mb-md">
<div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
<span class="material-symbols-outlined text-primary">eco</span>
</div>
<div>
<h4 class="font-h3 text-body-lg text-on-surface">Sustainable Sourcing</h4>
<p class="text-label-sm text-on-surface-variant">Verified Organic Partners</p>
</div>
</div>
<div class="flex flex-col gap-xs">
<div class="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full w-3/4 bg-gradient-to-r from-primary to-surface-tint shadow-[0_0_10px_rgba(98,223,125,0.5)]"></div>
</div>
<div class="flex justify-between text-label-sm text-on-surface-variant">
<span>Quality Index</span>
<span class="text-primary">94%</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Right Panel: Auth Forms -->
<section class="w-full lg:w-1/2 flex items-center justify-center p-md lg:p-xl bg-surface relative overflow-y-auto">
<!-- Mobile Branding (Only visible on small screens) -->
<div class="absolute top-md left-md lg:hidden">
<span class="text-h3 font-h3 text-primary">KrushiMart</span>
</div>
<div class="w-full max-w-lg">
<!-- Form Switcher/Tabs -->
<div class="flex items-center justify-between mb-xl">
<div>
<h1 class="text-h2 font-h2 text-on-surface">Welcome Back</h1>
<p class="text-body-md font-body-md text-on-surface-variant">Enter your details to access your account</p>
</div>
<div class="text-right">
<span class="text-label-sm font-label-sm text-on-surface-variant block mb-xs">New here?</span>
<button class="text-label-sm font-label-sm text-primary hover:underline transition-all">Create Account</button>
</div>
</div>
<!-- Auth Form Card -->
<div class="glass-panel bg-surface-container-low p-md lg:p-lg rounded-xl shadow-xl border-outline-variant/30">
<!-- Role Selector (For Register - hidden in login but ready for toggle) -->
<div class="mb-lg">
<label class="text-label-sm font-label-sm text-on-surface-variant block mb-xs">I am a...</label>
<div class="grid grid-cols-2 gap-xs p-base bg-surface-container-highest rounded-lg">
<button class="bg-primary text-on-primary font-label-sm py-xs rounded-lg shadow-sm transition-all">Farmer</button>
<button class="text-on-surface-variant font-label-sm py-xs rounded-lg hover:bg-white/5 transition-all">Consumer</button>
</div>
</div>
<form class="space-y-md">
<!-- Login/Common Fields -->
<div class="space-y-xs">
<label class="text-label-sm font-label-sm text-on-surface-variant px-xs">Email Address</label>
<div class="relative group">
<span class="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
<input class="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-md text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none" placeholder="farmer@krushimart.com" type="email"/>
</div>
</div>
<div class="space-y-xs">
<label class="text-label-sm font-label-sm text-on-surface-variant px-xs">Password</label>
<div class="relative group">
<span class="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
<input class="w-full bg-surface-container-highest border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-lg py-md pl-xl pr-md text-on-surface placeholder:text-on-surface-variant/40 transition-all outline-none" placeholder="••••••••" type="password"/>
<button class="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" type="button">
<span class="material-symbols-outlined">visibility</span>
</button>
</div>
</div>
<!-- Login Specific Actions -->
<div class="flex items-center justify-between">
<label class="flex items-center gap-xs cursor-pointer group">
<input class="w-5 h-5 rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/20 transition-all" type="checkbox"/>
<span class="text-label-sm font-label-sm text-on-surface-variant group-hover:text-on-surface">Remember me</span>
</label>
<a class="text-label-sm font-label-sm text-primary hover:underline" href="#">Forgot password?</a>
</div>
<!-- Submit Button -->
<button class="w-full bg-primary text-on-primary font-h3 text-body-lg py-md rounded-lg shadow-lg shadow-primary/20 hover:bg-surface-tint transition-all transform active:scale-95 duration-150 mt-md" type="submit">
                            Sign In
                        </button>
</form>
<!-- Alternate Login Options -->
<div class="mt-lg pt-lg border-t border-outline-variant/20">
<p class="text-center text-label-sm font-label-sm text-on-surface-variant mb-md">Or continue with</p>
<div class="grid grid-cols-2 gap-md">
<button class="flex items-center justify-center gap-xs bg-surface-container-highest border border-outline-variant/30 py-xs rounded-lg hover:bg-white/5 transition-all group">
<img alt="Google" class="w-5 h-5" data-alt="Official Google G-logo with multi-color brand colors on a transparent background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAux2lxyPR9qFI7RTpm6xFbVy8wgMAncpEv6Bjbi4Qz6JjfN-NzeL2t7mIdFtnXX1KUqDA8Yv-uo-jzOsgyyGbTGv067wZtj2PIGB3l3oZo-M0YRL66w6UMOYsHxF-e7I3dgswvK0aBFihUjXnNNb2Cndevct_6bnRuwvD3etZDOzQ7MBUgE-Xmn69RAh6q6fxOgAWK3bJ3DbsWWQvhfNJgp9ccFOCDXbzuGaeL1-5sJsy_99sBtcYS4jNKu_goeX8GZGndF5c9zg"/>
<span class="text-label-sm font-label-sm text-on-surface">Google</span>
</button>
<button class="flex items-center justify-center gap-xs bg-surface-container-highest border border-outline-variant/30 py-xs rounded-lg hover:bg-white/5 transition-all group">
<span class="material-symbols-outlined text-on-surface">ios</span>
<span class="text-label-sm font-label-sm text-on-surface">Apple ID</span>
</button>
</div>
</div>
</div>
<!-- Footer Text -->
<p class="mt-xl text-center text-label-sm font-label-sm text-on-surface-variant/60 uppercase tracking-widest">
                    © 2024 KRUSHIMART. FUTURE-FORWARD GROWTH.
                </p>
</div>
</section>
</main>
<!-- Background Decoration -->
<div class="fixed top-0 right-0 p-lg pointer-events-none opacity-20">
<span class="text-[120px] font-black text-primary/10 select-none">GROW</span>
</div>
</body></html>