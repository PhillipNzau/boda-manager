// const url = 'http://localhost:8080/';
const url = 'https://boda-manager-backend.onrender.com/';

const authBaseUrl = url + 'auth/';
const ridersBaseUrl = url + 'riders';
const motorcyclesBaseUrl = url + 'motorcycles';
const ridesBaseUrl = url + 'rides';
const paymentsBaseUrl = url + 'payments';
const expensesBaseUrl = url + 'expenses';
const analyticsBaseUrl = url + 'analytics';
const alertsBaseUrl = url + 'alerts';
const exportBaseUrl = url + 'exports/report';
const importBaseUrl = url + 'import';
const dashboardBaseUrl = url + 'dashboard';

export const environment = {
  production: false,

  ///////////////** AUTH URLS **///////////////////
  loginUser: authBaseUrl + 'login',
  registerUser: authBaseUrl + 'register',
  refreshToken: authBaseUrl + 'refresh',

  ///////////////** RIDERS URLS **///////////////////
  listRiders: ridersBaseUrl,
  createRider: ridersBaseUrl,
  editRider: ridersBaseUrl + '/',
  deleteRider: ridersBaseUrl + '/',

  ///////////////** MOTORCYCLES URLS **///////////////////
  listMotorcycles: motorcyclesBaseUrl,
  createMotorcycle: motorcyclesBaseUrl,
  editMotorcycle: motorcyclesBaseUrl + '/',

  ///////////////** RIDES URLS **///////////////////
  listRides: ridesBaseUrl,
  logRide: ridesBaseUrl,

  ///////////////** PAYMENTS URLS **///////////////////
  listPayments: paymentsBaseUrl,
  getPayment: paymentsBaseUrl + '/',
  createPayment: paymentsBaseUrl,
  deletePayment: paymentsBaseUrl + '/',

  ///////////////** EXPENSES URLS **///////////////////
  listExpenses: expensesBaseUrl,
  createExpense: expensesBaseUrl,

  ///////////////** ANALYTICS & DASHBOARD URLS **///////////////////
  dashboardSummary: dashboardBaseUrl,
  missedPayments: alertsBaseUrl + '/missed-payments',
  monthlyAnalytics: analyticsBaseUrl + '/monthly',
  motorcycleProfitability: analyticsBaseUrl + '/motorcycles/',

  ///////////////** IMPORT / EXPORT URLS **///////////////////
  exportExcel: exportBaseUrl,
};
