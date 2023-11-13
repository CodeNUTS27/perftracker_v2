import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, AccountRecovery, DashboardAdmin, Dashboard, DeliveredFormsAdmin, OrderFormsPage, AboutKPIsAdmin, ReportsAdmin, ProfileAdmin, ResellersAdmin, ApprovalsAdmin, OrderFormsAdmin, ResignAdmin, AboutKPIs, MyRatings, DeliveredForms, ProfileReseller, FurnitureReseller, Transactions, Summary, Placement } from './pages';
import { AdminRoute, OrderForms, OrderInfo, ResellerRoute } from './components';
import { Perftracker } from './Perftracker';
import ProtectedRoutes from './components/ProtectedRoutes';
import CartReseller from './pages/reseller/CartReseller';
import OrderStatusPage from './pages/reseller/OrderStatusPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Perftracker);
  const { userInfo } = state;


  const [isRegistering, setIsRegistering] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* Authenticated routes */}

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><DashboardAdmin /></AdminRoute>} />
          <Route path="/admin/profile" element={<ProfileAdmin />} />
          <Route path="/admin/resellers" element={<ResellersAdmin />} />
          <Route path="/admin/approvals" element={<ApprovalsAdmin />} />
          <Route path="/admin/orderforms" element={<OrderFormsAdmin />} />
          <Route path="/admin/deliveredforms" element={<DeliveredFormsAdmin />} />
          <Route path="/admin/aboutKPIs" element={<AboutKPIsAdmin />} />
          <Route path="/admin/reports" element={<ReportsAdmin />} />
          <Route path="/admin/resign" element={<ResignAdmin />} />

          {/* Reseller Routes */}
          <Route path="/reseller/dashboard" element={<ResellerRoute><Dashboard /></ResellerRoute>} />
          
          <Route path="/reseller/profile" element={<ProfileReseller />} />
          <Route path="/reseller/myratings" element={<MyRatings />} />
          <Route path="/reseller/furnituresets/:slug" element={<ProtectedRoutes><FurnitureReseller /></ProtectedRoutes>} />
          <Route path="/reseller/furnituresets" element={<ProtectedRoutes><FurnitureReseller /></ProtectedRoutes>} />
          <Route path="/reseller/cart" element={<ProtectedRoutes><CartReseller /></ProtectedRoutes>} />
          <Route path="/reseller/orderstatus" element={<OrderStatusPage/>} />
          <Route path="/reseller/transactions" element={<Transactions />} />
          <Route path="/reseller/summary" element={<Summary />} />
          <Route path="/reseller/placement/:id" element={<Placement />} />
          <Route path="/reseller/deliveredforms" element={<DeliveredForms />} />
          <Route path="/reseller/aboutKPIs" element={<AboutKPIs />} />
          {/* ... other authenticated routes ... */}



          {/* Unauthenticated routes */}
          <Route path="/" element={<Login isRegistering={false} />} />
          <Route path="/signup" element={<Login isRegistering={true} />} />
          <Route path="/account-recovery" element={<AccountRecovery />} />
          {/* ... other unauthenticated routes ... */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
