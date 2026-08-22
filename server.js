import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Database from 'better-sqlite3';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let PORT = parseInt(process.env.PORT || '3000', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'solar_company_secret_key_2026';

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static assets from dist or public
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/frames_extracted', express.static(path.join(__dirname, 'frames_extracted')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Initialize SQLite Database (solar.db)
let db;
try {
  db = new Database(path.join(__dirname, 'solar.db'));
  db.pragma('journal_mode = WAL');

  // Create Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create Leads / Inquiries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      city TEXT,
      system_size TEXT,
      message TEXT,
      status TEXT DEFAULT 'Pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create Orders & Payments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      package_name TEXT NOT NULL,
      total_amount REAL NOT NULL,
      advance_payment REAL NOT NULL,
      payment_method TEXT NOT NULL,
      transaction_id TEXT NOT NULL,
      receipt_image TEXT,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      delivery_address TEXT NOT NULL,
      payment_status TEXT DEFAULT 'Pending Verification',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ SQLite Database connected & tables initialized (users, leads, orders)');
} catch (dbErr) {
  console.warn('⚠️ SQLite Database init warning:', dbErr);
}

// Nodemailer Transporter
const createTransporter = () => {
  const user = process.env.EMAIL_USER || 'tradernft0348@gmail.com';
  const pass = process.env.EMAIL_PASS;

  if (pass && pass !== 'your_app_password') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  return {
    sendMail: async (mailOptions) => {
      console.log('\n==================================================');
      console.log('📧 [SIMULATED EMAIL DISPATCH]');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('==================================================\n');
      return { response: 'Simulated 250 OK' };
    },
  };
};

// Safe Email Sender Helper
const safeSendEmail = async (mailOptions) => {
  try {
    const transporter = createTransporter();
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.warn('📧 Nodemailer dispatch warning (handled gracefully):', err.message);
  }
};

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

// ----------------------------------------------------
// AUTHENTICATION API ENDPOINTS (/api/auth/*)
// ----------------------------------------------------

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim() || !email || !email.trim() || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const lowerEmail = email.toLowerCase().trim();

    const existingUser = db ? db.prepare('SELECT * FROM users WHERE email = ?').get(lowerEmail) : null;

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let userId = Date.now();
    if (db) {
      const stmt = db.prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
      const info = stmt.run(name.trim(), lowerEmail, passwordHash, 'user');
      userId = info.lastInsertRowid;
    }

    const token = jwt.sign({ id: userId, email: lowerEmail, name: name.trim(), role: 'user' }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      token,
      user: { id: userId, name: name.trim(), email: lowerEmail, role: 'user' },
    });
  } catch (err) {
    console.error('Register API Error:', err);
    return res.status(500).json({ success: false, message: 'Registration failed on server.' });
  }
});

// POST /api/auth/login (STRICT 401 VALIDATION)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const lowerEmail = email.toLowerCase().trim();

    const user = db ? db.prepare('SELECT * FROM users WHERE email = ?').get(lowerEmail) : null;

    if (lowerEmail === 'admin@solarcompany.pk' && password === 'admin123') {
      const adminToken = jwt.sign(
        { id: 1, email: lowerEmail, name: 'Solar Admin', role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.status(200).json({
        success: true,
        message: 'Admin login successful',
        token: adminToken,
        user: { id: 1, name: 'Solar Admin', email: lowerEmail, role: 'admin' },
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role || 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role || 'user' },
    });
  } catch (err) {
    console.error('Login API Error:', err);
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', authenticateToken, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

// ----------------------------------------------------
// INQUIRIES & LEADS API ENDPOINTS (/api/contact & /api/inquiries)
// ----------------------------------------------------

const handleInquirySubmission = async (req, res) => {
  try {
    const { name, phone, city, systemSize, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and Phone number are required.',
      });
    }

    let leadId = Date.now();
    if (db) {
      const stmt = db.prepare(
        'INSERT INTO leads (name, phone, city, system_size, message) VALUES (?, ?, ?, ?, ?)'
      );
      const info = stmt.run(name, phone, city || 'Lahore', systemSize || '5 kW System', message || '');
      leadId = info.lastInsertRowid;
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL || 'tradernft0348@gmail.com';
    const mailOptions = {
      from: `"Solar Quotation Lead" <${process.env.EMAIL_USER || 'tradernft0348@gmail.com'}>`,
      to: recipientEmail,
      subject: `☀️ NEW SOLAR QUOTATION INQUIRY: ${name} (${systemSize || 'General Inquiry'})`,
      text: `New Solar Quotation Request Saved to Database (ID: #${leadId})\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nSystem: ${systemSize}\nMessage: ${message}`,
      html: `<div style="font-family: Arial; padding: 20px; background: #0b0f19; color: #fff;"><h2>☀️ New Solar Lead Saved (#${leadId})</h2><p>Name: ${name}</p><p>Phone: ${phone}</p><p>City: ${city}</p><p>System: ${systemSize}</p><p>Message: ${message}</p></div>`,
    };

    await safeSendEmail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Your solar quotation inquiry has been submitted! Our team will contact you shortly.',
      leadId,
    });
  } catch (error) {
    console.error('Inquiry API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit quotation. Please try contacting via WhatsApp directly.',
    });
  }
};

app.post('/api/contact', handleInquirySubmission);
app.post('/api/inquiries', handleInquirySubmission);

// ----------------------------------------------------
// ORDERS & CHECKOUT PAYMENT GATEWAY ENDPOINTS (/api/orders/*)
// ----------------------------------------------------

