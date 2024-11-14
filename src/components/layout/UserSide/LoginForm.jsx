import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import api from '../../../services/api/api'
import { validateLoginForm } from '../../../utils/validation/FormValidation'
import { Link, useNavigate } from 'react-router-dom'
import { setSignUpStatus, setUser } from '../../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { provider, auth } from '../../../services/firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { toast, Toaster } from 'sonner'
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const testUser = () => {
    setEmail('fizanu@gmail.com')
    setPassword('1')
  }
  const testAdmin = () => {
    setEmail('fizan@gmail.com')
    setPassword('1')
  }
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const idToken = await user.getIdToken()

      const res = await api.post('/users/google/auth', { idToken })
      const data = {
        user: res.data._id,
        role: res.data.role,
        status: res.data.status,
        accessToken: res.data.accessToken
      }
      if (res.data.newUser) {
        dispatch(setSignUpStatus(true))
        navigate('/set-up', { replace: true })
        setTimeout(() => dispatch(setUser(data)), 100)
      } else {
        toast.success('Login Successfull')
        dispatch(setUser(data))
      }
    } catch (error) {
      // Handle Errors here.
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error email:', error.customData?.email)
      console.error('Error credential:', error.credential)
    }
  }
  //------handle login
  const handleLoginSubmit = async e => {
    e.preventDefault()
    const formData = { email, password }
    const errors = validateLoginForm(formData)
    if (Object.keys(errors).length > 0) {
      return setErrors(errors)
    }

    try {
      const res = await api.post('/users/login', formData)
      const data = {
        user: res.data._id,
        role: res.data.role,
        status: res.data.status,
        accessToken: res.data.accessToken
      }
      console.log(data)
      dispatch(setUser(data))
      toast.success('Login Successfull')
    } catch (error) {
      const responseError = error?.response?.data?.message || error
      setErrors({ ...errors, responseError })
    }
  }
  return (
    <>
      <div className='flex bg-slate-50 min-h-full flex-1 pt-20 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto mt-6 sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 md:text-4.5xl text-4xl font-primary tracking-tighter whitespace-nowrap leading-5 font-semibold text-center text-customColorTertiaryDark'>
            Sign Into your account
          </h2>
        </div>

        <div className=' mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
          <p className='mb-12  text-center text-sm text-gray-500'>
            Don't have an Account?{' '}
            <a
              onClick={() => {
                navigate('/signup')
              }}
              className='font-semibold leading-6 text-textPrimary hover:underline'
            >
              SignUp !
            </a>
          </p>
          <div
            className={`text-center font-primary font-semibold  ${
              errors.responseError
                ? 'p-1 bg-red-100 border-red-300 border'
                : 'p-1 bg-transparent'
            }`}
          >
            <p className='text-red-500 hover:text-red-700'>
              {errors.responseError ? errors.responseError : ''}
            </p>
          </div>

          <form
            onSubmit={e => {
              handleLoginSubmit(e)
            }}
            className='space-y-6'
          >
            <div className='w-full pt-3'>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='text'
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                  }}
                  autoComplete='email'
                  className='w-full p-2  border border-customBorder  text-gray-900  focus:outline-none focus:ring-2 focus:ring-customColorTertiarypop focus:border-customColorSecondary transition ease-in-out duration-300  placeholder-opacity-75'
                />
                <div className='pt-2 font-tertiary'>
                  {errors.email && (
                    <p className='text-red-500 hover:text-red-300'>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <Link
                    className='font-semibold text-textPrimary hover:text-textPrimary/80 underline'
                    to={'/login/forgot-password'}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                  autoComplete='current-password'
                  className='w-full p-2  border border-customBorder  text-gray-900  focus:outline-none focus:ring-2 focus:ring-customColorTertiarypop focus:border-customColorSecondary transition ease-in-out duration-300  placeholder-opacity-75'
                />
              </div>
              <div className='pt-2 font-tertiary'>
                {errors.password && (
                  <p className='text-red-500 hover:text-red-300'>
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className='flex justify-center pt-2'>
              <button
                type='submit'
                className='flex  w-4/12 justify-center duration-300  bg-customColorTertiary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customColorTertiaryLight  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customColorSecondary'
              >
                Sign in
              </button>
            </div>
            <div className='text-slate-950 mt-10 items-center grid-cols-3 grid'>
              <hr className='text-slate-950' />
              <p className='text-center'>OR</p>
              <hr className='text-slate-950' />
            </div>
            <div>
              <button
                className='bg-white border py-2 w-full mb-24 flex hover:bg-customColorSecondary duration-300'
                onClick={() => {
                  handleGoogleAuth()
                }}
                type='button'
              >
                <FcGoogle className='text-3xl text-black ms-20 opacity-70' />{' '}
                <p className=' font-tertiary  mt-1 ms-5 font-semibold '>
                  Login With Google
                </p>
              </button>
              <button
                onClick={() => {
                  testUser()
                }}
              >
                user
              </button>
              <button onClick={testAdmin}>admin</button>
            </div>
          </form>
          <Toaster position='bottom-right' richColors />
        </div>
      </div>
    </>
  )
}

export default LoginForm
