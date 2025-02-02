'use client'

import { useEffect, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { LoadingRing } from '@components/icons'
import { Chrono } from '@lib/chrono'
import { supabase } from '@lib/supabase'

export default function TimelineStory() {
  const [processing, setProcessing] = useState<boolean>(false)
  const [timelineStoryItems, setTimelineStoryItems] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      let sessionData = JSON.parse(sessionStorage.getItem('timelineStoryItems'))
      let isSessionDataSet = sessionData && sessionData?.length > 0

      if (!isSessionDataSet) {
        const { data: timelineStory, error } = await supabase
          .from('timeline_story')
          .select()
          .order('date', { ascending: true })

        let timelineStoryItems = []

        timelineStory.map(function (value) {
          let dateInfo = value.date.split('-')
          let dateDisplay = `${dateInfo[1]} · ${dateInfo[2]} · ${dateInfo[0]}`

          timelineStoryItems.push({
            title: dateDisplay,
            cardTitle: value.title,
            cardDetailedText: value.description,
            media: {
              type: 'IMAGE',
              source: {
                url: value.photo_url,
              },
            },
          })
        })

        sessionStorage.setItem(
          'timelineStoryItems',
          JSON.stringify(timelineStoryItems),
        )
        setTimelineStoryItems(timelineStoryItems)
      } else {
        setTimelineStoryItems(sessionData)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ margin: '0 -2.25rem' }}>
      {timelineStoryItems?.length === 0 ? (
        <div className="flex justify-center w-full">
          <LoadingRing
            className={`w-20 h-20 text-slate-100 animate-spin dark:text-slate-600 fill-primary`}
          />
        </div>
      ) : (
        <Chrono
          items={timelineStoryItems}
          classNames={{
            cardMedia: 'max-w-sm max-h-1 lg:max-w-[300px] lg:max-h-full',
            cardTitle: 'text-black-override',
          }}
          mode="VERTICAL_ALTERNATING"
          borderLessCards={true}
          disableAutoScrollOnClick={true}
          disableClickOnCircle={true}
          disableNavOnKey={true}
          hideControls={true}
          lineWidth="2"
          mediaHeight="300"
          useReadMore={false}
          theme={{
            primary: '#800000',
            cardBgColor: '#f5f5f5',
            titleColor: '#000058',
          }}
        >
          <div className="chrono-icons">
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
            <FaRegHeart className="text-primary" />
          </div>
        </Chrono>
      )}
    </div>
  )
}
