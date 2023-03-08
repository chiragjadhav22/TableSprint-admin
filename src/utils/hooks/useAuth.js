import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { apiSignIn, apiSignOut } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

	const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async ({ email, password }) => {
        try {
			//const resp = await apiSignIn({ email, password })
			let resp = {data:{result:{}}}
            // const resp = await apiSignIn({ email, password })
            resp.data.result = {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUsImlhdCI6MTY3NjI5MjY3MSwiZXhwIjoxNjc2Mzc5MDcxfQ.zxpFRcVBCQB_wLjleIsNFOVckEjscHzW4yDPHsSV344",
                "user": [
                    {
                        "id": 35,
                        "role_id": 1,
                        "email": "admin@gmail.com",
                        "username": "admin",
                        "status": 1,
                        "avatar": "/img/avatars/thumb-1.jpg",
                        "authority": [
                            "user"
                        ]
                    }
                ]
            }
			if (resp.data.result) {
				const { token } = resp.data.result
				dispatch(onSignInSuccess(token))
				if(resp.data.result.user) {
					dispatch(setUser(resp.data.result.user || {
						avatar: '', 
						userName: 'Anonymous', 
						authority: ['USER'], 
						email: ''
					}))
				}
				const redirectUrl = query.get(REDIRECT_URL_KEY)
				navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
                return {
                    status: 'success',
                    message: ''
                }
			}
		} catch (errors) {
			return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString()
            }
		}
    }

    const handleSignOut = ()  => {
		dispatch(onSignOutSuccess())
		dispatch(setUser(initialState))
		navigate(appConfig.unAuthenticatedEntryPath)
	}

    const signOut = async () => {
		try {
			await apiSignOut()
			handleSignOut()
		} catch (errors) {
			handleSignOut()
		}
	}
    
    return {
        authenticated: token && signedIn,
        signIn,
        signOut
    }
}

export default useAuth