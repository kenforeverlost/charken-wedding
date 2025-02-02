'use client'
import { useEffect, useState } from 'react'
import { ImLocation } from 'react-icons/im'
import { LoadingRing } from '@components/icons'
import { supabase } from '@lib/supabase'

export default function FormalRsvpForm({ ...props }: any) {
  const [processing, setProcessing] = useState<boolean>(false)
  const [rsvpGroupData, setRsvpGroupData] = useState<any>(props?.rsvpGroupData)
  const [updateIndexArray, setUpdateIndexArray] = useState<any>([])
  const [saveResponse, setSaveResponse] = useState<any>({
    result: true,
    message: '',
    textClass: '',
  })

  const foodChoices = [
    {
      text: 'Brasserie Style Roasted Mary’s Chicken',
      value: 'chicken',
      sides:
        'Sonoma County Merlot & Rosemary Reduction, Potato Leek Gratin, Harvest Market Vegetables',
    },
    {
      text: 'Filet Mignon',
      value: 'beef',
      sides:
        'Wild Mushrooms, Truffle Whipped Potatoes, Port Wine Jus, Roasted Asparagus, Thumbelina Carrots, Horseradish Gremolata',
    },
    {
      text: 'Pan Seared Chilean Sea Bass',
      value: 'seafood',
      sides:
        'Cauliflower Chowder, Roasted PeeWee Potatoes, Cipollini onions, Beurre Blanc',
    },
    {
      text: 'Vegan Option',
      value: 'vegan',
      sides: 'Dish TBD',
    },
  ]

  const updateRsvpGroup = (updatedPerson: any, rsvpGroupDataIndex: number) => {
    console.log(updatedPerson)
    console.log(rsvpGroupDataIndex)
    let currentGroupData = JSON.parse(JSON.stringify(rsvpGroupData))

    if (updatedPerson?.rsvp == 'no') {
      updatedPerson.dietary_restriction = null
      updatedPerson.food_choice = null
      updatedPerson.preferred_first_name = null
      updatedPerson.preferred_last_name = null
      updatedPerson.welcome_party_rsvp = null
    }

    currentGroupData[rsvpGroupDataIndex] = updatedPerson

    let atleastOneYes = currentGroupData.some((item) => item.rsvp === 'yes')

    if (!atleastOneYes) {
      currentGroupData.map(async (person, index) => {
        currentGroupData[index].song_request = null
      })
    }

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

  const updateAllRsvpGroup = (field: any, newValue: any) => {
    let currentGroupData = JSON.parse(JSON.stringify(rsvpGroupData))
    let newIndexArray = []

    currentGroupData.map(async (person, index) => {
      currentGroupData[index][field] = newValue

      if (!updateIndexArray.includes(index)) {
        newIndexArray.push(index)
      }
    })

    setRsvpGroupData(currentGroupData)

    setUpdateIndexArray([...updateIndexArray, ...newIndexArray])

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

    let validationMessage = ''
    rsvpGroupData.map(async (person, index) => {
      if (person.rsvp === 'yes') {
        if (person.preferred_first_name === null) {
          person.preferred_first_name = person.first_name
        }

        if (person.preferred_last_name === null) {
          person.preferred_last_name = person.last_name
        }

        if (
          person.preferred_first_name === '' ||
          person.preferred_last_name === ''
        ) {
          validationMessage =
            'Please spell the first and last name for each attending guest'
          return
        }

        if (!person?.food_choice || person.food_choice === '') {
          validationMessage =
            'Please select a dinner choice for each attending guest'
          return
        }

        if (person.welcome_party) {
          if (!person?.welcome_party_rsvp || person.welcome_party_rsvp === '') {
            validationMessage =
              'Please select the Welcome Party RSVP for each attending guest'
            return
          }
        }
      }
    })

    if (validationMessage !== '') {
      setSaveResponse({
        result: false,
        message: validationMessage,
        textClass: 'text-error',
      })
      setProcessing(false)
      return
    }

    rsvpGroupData.map(async (person, index) => {
      if (updateIndexArray.includes(index)) {
        const { data, error } = await supabase
          .from('guestlist')
          .update({ ...person })
          .eq('id', person.id)

        if (error) {
          setSaveResponse({
            result: false,
            message:
              'Your response cannot be recorded at this time. Pleas try again later.',
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

  let welcomeParty = process.env.NEXT_PUBLIC_WELCOME_PARTY_LOCATION
  let welcomePartyLink = process.env.NEXT_PUBLIC_WELCOME_PARTY_LOCATION_LINK

  let isMissingInput = false
  let atleastOneYes = rsvpGroupData.some((item) => item.rsvp === 'yes')

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        handleSubmit(e)
      }}
    >
      <div className="flex flex-col gap-16 items-center justify-center">
        {rsvpGroupData.map((person, personIndex) => {
          if (!isMissingInput && person?.rsvp === null) {
            isMissingInput = true
          }
          return (
            <div
              key={personIndex}
              className="w-full max-w-sm sm:max-w-4xl flex flex-col gap-16 pb-16 border-b border-secondary"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-3 ">
                <div className="flex items-center justify-center font-bold text-lg">{`${person.first_name} ${person.last_name}`}</div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-16">
                  {['yes', 'no'].map((rsvpOption) => {
                    let optionText =
                      rsvpOption === 'yes'
                        ? 'Joyfully Accepts'
                        : 'Regretfully Declines'

                    return (
                      <label className="label cursor-pointer flex flex-row sm:flex-col gap-5 justify-start">
                        <input
                          type="radio"
                          name={`rsvp-${person.id}`}
                          className="radio radio-md radio-secondary"
                          value={rsvpOption}
                          checked={person?.rsvp === rsvpOption}
                          onChange={(e) =>
                            updateRsvpGroup(
                              { ...person, rsvp: e.target.value },
                              personIndex,
                            )
                          }
                        />
                        <span className="label-text">{optionText}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
              {person?.rsvp === 'yes' && (
                <div className="flex flex-col gap-16 items-center w-full">
                  <div className="w-full max-w-lg pb-16 border-b border-secondary">
                    <div className="font-bold text-center pb-3 text-lg">
                      Spell your first and last name
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-5">
                      <input
                        type="text"
                        className="input input-bordered w-52 input-sm"
                        value={
                          person?.preferred_first_name
                            ? person?.preferred_first_name
                            : person?.first_name
                        }
                        onChange={(e) =>
                          updateRsvpGroup(
                            { ...person, preferred_first_name: e.target.value },
                            personIndex,
                          )
                        }
                      />
                      <input
                        type="text"
                        className="input input-bordered w-52 input-sm"
                        value={
                          person?.preferred_last_name
                            ? person?.preferred_last_name
                            : person?.last_name
                        }
                        onChange={(e) =>
                          updateRsvpGroup(
                            { ...person, preferred_last_name: e.target.value },
                            personIndex,
                          )
                        }
                      />
                    </div>
                  </div>
                  {person?.food_choice === 'kid' ? (
                    <div className="w-full max-w-lg">
                      <div className="font-bold text-center pb-3 text-lg">
                        Select your dinner choice
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="label cursor-pointer flex flex-col justify-start items-start gap-3">
                          <div className="flex flex-row gap-5 justify-start items-center">
                            <input
                              type="radio"
                              name={`food-choice-${person.id}`}
                              className="radio radio-md radio-secondary"
                              value="kid"
                              checked={true}
                              onChange={(e) =>
                                updateRsvpGroup(
                                  { ...person, food_choice: e.target.value },
                                  personIndex,
                                )
                              }
                            />
                            <span className="label-text">Kid's Option</span>
                          </div>
                          <div className="label-text italic">Meal TBD</div>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-lg">
                      <div className="font-bold text-center pb-3 text-lg">
                        Select your dinner choice
                      </div>
                      <div className="flex flex-col gap-2">
                        {foodChoices.map((foodData, foodDataIndex) => {
                          return (
                            <label className="label cursor-pointer flex flex-col justify-start items-start gap-3">
                              <div className="flex flex-row gap-5 justify-start items-center">
                                <input
                                  type="radio"
                                  name={`food-choice-${person.id}`}
                                  className="radio radio-md radio-secondary"
                                  value={foodData.value}
                                  checked={
                                    person?.food_choice === foodData.value
                                  }
                                  onChange={(e) =>
                                    updateRsvpGroup(
                                      {
                                        ...person,
                                        food_choice: e.target.value,
                                      },
                                      personIndex,
                                    )
                                  }
                                />
                                <span className="label-text">
                                  {foodData.text}
                                </span>
                              </div>
                              <div className="label-text italic">
                                {foodData.sides}
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  <div
                    className={`w-full max-w-lg ${
                      person.welcome_party
                        ? 'pb-16 border-b border-secondary'
                        : ''
                    }`}
                  >
                    <div className="text-center pb-3 text-lg font-bold">
                      Any dietary restrictions?
                    </div>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      value={
                        person?.dietary_restriction
                          ? person?.dietary_restriction
                          : ''
                      }
                      placeholder=""
                      onChange={(e) =>
                        updateRsvpGroup(
                          { ...person, dietary_restriction: e.target.value },
                          personIndex,
                        )
                      }
                    ></textarea>
                  </div>
                  {person.welcome_party && (
                    <div className="w-full max-w-lg">
                      <div className="flex flex-col gap-5 text-center pb-3 text-lg">
                        <div className="font-bold">
                          You are invited to our welcome party!
                        </div>
                        <div className="mx-auto w-full max-w-sm">
                          <div>Date: October 9th, 2024</div>
                          <div>Time: 5:30 PM</div>
                          <div className="">
                            <div>
                              Location:{' '}
                              <a
                                href="https://maps.app.goo.gl/a7CeSvpDDaKry2e99"
                                target="_blank"
                                className=""
                              >
                                <ImLocation className="inline" /> Public School
                                702
                              </a>
                            </div>
                          </div>
                          <div>Attire: Dressy Casual</div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {['yes', 'no'].map((welcomePartyOption) => {
                          return (
                            <label className="label cursor-pointer flex flex-row gap-5 justify-start">
                              <input
                                type="radio"
                                name={`welcome-party-${person.id}`}
                                className="radio radio-md radio-secondary"
                                value={welcomePartyOption}
                                checked={
                                  person?.welcome_party_rsvp ===
                                  welcomePartyOption
                                }
                                onChange={(e) =>
                                  updateRsvpGroup(
                                    {
                                      ...person,
                                      welcome_party_rsvp: e.target.value,
                                    },
                                    personIndex,
                                  )
                                }
                              />
                              <span className="label-text">
                                {welcomePartyOption === 'yes'
                                  ? `Yes, I will be able to attend!`
                                  : `No, can't make it, but see you on wedding day!`}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
        {atleastOneYes && (
          <div className="w-full max-w-lg">
            <div className="text-center pb-3 text-lg font-bold">
              Suggest a song!
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              value={
                rsvpGroupData[0]?.song_request
                  ? rsvpGroupData[0]?.song_request
                  : ''
              }
              placeholder=""
              onChange={(e) =>
                updateAllRsvpGroup('song_request', e.target.value)
              }
            ></textarea>
          </div>
        )}
        <div className="w-full max-w-lg">
          <div className="text-center pb-3 text-lg font-bold">
            Leave us a message!
          </div>
          <textarea
            className="textarea textarea-bordered w-full"
            value={rsvpGroupData[0]?.comment ? rsvpGroupData[0]?.comment : ''}
            placeholder=""
            onChange={(e) => updateAllRsvpGroup('comment', e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
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
          {saveResponse?.message && (
            <div
              className={`${saveResponse.textClass} w-full px-3 text-center`}
            >
              {saveResponse?.message}
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
