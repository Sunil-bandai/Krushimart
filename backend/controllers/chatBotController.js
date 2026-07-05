import OpenAI from 'openai';
import 'dotenv/config';

let openai = null;
let openaiAvailable = null;

const getOpenAI = () => {
    if (openaiAvailable !== null) return openai ? openai : null;
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_API_KEY.startsWith('sk-')) {
        openaiAvailable = false;
        return null;
    }
    try {
        openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        openaiAvailable = true;
        return openai;
    } catch (e) {
        openaiAvailable = false;
        return null;
    }
};

const localResponses = {
    consumer: [
        { keywords: ['order', 'buy', 'purchase', 'checkout', 'place'], answer: 'To place an order: browse products in the Shop, add items to your cart, then go to Cart and click "Place Order". Enter your delivery address and confirm.' },
        { keywords: ['cart', 'add', 'remove'], answer: 'Click "Add to Cart" on any product page. View your cart from the cart icon in the navbar. You can update quantities or remove items there.' },
        { keywords: ['review', 'rate', 'feedback'], answer: 'Go to any product detail page and scroll to the Reviews section. You can rate (1-5 stars), write a comment, and upload up to 3 images.' },
        { keywords: ['track', 'status', 'delivery', 'where'], answer: 'Go to "My Orders" from the navbar to see all your orders and their current status (pending, confirmed, dispatched, delivered).' },
        { keywords: ['profile', 'account', 'update', 'password'], answer: 'Go to "Profile" from the navbar to update your name, phone, address, and avatar. Use the password section to change your password.' },
        { keywords: ['shop', 'browse', 'find', 'search', 'product'], answer: 'Click "Shop" in the navbar to browse all products. Use filters for category and price range to find what you need.' },
        { keywords: ['return', 'refund', 'cancel'], answer: 'Currently, order cancellation is not available. Contact the farmer directly for any issues with your order.' },
        { keywords: ['hello', 'hi', 'hey', 'help'], answer: 'Hello! I am KrushiMart Assistant. I can help you with browsing products, placing orders, tracking deliveries, and managing your account. What would you like to know?' },
    ],
    farmer: [
        { keywords: ['product', 'add', 'create', 'list', 'sell'], answer: 'To list a product: go to Farmer Dashboard > Inventory > click "Add Product". Fill in name, description, price, category, stock, and image URL. Your product will appear after admin approval.' },
        { keywords: ['inventory', 'stock', 'manage'], answer: 'Go to "Inventory" from the sidebar to view, edit, or delete your products. You can update stock levels and prices anytime.' },
        { keywords: ['order', 'status', 'dispatch', 'confirm', 'deliver'], answer: 'Go to "Orders" from the sidebar. You will see orders containing your products. Click on an order to update its status: pending > confirmed > dispatched > delivered.' },
        { keywords: ['analytics', 'sales', 'revenue', 'earnings'], answer: 'Go to "Analytics" from the sidebar to see your total products, total stock, orders, and revenue. Charts and trends will be shown there.' },
        { keywords: ['approve', 'pending'], answer: 'After creating a product, it enters a pending state. The admin must approve it before it appears in the public shop. Check your inventory for approval status.' },
        { keywords: ['settings', 'profile', 'account'], answer: 'Go to "Settings" from the sidebar to update your name, phone, address, and password.' },
        { keywords: ['hello', 'hi', 'hey', 'help'], answer: 'Hello Farmer! I can help you with adding products, managing inventory, updating orders, and viewing analytics. What do you need help with?' },
    ],
    admin: [
        { keywords: ['approve', 'product'], answer: 'Go to Admin Dashboard > Products. You will see pending products. Click "Approve" next to any product to make it visible in the public shop.' },
        { keywords: ['user', 'manage', 'activate', 'deactivate', 'toggle'], answer: 'Go to Admin Dashboard > Users. You can see all users, toggle their active/inactive status, or delete accounts.' },
        { keywords: ['delete', 'remove', 'product', 'user'], answer: 'In the Products or Users section, click the delete button next to any item. This action cannot be undone.' },
        { keywords: ['analytics', 'stats', 'revenue', 'overview'], answer: 'Go to Admin Dashboard to see system-wide analytics: total users, total products, total orders, and total revenue.' },
        { keywords: ['category', 'add category', 'manage category'], answer: 'Use the Categories API to create, update, or delete product categories. Categories help organize the shop.' },
        { keywords: ['order', 'all orders', 'view orders'], answer: 'Go to Admin Dashboard > Orders to see all orders across the platform with customer details, items, and amounts.' },
        { keywords: ['hello', 'hi', 'hey', 'help'], answer: 'Hello Admin! I can help you with approving products, managing users, viewing analytics, and system management. What do you need?' },
    ],
    default: [
        { keywords: ['hello', 'hi', 'hey', 'help'], answer: 'Hello! Welcome to KrushiMart. I can help you navigate the platform. Please log in for personalized assistance.' },
        { keywords: ['what', 'about', 'krushimart'], answer: 'KrushiMart is a farm-to-consumer agricultural marketplace. Farmers list fresh produce, and consumers buy directly — no middlemen.' },
        { keywords: ['feature', 'what can'], answer: 'KrushiMart offers: product browsing, shopping cart, order management, reviews, role-based dashboards (Consumer/Farmer/Admin), and AI assistance.' },
    ]
};

function getLocalResponse(message, role) {
    const lower = message.toLowerCase();
    const roleResponses = localResponses[role] || [];
    const allResponses = [...roleResponses, ...localResponses.default];

    for (const item of allResponses) {
        if (item.keywords.some(kw => lower.includes(kw))) {
            return item.answer;
        }
    }

    return "I can help with KrushiMart features like browsing products, placing orders, managing inventory, and account settings. Try asking about a specific topic!";
}

export const chatBot = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({ answer: 'Please provide a valid message.' });
        }
        const userRole = req.user?.role || 'default';

        const client = getOpenAI();
        if (!client) {
            const answer = getLocalResponse(message, userRole);
            return res.json({ answer });
        }

        let systemPrompt = '';
        switch (userRole) {
            case 'consumer':
                systemPrompt = 'You are KrushiMart Assistant. Help consumers with browsing products, placing orders, tracking deliveries, writing reviews, and managing their account. Be concise (max 2 sentences).';
                break;
            case 'farmer':
                systemPrompt = 'You are KrushiMart Assistant. Help farmers with creating products, managing inventory, viewing orders, updating order status, and viewing analytics. Be concise (max 2 sentences).';
                break;
            case 'admin':
                systemPrompt = 'You are KrushiMart Assistant. Help admins with approving products, managing users, viewing analytics, and managing categories. Be concise (max 2 sentences).';
                break;
            default:
                systemPrompt = 'You are KrushiMart Assistant. Help users navigate the platform. Be concise (max 2 sentences).';
        }

        const completion = await Promise.race([
            client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message },
                ],
                temperature: 0.7,
                max_tokens: 150
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
        ]);

        const answer = completion.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error('Chatbot error:', error.message);
        const userRole = req.user?.role || 'default';
        const answer = getLocalResponse(req.body.message || '', userRole);
        res.json({ answer });
    }
};
