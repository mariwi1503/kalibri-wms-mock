// Warehouse Management System Data Constants
import { 
  LayoutDashboard, 
  Package, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Receipt, 
  Building2, 
  BarChart3, 
  Settings 
} from 'lucide-react';

export const warehouseData = [
  {
    id: 1,
    name: "Gudang Jakarta Utara",
    location: "Jakarta Utara, DKI Jakarta",
    capacity: 1500,
    occupied: 1200,
    status: "Active",
    manager: "Budi Santoso",
    type: "Distribution Center"
  },
  {
    id: 2,
    name: "Warehouse Tangerang Premium",
    location: "Tangerang, Banten",
    capacity: 2000,
    occupied: 1800,
    status: "Active",
    manager: "Siti Nurhaliza",
    type: "Storage Facility"
  },
  {
    id: 3,
    name: "Gudang Bekasi Industrial",
    location: "Bekasi, Jawa Barat",
    capacity: 1200,
    occupied: 900,
    status: "Active",
    manager: "Ahmad Wijaya",
    type: "Manufacturing Hub"
  }
];

export const inventoryData = [
  {
    id: "INV001",
    name: "Smartphone Samsung Galaxy",
    category: "Electronics",
    sku: "SMG-001",
    quantity: 150,
    minStock: 50,
    maxStock: 500,
    location: "A1-B2-C3",
    supplier: "PT Electronics Indo",
    price: 5000000,
    lastUpdated: "2024-01-15"
  },
  {
    id: "INV002",
    name: "Laptop Asus ROG",
    category: "Electronics",
    sku: "ASU-002",
    quantity: 75,
    minStock: 25,
    maxStock: 200,
    location: "A2-B1-C4",
    supplier: "PT Computer World",
    price: 15000000,
    lastUpdated: "2024-01-14"
  },
  {
    id: "INV003",
    name: "Sepatu Nike Air Max",
    category: "Fashion",
    sku: "NIK-003",
    quantity: 200,
    minStock: 100,
    maxStock: 1000,
    location: "B1-C2-D1",
    supplier: "PT Fashion Store",
    price: 1500000,
    lastUpdated: "2024-01-13"
  },
  {
    id: "INV004",
    name: "Tas Ransel Eiger",
    category: "Fashion",
    sku: "EIG-004",
    quantity: 80,
    minStock: 30,
    maxStock: 300,
    location: "B2-C1-D2",
    supplier: "PT Outdoor Gear",
    price: 750000,
    lastUpdated: "2024-01-12"
  }
];

export const inboundData = [
  {
    id: "IB001",
    poNumber: "PO-2024-001",
    supplier: "PT Electronics Indo",
    expectedDate: "2024-01-20",
    status: "Pending",
    items: [
      { name: "Smartphone Samsung Galaxy", quantity: 50, received: 0 },
      { name: "Tablet Samsung", quantity: 30, received: 0 }
    ],
    totalValue: 400000000,
    warehouse: "Gudang Jakarta Utara"
  },
  {
    id: "IB002",
    poNumber: "PO-2024-002",
    supplier: "PT Computer World",
    expectedDate: "2024-01-18",
    status: "In Transit",
    items: [
      { name: "Laptop Asus ROG", quantity: 25, received: 0 }
    ],
    totalValue: 375000000,
    warehouse: "Warehouse Tangerang Premium"
  },
  {
    id: "IB003",
    poNumber: "PO-2024-003",
    supplier: "PT Fashion Store",
    expectedDate: "2024-01-16",
    status: "Received",
    items: [
      { name: "Sepatu Nike Air Max", quantity: 100, received: 100 }
    ],
    totalValue: 150000000,
    warehouse: "Gudang Bekasi Industrial"
  }
];

export const outboundData = [
  {
    id: "OB001",
    orderNumber: "SO-2024-001",
    customer: "PT Retail Besar",
    shipDate: "2024-01-17",
    status: "Shipped",
    items: [
      { name: "Smartphone Samsung Galaxy", quantity: 20 },
      { name: "Sepatu Nike Air Max", quantity: 15 }
    ],
    totalValue: 122500000,
    warehouse: "Gudang Jakarta Utara",
    trackingNumber: "TRK001234567"
  },
  {
    id: "OB002",
    orderNumber: "SO-2024-002",
    customer: "CV Elektronik Jaya",
    shipDate: "2024-01-19",
    status: "Processing",
    items: [
      { name: "Laptop Asus ROG", quantity: 5 }
    ],
    totalValue: 75000000,
    warehouse: "Warehouse Tangerang Premium",
    trackingNumber: ""
  },
  {
    id: "OB003",
    orderNumber: "SO-2024-003",
    customer: "Toko Fashion Modern",
    shipDate: "2024-01-21",
    status: "Pending",
    items: [
      { name: "Tas Ransel Eiger", quantity: 10 },
      { name: "Sepatu Nike Air Max", quantity: 25 }
    ],
    totalValue: 45000000,
    warehouse: "Gudang Bekasi Industrial",
    trackingNumber: ""
  }
];

