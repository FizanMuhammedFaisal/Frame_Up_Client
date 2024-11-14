import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  EmptyWishlist,
  NotLoggedInWishlist,
  WishlistGrid
} from '../../../components/layout/UserSide/Wishlist/WishlistComponents'
import { useSelector } from 'react-redux'
import { Alert, Snackbar } from '@mui/material'
import Breadcrumb from '../../../components/common/Breadcrumb'
import { useFetchWishlist } from '../../../hooks/useFetchWishlist'
import Spinner from '../../../components/common/Animations/Spinner'

export default function WishlistPage() {
  const { isAuthenticated } = useSelector(state => state.auth)
  const [wishlistItems, setWishlistItems] = useState([])
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  const removeItem = id => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }
  ///
  const { data, loading, error } = useFetchWishlist()
  useEffect(() => {
    if (data) {
      setWishlistItems(data.items)
    }
  }, [data])
  ///
  const handleSetItems = items => {
    setWishlistItems(items)
  }
  //
  if (!isAuthenticated) {
    return <NotLoggedInWishlist />
  }
  const handleCloseSnackbar = () =>
    setSnackbarData({ ...snackbarData, open: false })
  if (loading) {
    return <Spinner center={true} />
  }
  if (error) {
    return <p className='text-red-400'>{error}</p>
  }
  return (
    <>
      <Breadcrumb />
      <div className='min-h-screen mt-2 bg-gradient-to-b font-primary from-customColorSecondary to-white px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='pt-10 pb-11 md:text-4.5xl text-4xl font-primary tracking-tighter leading-5 font-semibold text-center text-customColorTertiaryDark'
          >
            My Wishlist
          </motion.h1>

          <AnimatePresence mode='wait'>
            {wishlistItems.length > 0 ? (
              <WishlistGrid
                setSnackbarData={setSnackbarData}
                setWishlistItems={handleSetItems}
                wishlistItems={wishlistItems}
                removeItem={removeItem}
              />
            ) : (
              <EmptyWishlist />
            )}
          </AnimatePresence>
          <Snackbar
            open={snackbarData.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarData.severity}
              sx={{ width: '100%' }}
            >
              {snackbarData.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  )
}
