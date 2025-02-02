'use client'

import { useEffect, useState } from 'react'
import { Noto_Sans } from 'next/font/google'

const countDownDate = new Date('Oct 10, 2024 15:00:00').getTime()

const numberText = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export default function WeddingCountdown({ ...props }: any) {
  const [isClient, setIsClient] = useState(false)
  const [count, setCount] = useState(0)
  const [timeDiff, setTimeDiff] = useState(countDownDate - props?.initialTime)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1)

      let now = new Date().getTime()
      let timeDifference = countDownDate - now

      setTimeDiff(timeDifference)
    }, 100)

    return () => clearInterval(interval)
  }, [count])

  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

  let numberItems = [
    {
      timeValue: days,
      timeLabel: 'Days',
    },
    {
      timeValue: hours,
      timeLabel: 'Hours',
    },
    {
      timeValue: minutes,
      timeLabel: 'Minutes',
    },
    {
      timeValue: seconds,
      timeLabel: 'Seconds',
    },
  ]

  if (timeDiff < 0)
    return (
      <div
        className={`${props?.className} text-2xl sm:text-4xl font-bold mb-3 py-4`}
      >
        Just Married!
      </div>
    )
  else
    return (
      <div
        className={`${numberText.className} ${props?.className} text-primary text-center`}
      >
        <div className={`flex flex-row gap-6 sm:gap-9 mb-3`}>
          {numberItems.map((numberItem, key) => {
            return (
              <div
                key={key}
                className="flex flex-col gap-3 justify-center items-center"
              >
                <div className={`text-2xl sm:text-4xl font-bold`}>
                  {numberItem.timeValue}
                </div>
                <div className={`text-xs sm:text-sm`}>
                  {numberItem.timeLabel}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
}
