'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoadingRing } from '@components/icons'
import { validateRsvpPassword } from '@lib/helpers'
import { getSessionData, setSessionData } from '@lib/server'

export default function AccessForm() {
  const [processing, setProcessing] = useState<boolean>(false)
  const [userForm, setUserForm] = useState<any>({
    password: '',
  })
  const [loginResponse, setLoginResponse] = useState<any>({
    result: false,
    message: '',
  })
  const router = useRouter()

  useEffect(() => {
    if (loginResponse.result) {
      setInterval(() => {
        router.push('/home')
      }, 5000)
    }
  })

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()

        if (userForm.password) {
          setProcessing(true)
          setLoginResponse({
            result: false,
            message: '',
          })

          let response = await validateRsvpPassword(userForm.password)

          if (response.result) {
            setSessionData()
            setUserForm({ password: '' })
            setLoginResponse({
              result: true,
              message: `${response.message} Logging in...`,
            })
          } else {
            setLoginResponse({
              result: false,
              message: `${response.message}`,
            })
            setProcessing(false)
          }
        }
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-3 sm:gap-5">
          <div>Password</div>
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-5">
            <div className="relative">
              <input
                type="password"
                placeholder={processing ? '' : 'Type here'}
                className="input input-bordered w-52 input-sm"
                value={userForm.password}
                onChange={(e) => {
                  setUserForm({ password: e.target.value })
                }}
              />
              {loginResponse?.message && (
                <div
                  className={`${
                    loginResponse.result ? 'text-success' : 'text-error'
                  } text-xs absolute top-10 left-0 w-full px-3`}
                >
                  {loginResponse?.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-sm cursor-pointer w-12"
              disabled={processing}
            >
              {processing ? <LoadingRing /> : 'Go'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
