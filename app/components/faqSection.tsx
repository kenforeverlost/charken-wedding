'use client'

import { useEffect, useState } from 'react'
import { Unna } from 'next/font/google'
import DOMPurify from 'dompurify'

import { LoadingRing } from '@components/icons'

import { supabase } from '@lib/supabase'

const mainText = Unna({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export default function FaqSection() {
  const [processing, setProcessing] = useState<boolean>(false)
  const [questions, setQuestions] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: faqData, error } = await supabase
        .from('wedding_faq')
        .select()
        .order('order', { ascending: true })

      if (faqData && !error) {
        setQuestions(faqData)
      }
      setProcessing(false)
    }

    fetchData()
  }, [])

  return (
    <>
      {processing ? (
        <div className="flex justify-center w-full">
          <LoadingRing
            className={`w-20 h-20 text-slate-100 animate-spin dark:text-slate-600 fill-primary`}
          />
        </div>
      ) : !questions || questions.length === 0 ? (
        <div className="flex justify-center w-full">
          Our frequently asked questions are unavailable at this time :( Check
          back later!
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
