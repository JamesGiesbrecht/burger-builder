import { useState, useEffect } from 'react'

export default ajaxClient => {
    const [error, setError] = useState(null)

    //  Clearing the error message on each request
    const reqInterceptor = ajaxClient.interceptors.request.use(request => {
        setError(null)
        return request
    })
    //  If there is an error set it to the error state
    const resInterceptor = ajaxClient.interceptors.response.use(response => response, err => {
        setError(err)
    })

    useEffect(() => {
        return () => {
            //  Removing interceptors when done with this class to improve performance and prevent momory leaks and errors
            ajaxClient.interceptors.request.eject(reqInterceptor)
            ajaxClient.interceptors.response.eject(resInterceptor)
        }
    }, [reqInterceptor, resInterceptor, ajaxClient])


    const errorConfirmedHandler = () => {
        setError(null)
    }

    return [error, errorConfirmedHandler]
}