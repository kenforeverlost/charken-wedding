'use client'

import { useEffect, useState } from 'react'
import { Unna } from 'next/font/google'
import DOMPurify from 'dompurify'

import Content from '@components/main/content'
import Header from '@components/main/header'
import Footer from '@components/main/footer'

import { LoadingRing } from '@components/icons'

import { supabase } from '@lib/supabase'

const mainText = Unna({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export default function FaqSection() {
  const [questions, setQuestions] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      let sessionData = JSON.parse(sessionStorage.getItem('faqData'))
      let isSessionDataSet = sessionData && sessionData?.length > 0

      if (!isSessionDataSet || process.env.NODE_ENV === 'development') {
        const { data: faqData, error } = await supabase
          .from('faq')
          .select()
          .order('order', { ascending: true })

        let faqDataItems = []

        faqData.map(function (value) {
          faqDataItems.push(value)
        })

        sessionStorage.setItem('faqData', JSON.stringify(faqDataItems))
        setQuestions(faqDataItems)
      } else {
        setQuestions(sessionData)
      }
    }

    fetchData()
  }, [])

  let displayQuestions = questions?.length === 0

  return (
    <>
      {displayQuestions ? (
        <div className="flex justify-center w-full">
          <LoadingRing
            className={`w-20 h-20 text-slate-100 animate-spin dark:text-slate-600 fill-primary`}
          />
        </div>
      ) : (
        <div className={`flex flex-col gap-16 w-full animate-fade`}>
          {questions.map((questionItem, key) => {
            const cleanAnswer = DOMPurify.sanitize(questionItem.answer)

            return (
              <div key={key} className="flex flex-col gap-6">
                <div
                  className={`${mainText.className} text-2xl text-center flex flex-row justify-center`}
                >
                  <div className="border-b border-secondary pb-3 mx-5">
                    {questionItem.question}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div
                    className="text-center"
                    dangerouslySetInnerHTML={{
                      __html: cleanAnswer.replace(
                        /href/g,
                        "target='_blank' href",
                      ),
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
