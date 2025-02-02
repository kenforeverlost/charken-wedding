'use client'

import { useEffect, useState } from 'react'
import { LoadingRing } from '@components/icons'
import { supabase } from '@lib/supabase'

export default function SaveTheDateForm({ ...props }: any) {
  const [processing, setProcessing] = useState<boolean>(false)
  const [rsvpGroupData, setRsvpGroupData] = useState<any>(props?.rsvpGroupData)
  const [updateIndexArray, setUpdateIndexArray] = useState<any>([])
  const [saveResponse, setSaveResponse] = useState<any>({
    result: true,
    message: '',
    textClass: '',
  })

  const updateRsvpGroup = (updatedPerson: any, rsvpGroupDataIndex: number) => {
    let currentGroupData = JSON.parse(JSON.stringify(rsvpGroupData))
    currentGroupData[rsvpGroupDataIndex] = updatedPerson

    setRsvpGroupData(currentGroupData)

    if (!updateIndexArray.includes(rsvpGroupDataIndex)) {
      setUpdateIndexArray([...updateIndexArray, rsvpGroupDataIndex])
    }

    if (saveResponse?.message) {
      setSaveResponse({
        result: true,
        message: '',
        textClass: '',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    rsvpGroupData.map(async (person, index) => {
      if (updateIndexArray.includes(index)) {
        const { data, error } = await supabase
          .from('wedding_guestlist')
          .update({ ...person })
          .eq('id', person.id)

        if (error) {
          setSaveResponse({
            result: false,
            message:
              'Your response cannot be recorded at this time. Contact us if this error persists.',
            textClass: 'text-error',
          })
        } else {
          setSaveResponse({
            result: true,
            message: 'Your response has been recorded!',
            textClass:
              'text-success transition-opacity ease-in duration-700 opacity-100 hover:opacity-0',
          })
        }

        setUpdateIndexArray([])
        setProcessing(false)
      }
    })
  }

  let isMissingInput = false

  return (
    <form
      className="flex flex-col gap-12 w-full"
      onSubmit={(e) => {
        handleSubmit(e)
      }}
    >
      <div className="flex flex-col gap-12 items-center justify-center">
        {rsvpGroupData.map((person, index) => {
          if (!isMissingInput && !person?.soft_rsvp) {
            isMissingInput = true
          }
          return (
            <div
              key={index}
              className="flex flex-col sm:flex-row w-full justify-between max-w-sm sm:max-w-4xl gap-5"
            >
              <div className="flex items-center justify-center font-bold">{`${person.first_name} ${person.last_name}`}</div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-16">
                <label className="label cursor-pointer flex flex-row sm:flex-col gap-5 justify-start">
                  <input
                    type="radio"
                    name={`soft-rsvp-${person.id}`}
                    className="radio radio-md radio-secondary"
                    value="maybe"
                    checked={person?.soft_rsvp === 'maybe'}
                    onChange={(e) =>
                      updateRsvpGroup(
                        { ...person, soft_rsvp: e.target.value },
                        index,
                      )
                    }
                  />
                  <span className="label-text">Your date is saved!</span>
                </label>
                <label className="label cursor-pointer flex flex-row sm:flex-col gap-5 justify-start">
                  <input
                    type="radio"
                    name={`soft-rsvp-${person.id}`}
                    className="radio radio-md radio-secondary"
                    value="no"
                    checked={person?.soft_rsvp === 'no'}
                    onChange={(e) =>
                      updateRsvpGroup(
                        { ...person, soft_rsvp: e.target.value },
                        index,
                      )
                    }
                  />
                  <span className="label-text">
                    Unfortunately cannot make it
                  </span>
                </label>
              </div>
            </div>
          )
        })}
        <div className="w-full px-0 sm:px-16 text-center">
          A formal invitation will follow. Please contact us for any corrections
          to your name or address.
        </div>
        <div className="flex flex-row">
          <button
            type="submit"
            className="btn cursor-pointer btn-primary disabled:bg-accent"
            disabled={
              (processing || updateIndexArray.length <= 0 || isMissingInput) &&
              saveResponse.result
            }
          >
            {processing ? <LoadingRing /> : 'Save'}
          </button>
        </div>

        {saveResponse?.message && (
          <div className={`${saveResponse.textClass} w-full px-3 text-center`}>
            {saveResponse?.message}
          </div>
        )}
      </div>
    </form>
  )
}