export const billingData = [
  {
    id: "BILL001",
    invoiceNumber: "INV-2024-001",
    customer: "PT Retail Besar",
    issueDate: "2024-01-17",
    dueDate: "2024-02-16",
    amount: 122500000,
    status: "Paid",
    paymentMethod: "Bank Transfer",
    items: [
      { description: "Smartphone Samsung Galaxy", quantity: 20, unitPrice: 5000000, total: 100000000 },
      { description: "Sepatu Nike Air Max", quantity: 15, unitPrice: 1500000, total: 22500000 }
    ]
  },
  {
    id: "BILL002",
    invoiceNumber: "INV-2024-002",
    customer: "CV Elektronik Jaya",
    issueDate: "2024-01-19",
    dueDate: "2024-02-18",
    amount: 75000000,
    status: "Outstanding",
    paymentMethod: "",
    items: [
      { description: "Laptop Asus ROG", quantity: 5, unitPrice: 15000000, total: 75000000 }
    ]
  },
  {
    id: "BILL003",
    invoiceNumber: "INV-2024-003",
    customer: "Toko Fashion Modern",
    issueDate: "2024-01-21",
    dueDate: "2024-02-20",
    amount: 45000000,
    status: "Draft",
    paymentMethod: "",
    items: [
      { description: "Tas Ransel Eiger", quantity: 10, unitPrice: 750000, total: 7500000 },
      { description: "Sepatu Nike Air Max", quantity: 25, unitPrice: 1500000, total: 37500000 }
    ]
  }
];

export const dashboardStats = {
  totalWarehouses: 3,
  totalInventory: 505,
  pendingInbound: 2,
  pendingOutbound: 1,
  totalRevenue: 242500000,
  lowStockItems: 2
};

export const chartData = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 242500000, orders: 45 },
    { month: 'Feb', revenue: 285000000, orders: 52 },
    { month: 'Mar', revenue: 320000000, orders: 58 },
    { month: 'Apr', revenue: 298000000, orders: 48 },
    { month: 'May', revenue: 365000000, orders: 65 },
    { month: 'Jun', revenue: 410000000, orders: 72 }
  ],
  inventoryByCategory: [
    { category: 'Electronics', value: 225, color: '#3B82F6' },
    { category: 'Fashion', value: 280, color: '#10B981' },
    { category: 'Home & Garden', value: 150, color: '#F59E0B' },
    { category: 'Sports', value: 95, color: '#EF4444' }
  ],
  warehouseUtilization: [
    { warehouse: 'Jakarta Utara', utilization: 80, capacity: 1500 },
    { warehouse: 'Tangerang Premium', utilization: 90, capacity: 2000 },
    { warehouse: 'Bekasi Industrial', utilization: 75, capacity: 1200 }
  ]
};

export const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard, // Langsung komponen ikon
    path: '/'
  },
  {
    id: 'inventory',
    label: 'Inventory Management',
    icon: Package, // Langsung komponen ikon
    submenu: [
      { id: 'inventory-list', label: 'Inventory List', path: '/dashboard/inventory' },
      { id: 'stock-movement', label: 'Stock Movement', path: '/dashboard/inventory/movement' },
      { id: 'low-stock', label: 'Low Stock Alert', path: '/dashboard/inventory/low-stock' }
    ]
  },
  {
    id: 'inbound',
    label: 'Inbound Operations',
    icon: ArrowDownToLine, // Langsung komponen ikon
    submenu: [
      { id: 'inbound-list', label: 'Inbound List', path: '/dashboard/inbound' },
      { id: 'receiving', label: 'Receiving', path: '/dashboard/inbound/receiving' },
      { id: 'purchase-orders', label: 'Purchase Orders', path: '/dashboard/inbound/purchase-orders' }
    ]
  },
  {
    id: 'outbound',
    label: 'Outbound Operations',
    icon: ArrowUpFromLine, // Langsung komponen ikon
    submenu: [
      { id: 'outbound-list', label: 'Outbound List', path: '/dashboard/outbound' },
      { id: 'picking', label: 'Picking', path: '/dashboard/outbound/picking' },
      { id: 'shipping', label: 'Shipping', path: '/dashboard/outbound/shipping' }
    ]
  },
  {
    id: 'billing',
    label: 'Billing & Invoicing',
    icon: Receipt, // Langsung komponen ikon
    submenu: [
      { id: 'invoices', label: 'Invoices', path: '/dashboard/billing' },
      { id: 'payments', label: 'Payments', path: '/dashboard/billing/payments' },
      { id: 'reports', label: 'Financial Reports', path: '/dashboard/billing/reports' }
    ]
  },
  {
    id: 'warehouse',
    label: 'Warehouse Management',
    icon: Building2, // Langsung komponen ikon
    submenu: [
      { id: 'warehouse-list', label: 'Warehouse List', path: '/dashboard/warehouse' },
      { id: 'locations', label: 'Locations', path: '/dashboard/warehouse/locations' },
      { id: 'capacity', label: 'Capacity Planning', path: '/dashboard/warehouse/capacity' }
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: BarChart3, // Langsung komponen ikon
    submenu: [
      { id: 'inventory-reports', label: 'Inventory Reports', path: '/dashboard/reports/inventory' },
      { id: 'performance', label: 'Performance', path: '/dashboard/reports/performance' },
      { id: 'analytics', label: 'Analytics', path: '/dashboard/reports/analytics' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings, // Langsung komponen ikon
    submenu: [
      { id: 'users', label: 'User Management', path: '/dashboard/settings/users' },
      { id: 'system', label: 'System Settings', path: '/dashboard/settings/system' },
      { id: 'integrations', label: 'Integrations', path: '/dashboard/settings/integrations' }
    ]
  }
];


