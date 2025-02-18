import { lazy, Suspense } from 'react'
import AuthenticationRouter from '../utils/AuthenticationRouter'
import ProtectedRoute from '../utils/ProtectedRoute'
import OtpProtectedRoute from '../utils/OtpProtectedRoute.jsx'
import CheckoutWrapper from '../utils/CheckoutWrapper.jsx'
import PaymentWrapper from '../utils/PaymentWrapper.jsx'
import OrderConfirmationWrapper from '../utils/OrderConfirmationWrapper.jsx'
import UserSideLayout from '../components/layout/UserSide/Layout/UserSideLayout.jsx'
import UserLayout from '../components/layout/UserSide/UserLayout'
import Spinner from '../components/common/Animations/Spinner.jsx'

// Lazy-loaded components
const UserLoginPage = lazy(() => import('../pages/UserSide/Login/UserLoginPage'))
const UserSignUpPage = lazy(() => import('../pages/UserSide/Signup/UserSignUpPage'))
const HomePage = lazy(() => import('../pages/UserSide/Home/HomePage.jsx'))
const UserOTPPage = lazy(() => import('../pages/UserSide/OTP/UserOTPPage.jsx'))
const BlockedPage = lazy(() => import('../pages/UserSide/BlockedUser/BlockedPage'))
const ForgotPasswordPage = lazy(() => import('../pages/UserSide/Login/ForgotPasswordPage'))
const PasswordResetPage = lazy(() => import('../pages/UserSide/Login/PasswordResetPage.jsx'))
const ProductBrowsePage = lazy(() => import('../pages/UserSide/ProductsBrowse/ProductBrowsePage.jsx'))
const ProductDetailPage = lazy(() => import('../pages/UserSide/ProductsBrowse/ProductDetailPage.jsx'))
const CartPage = lazy(() => import('../pages/UserSide/Cart/CartPage.jsx'))
const AccountPage = lazy(() => import('../pages/UserSide/Account/AccountPage.jsx'))
const CheckoutPage = lazy(() => import('../pages/UserSide/Checkout/CheckoutPage.jsx'))
const PaymentPage = lazy(() => import('../pages/UserSide/Payment/PaymentPage.jsx'))
const OrderConfirmedPage = lazy(() => import('../pages/UserSide/Payment/OrderConfirmedPage.jsx'))
const WishlistPage = lazy(() => import('../pages/UserSide/Wishlist/WishlistPage.jsx'))
const ArtistsBrowsePage = lazy(() => import('../pages/UserSide/Artists/ArtistsBrowsePage.jsx'))
const ArtistDetailsPage = lazy(() => import('../pages/UserSide/Artists/ArtistDetailsPage.jsx'))
const OrderDetails = lazy(() => import('../pages/UserSide/Account/OrderDetails.jsx'))
const SetUpPage = lazy(() => import('../pages/UserSide/Signup/SetUpPage.jsx'))
const NotFound = lazy(() => import('../pages/UserSide/NotFound/NotFound.jsx'))

const LazyLoad = (Component) => (
  <Suspense fallback={<Spinner center={true} />}>
    {Component}
  </Suspense>
)

const UserRoutes = [
  {
    path: '',
    element: <UserSideLayout />,
    children: [
      {
        path: '/login',
        element: <AuthenticationRouter element={LazyLoad(<UserLoginPage />)} />
      },
      {
        path: '/login/forgot-password',
        element: LazyLoad(<ForgotPasswordPage />)
      },
      {
        path: '/reset-password',
        element: LazyLoad(<PasswordResetPage />)
      },
      {
        path: '/signUp',
        element: <AuthenticationRouter element={LazyLoad(<UserSignUpPage />)} />
      },
      {
        path: '/send-otp',
        element: <OtpProtectedRoute element={LazyLoad(<UserOTPPage />)} />
      },
      {
        path: '/set-up',
        element: LazyLoad(<SetUpPage />)
      },
      {
        path: '/',
        element: <UserLayout />,
        children: [
          {
            path: '',
            element: LazyLoad(<HomePage />)
          },
          {
            path: 'all',
            element: LazyLoad(<ProductBrowsePage />)
          },
          {
            path: 'all/:productId',
            element: LazyLoad(<ProductDetailPage />)
          },
          {
            path: 'cart',
            element: LazyLoad(<CartPage />)
          },
          {
            path: 'wishlist',
            element: LazyLoad(<WishlistPage />)
          },
          {
            path: 'artists',
            element: LazyLoad(<ArtistsBrowsePage />)
          },
          {
            path: 'artists/:id',
            element: LazyLoad(<ArtistDetailsPage />)
          },
          {
            path: 'account',
            element: <ProtectedRoute element={LazyLoad(<AccountPage />)} />
          },
          {
            path: 'account/:routes',
            element: <ProtectedRoute element={LazyLoad(<AccountPage />)} />
          },
          {
            path: 'account/order-history/:id',
            element: <ProtectedRoute element={LazyLoad(<OrderDetails />)} />
          },
          {
            path: 'order-confirmed',
            element: <OrderConfirmationWrapper />,
            children: [
              {
                path: '',
                element: LazyLoad(<OrderConfirmedPage />)
              }
            ]
          }
        ]
      },
      {
        path: '/checkout',
        element: <CheckoutWrapper />,
        children: [
          {
            path: '',
            element: LazyLoad(<CheckoutPage />)
          },
          {
            path: 'payment',
            element: <PaymentWrapper />,
            children: [
              {
                path: '',
                element: LazyLoad(<PaymentPage />)
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: LazyLoad(<NotFound />)
      }
    ]
  },
  {
    path: '/blocked',
    element: LazyLoad(<BlockedPage />)
  }
]
export default UserRoutes
