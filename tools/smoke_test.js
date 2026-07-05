const base = 'http://localhost:5000/api';

async function run() {
  try {
    const proRes = await fetch(`${base}/products`);
    const pro = await proRes.json();
    console.log('PRODUCTS_OK', pro.data?.content?.length ?? JSON.stringify(pro.data).slice(0,120));
    const pid = pro.data?.content?.[0]?._id || (pro.data && pro.data[0]?._id);
    if (!pid) { console.error('NO_PRODUCT'); return; }

    const ts = Date.now();
    const email = `test+${ts}@example.com`;

    const regRes = await fetch(`${base}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Test User', email, password: 'Password123', role: 'consumer' }) });
    const reg = await regRes.json();
    console.log('REGISTER', reg.success, reg.message || '');

    const loginRes = await fetch(`${base}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'Password123' }) });
    const login = await loginRes.json();
    console.log('LOGIN', login.success);
    const token = login.data?.token;
    if (!token) { console.error('NO_TOKEN', JSON.stringify(login)); return; }

    const addRes = await fetch(`${base}/cart`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ productId: pid, quantity: 2 }) });
    const add = await addRes.json();
    console.log('ADD_CART', add.success, add.message || '');

    const cartRes = await fetch(`${base}/cart`, { headers: { 'Authorization': 'Bearer ' + token } });
    const cart = await cartRes.json();
    console.log('CART_ITEMS', cart.data?.items?.length || 0);
  } catch (e) {
    console.error('ERR', e.message);
  }
}

run();
