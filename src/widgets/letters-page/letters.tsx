"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card"
import { Spinner } from "@/shared/ui/spinner"
import { Button } from "@/shared/ui/kit/button"
import { ArrowRight } from "lucide-react"

import { useEffect, useRef } from "react"
import { useGetLettersInfinite } from "@/shared/api/hooks/use-get-letters"
import { useIntersectionObserver } from "@/shared/api/hooks/use-intersection-observer"

export const Letters = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetLettersInfinite({
    limit: 6,
  })

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const intersectionObserver = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  })

  useEffect(() => {
    if (loadMoreRef.current) {
      intersectionObserver(loadMoreRef.current)
    }
  }, [intersectionObserver])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Произошла ошибка при загрузке писем
      </div>
    )
  }

  const allLetters = data?.pages.flat() ?? []

  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-white">
      <div className="mt-12 flex w-1/2 flex-col items-center">
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-center">
          Письма
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4">
        {allLetters.map((letter) => (
          <div key={letter.id} className="p-6">
            <Card className="w-max-[480px] h-[500px] bg-amber-50/90 text-gray-700 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">
                  {letter.destination}, {letter.recipient}
                </CardTitle>
                <CardDescription className="text-neutral-600 pt-1">
                  {letter.author} | {letter.date}
                </CardDescription>
              </CardHeader>

              <div className="flex-1 flex flex-col">
                <CardContent>
                  <p className="text-base font-serif italic line-clamp-9">
                    {letter.text}
                  </p>
                </CardContent>
              </div>

              <CardFooter className="flex justify-between">
                <Button className="rounded-2xl bg-gray-700" size="sm">
                  Открыть в отдельном окне <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Точка для триггера загрузки */}
      <div ref={loadMoreRef} className="h-20" />

      {/* Лоадер во время подгрузки новых данных */}
      {isFetchingNextPage && (
        <div className="py-8">
          <Spinner />
        </div>
      )}
    </div>
  )
}