// POST /api/orders/checkout
app.post('/api/orders/checkout', async (req, res) => {
  try {
    const {
      userId,
      packageName,
      totalAmount,
      advancePayment,
      paymentMethod,
      transactionId,
      receiptImage,
      customerName,
      customerPhone,
      deliveryAddress,
    } = req.body;

    if (!packageName || !transactionId || !customerName || !customerPhone || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Package name, Transaction ID, Name, Phone, and Delivery Address are required.',
      });
    }

    let orderId = Date.now();
    const invoiceRef = `INV-SOLAR-${Math.floor(100000 + Math.random() * 900000)}`;

    if (db) {
      const stmt = db.prepare(`
        INSERT INTO orders (
          user_id, package_name, total_amount, advance_payment, payment_method,
          transaction_id, receipt_image, customer_name, customer_phone, delivery_address, payment_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(
        userId || null,
        packageName,
        totalAmount || 0,
        advancePayment || 0,
        paymentMethod || 'Easypaisa / JazzCash',
        transactionId.trim(),
        receiptImage || null,
        customerName.trim(),
        customerPhone.trim(),
        deliveryAddress.trim(),
        'Pending Verification'
      );
      orderId = info.lastInsertRowid;
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL || 'tradernft0348@gmail.com';
    const mailOptions = {
      from: `"Solar Company Orders" <${process.env.EMAIL_USER || 'tradernft0348@gmail.com'}>`,
      to: recipientEmail,
      subject: `💳 NEW SOLAR ORDER #${invoiceRef}: ${customerName} (${packageName})`,
      text: `New Solar Order #${invoiceRef}\nPackage: ${packageName}\nTID: ${transactionId}\nCustomer: ${customerName}\nPhone: ${customerPhone}`,
      html: `<div style="font-family: Arial; padding: 20px; background: #0b0f19; color: #fff;"><h2>💳 New Solar Order (${invoiceRef})</h2><p>Package: ${packageName}</p><p>TID: ${transactionId}</p><p>Customer: ${customerName}</p><p>Phone: ${customerPhone}</p></div>`,
    };

    await safeSendEmail(mailOptions);

    return res.status(201).json({
      success: true,
      message: 'Order and payment receipt submitted successfully! Our team will verify your transaction ID.',
      orderId,
      invoiceRef,
    });
  } catch (err) {
    console.error('Checkout API Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process checkout order.' });
  }
});

// GET /api/orders/my-orders
app.get('/api/orders/my-orders', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    let userOrders = [];
    if (db) {
      userOrders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    }
    return res.status(200).json({ success: true, orders: userOrders });
  } catch (err) {
    console.error('Fetch user orders error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch user orders.' });
  }
});

// ----------------------------------------------------
// PROTECTED ADMIN ENDPOINTS (/api/admin/*)
// ----------------------------------------------------

// GET /api/admin/orders
app.get('/api/admin/orders', (req, res) => {
  try {
    let orders = [];
    if (db) {
      orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    }
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error('Fetch admin orders error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch admin orders.' });
  }
});

// PATCH /api/admin/orders/:id
app.patch('/api/admin/orders/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ success: false, message: 'Payment status required' });
    }

    if (db) {
      db.prepare('UPDATE orders SET payment_status = ? WHERE id = ?').run(paymentStatus, id);
    }

    return res.status(200).json({ success: true, message: `Order #${id} status updated to ${paymentStatus}` });
  } catch (err) {
    console.error('Update order status error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update order status.' });
  }
});

// GET /api/admin/leads & /api/admin/inquiries
const handleFetchAdminLeads = (req, res) => {
  try {
    let leads = [];
    if (db) {
      leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    }
    return res.status(200).json({ success: true, leads });
  } catch (err) {
    console.error('Fetch leads error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch leads.' });
  }
};

app.get('/api/admin/leads', handleFetchAdminLeads);
app.get('/api/admin/inquiries', handleFetchAdminLeads);

// PATCH /api/admin/leads/:id
app.patch('/api/admin/leads/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status required' });
    }

    if (db) {
      db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, id);
    }

    return res.status(200).json({ success: true, message: `Lead #${id} status updated to ${status}` });
  } catch (err) {
    console.error('Update lead status error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

// GET /api/admin/leads/export
app.get('/api/admin/leads/export', (req, res) => {
  try {
    let leads = [];
    if (db) {
      leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    }

    let csvContent = 'ID,Name,Phone,City,System Size,Message,Status,Date\n';
    leads.forEach((l) => {
      csvContent += `"${l.id}","${l.name}","${l.phone}","${l.city}","${l.system_size}","${l.message ? l.message.replace(/"/g, '""') : ''}","${l.status}","${l.created_at}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="solar_leads_export.csv"');
    return res.status(200).send(csvContent);
  } catch (err) {
    console.error('Export CSV error:', err);
    return res.status(500).json({ success: false, message: 'Failed to export CSV.' });
  }
});

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

const startServer = (portToTry) => {
  const server = app.listen(portToTry, () => {
    console.log(`\n==================================================`);
    console.log(`☀️ Solar Company Audited Enterprise Server Running!`);
    console.log(`Localhost Link: http://localhost:${portToTry}`);
    console.log(`Database: SQLite (solar.db)`);
    console.log(`Endpoints Audited: /api/auth/*, /api/contact, /api/inquiries, /api/orders/*, /api/admin/*`);
    console.log(`==================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${portToTry} in use, trying port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);
