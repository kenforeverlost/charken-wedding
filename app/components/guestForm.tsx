'use client'

import { Unna } from 'next/font/google'
import { useEffect, useState } from 'react'
import { LoadingRing } from '@components/icons'
import FormalRsvpForm from '@components/formalRsvpForm'
import SaveTheDateForm from '@components/saveTheDateForm'
import { isRsvpActive, searchForGuest } from '@lib/helpers'

const mainText = Unna({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export default function GuestForm() {
  const [processing, setProcessing] = useState<boolean>(false)
  const [hideUserForm, setHideUserForm] = useState<any>(false)
  const [rsvpGroupData, setRsvpGroupData] = useState<any>([])
  const [userForm, setUserForm] = useState<any>({
    first_name: '',
    last_name: '',
  })
  const [searchResponse, setSearchResponse] = useState<any>({
    result: false,
    message: '',
    textClass: '',
  })

  let useFormalRsvp = process.env.NEXT_PUBLIC_USE_FORMAL_RSVP === 'true'

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (userForm) {
      setProcessing(true)
      setSearchResponse({
        result: false,
        message: '',
      })

      let response = await searchForGuest(
        userForm.first_name,
        userForm.last_name,
        useFormalRsvp,
      )

      if (response.result) {
        if (response.matchType === 'partial') {
          setUserForm({
            first_name: response?.data?.first_name,
            last_name: response?.data?.last_name,
          })
          setSearchResponse({
            result: true,
            message: `Did you mean ${response?.data?.first_name} ${response?.data?.last_name}?`,
            textClass: 'text-warning',
          })
        } else {
          setUserForm({ first_name: '', last_name: '' })
          setHideUserForm(true)
          setRsvpGroupData(response?.groupData)
          setSearchResponse({
            result: true,
            message: 'Invitation found!',
            textClass: 'text-success',
          })
        }
      } else {
        setSearchResponse({
          result: false,
          message:
            'We are having trouble finding your invite. Please try another spelling of your name or contact us.',
          textClass: 'text-error',
        })
      }
      setProcessing(false)
    }
  }

  let rsvpActive = isRsvpActive()

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col w-full items-center justify-center gap-12 max-w-lg sm:max-w-4xl px-5">
        <div className={`text-2xl font-bold ${mainText.className}`}>
          {useFormalRsvp ? `Your Formal Invitation` : `You're Invited!`}
        </div>
        {!rsvpActive ? (
          <div className="text-center px-5">
            Unfortunately, the RSVP deadline has passed. Please contact the
            couple for assistance.
          </div>
        ) : !hideUserForm ? (
          <form
            className="flex flex-col w-full items-center gap-12"
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            <div className="text-center px-5">
              <div className="mb-5">
                {useFormalRsvp ? (
                  <span>
                    Complete your RSVP below. You must complete the RSVP by{' '}
                    <b>August 30th</b>! Please visit our{' '}
                    <a href="/q-and-a" className="underline">
                      Q + A
                    </a>{' '}
                    for additional help.
                  </span>
                ) : (
                  <span>
                    Complete the form below to let us know you received our
                    details.
                  </span>
                )}
              </div>
              <div>
                If you are responding for you and your significant other and/or
                your family, you'll be able to respond for your entire group.
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <input
                type="text"
                placeholder={'First Name'}
                className="input input-bordered w-52 input-sm"
                value={userForm.first_name}
                onChange={(e) => {
                  setUserForm({
                    first_name: e.target.value,
                    last_name: userForm?.last_name,
                  })
                }}
              />
              <input
                type="text"
                placeholder={'Last Name'}
                className="input input-bordered w-52 input-sm"
                value={userForm.last_name}
                onChange={(e) => {
                  setUserForm({
                    first_name: userForm?.first_name,
                    last_name: e.target.value,
                  })
                }}
              />
            </div>
            <button
              type="submit"
              className="btn cursor-pointer w-64 btn-primary disabled:bg-accent"
              disabled={
                processing || !userForm?.first_name || !userForm?.last_name
              }
            >
              {processing ? <LoadingRing /> : 'Submit'}
            </button>

            {searchResponse?.message && (
              <div
                className={`${searchResponse.textClass} w-full px-3 text-center`}
              >
                {searchResponse?.message}
              </div>
            )}
          </form>
        ) : useFormalRsvp ? (
          <FormalRsvpForm rsvpGroupData={rsvpGroupData} />
        ) : (
          <SaveTheDateForm rsvpGroupData={rsvpGroupData} />
        )}
      </div>
    </div>
  )
}
