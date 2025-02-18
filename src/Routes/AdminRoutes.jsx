import { lazy } from 'react';
import Spinner from '../components/common/Animations/Spinner';
const LazyLoad = (Component) => (
  <Suspense fallback={<Spinner center={true} />}>
    {Component}
  </Suspense>
)


// Lazy load components
const AdminLoginPage = lazy(() => import('../pages/AdminSide/AdminLoginPage'));
const AdminLayout = lazy(() => import('../components/layout/AdminSide/AdminLayout'));
const AuthenticationRouter = lazy(() => import('../utils/AuthenticationRouter'));
const ProtectedRoute = lazy(() => import('../utils/ProtectedRoute'));
const AdminDashboard = lazy(() => import('../pages/AdminSide/Dashboard/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/AdminSide/Products/AdminProducts'));
const AdminUsers = lazy(() => import('../pages/AdminSide/Users/AdminUsers'));
const DashboardLayout = lazy(() => import('../components/layout/AdminSide/DashBoardLayout'));
const AdminAddProducts = lazy(() => import('../pages/AdminSide/AdminAddProducts'));
const AdminOrders = lazy(() => import('../pages/AdminSide/Orders/AdminOrders'));
const AdminCategory = lazy(() => import('../pages/AdminSide/Categories/AdminCategories'));
const AdminSalesReport = lazy(() => import('../pages/AdminSide/AdminSalesReport'));
const AddCategoriesPage = lazy(() => import('../pages/AdminSide/Categories/AddCategoriesPage'));
const ProductEditPage = lazy(() => import('../pages/AdminSide/Products/ProductEditPage'));
const AdminArtists = lazy(() => import('../pages/AdminSide/Artists/AdminArtists'));
const AddArtists = lazy(() => import('../pages/AdminSide/Artists/AddArtists'));
const OrdersEditPage = lazy(() => import('../pages/AdminSide/Orders/OrdersEditPage'));
const AdminDiscountPage = lazy(() => import('../pages/AdminSide/Discounts/AdminDiscountPage'));
const AddDiscountPage = lazy(() => import('../pages/AdminSide/Discounts/AddDiscountPage'));
const AdminCouponsPage = lazy(() => import('../pages/AdminSide/Coupons/AdminCouponsPage'));
const AddCouponsPage = lazy(() => import('../pages/AdminSide/Coupons/AddCouponsPage'));
const ReturnRequestPage = lazy(() => import('../pages/AdminSide/Orders/ReturnRequestPage'));
const CategoryEdit = lazy(() => import('../pages/AdminSide/Categories/CategoryEdit'));
const EditCouponPage = lazy(() => import("../pages/AdminSide/Coupons/EditCouponPage"));

const AdminRoutes = [
  {
    path: '/admin/login',
    element: LazyLoad(<AuthenticationRouter element={<AdminLoginPage />} />)
  },

  {
    path: '',
    element: LazyLoad(
      <ThemeProvider>
        <AdminLayout />
      </ThemeProvider>
    ),
    children: [
      {
        path: '/dashboard',
        element: LazyLoad(<ProtectedRoute element={<DashboardLayout />} adminRoute={true} />),
        children: [
          {
            path: '',
            element: LazyLoad(<AdminDashboard />)
          },

          {
            path: 'products',
            element: LazyLoad(<AdminProducts />)
          },
          {
            path: 'users',
            element: LazyLoad(<AdminUsers />)
          },
          {
            path: 'artists',
            element: LazyLoad(<AdminArtists />)
          },
          {
            path: 'artists/add-artists',
            element: LazyLoad(<AddArtists />)
          },
          {
            path: 'add-products',
            element: LazyLoad(<AdminAddProducts />)
          },
          {
            path: 'orders',
            element: LazyLoad(<AdminOrders />)
          },

          {
            path: 'orders/return-requests',
            element: LazyLoad(<ReturnRequestPage />)
          },
          {
            path: 'orders/:orderId',
            element: LazyLoad(<OrdersEditPage />)
          },
          {
            path: 'category',
            element: LazyLoad(<AdminCategory />)
          },
          {
            path: 'category/add-categories',
            element: LazyLoad(<AddCategoriesPage />)
          },
          {
            path: 'category/:categoryId',
            element: LazyLoad(<CategoryEdit />)
          },
          {
            path: 'products/:productId',
            element: LazyLoad(<ProductEditPage />)
          },
          {
            path: 'discounts',
            element: LazyLoad(<AdminDiscountPage />)
          },
          {
            path: 'discounts/add',
            element: LazyLoad(<AddDiscountPage />)
          },

          {
            path: 'coupons',
            element: LazyLoad(<AdminCouponsPage />)
          },
          {
            path: 'coupons/add-coupons',
            element: LazyLoad(<AddCouponsPage />)
          },{
            path: 'coupons/edit/:couponId',
            element: LazyLoad(<EditCouponPage />)
          },

          {
            path: 'sales-report',
            element: LazyLoad(<AdminSalesReport />)
          }
        ]
      }
    ]
  }
]

export default AdminRoutes;
