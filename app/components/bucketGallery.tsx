'use client'

import { useEffect, useState } from 'react'
import { LoadingRing } from '@components/icons'

import { supabase } from '@lib/supabase'

export default function BucketGallery({ ...props }: any) {
  const [processing, setProcessing] = useState<boolean>(true)
  const [photoList, setPhotoList] = useState<any>([])

  const bucket = props.bucket
  const folder = props.folder
  const baseUrl = `https://exiknbsnihiuomwzvubu.supabase.co/storage/v1/object/public/${bucket}/${folder}/`

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.storage.from(bucket).list(folder, {
        limit: 100,
        offset: 0,
        sortBy: {
          column: 'name',
          order: 'asc',
        },
      })

      if (data && !error) {
        data.filter((photo) => photo.name !== '.emptyFolderPlaceholder')

        if (data) {
          setPhotoList(data)
        }
      }

      setProcessing(false)
    }

    fetchData()
  }, [])

  return (
    <main className={`flex flex-col gap-16 w-full animate-fade`}>
      {processing ? (
        <div className="flex justify-center w-full">
          <LoadingRing
            className={`w-20 h-20 text-slate-100 animate-spin dark:text-slate-600 fill-primary`}
          />
        </div>
      ) : photoList?.length === 0 ? (
        <div className="flex justify-center w-full">
          Our highlights are unavailable at this time :( Check back later!
        </div>
      ) : (
        <div className={`flex flex-wrap w-full animate-fade`}>
          {photoList.map((photo, key) => {
            return (
              <div key={key} className="w-full sm:w-1/2 md:w-1/4">
                <div className="p-1 flex justify-center items-center">
                  <a href={`${baseUrl}${photo.name}`} target="_blank">
                    <img
                      src={`${baseUrl}${photo.name}`}
                      className="aspect-square w-full object-cover cursor-pointer"
                    />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
