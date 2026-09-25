"use client"

import React from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, PanInfo } from 'framer-motion'

type Props = {
  images: string[],
  alt: string,
  basePath?: string
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
}

const slideTransition = {
  x: { type: 'spring', stiffness: 320, damping: 34 },
  opacity: { duration: 0.2 },
}

const SWIPE_OFFSET = 60
const SWIPE_VELOCITY = 400

function swipeDirection({ offset, velocity }: PanInfo) {
  if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) return 1
  if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) return -1
  return 0
}

const ChevronIcon = ({ flip = false }: { flip?: boolean }) => (
  <svg viewBox="0 0 24 24" className={`w-5 h-5 ${flip ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" className='w-4 h-4' fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className='w-5 h-5' fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export default function Gallery({ images, alt, basePath = 'img/posts/' }: Props) {
  const [[index, direction], setSlide] = React.useState<[number, number]>([0, 0])
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const dragged = React.useRef(false)

  const count = images.length
  const src = (i: number) => basePath + images[i]

  const paginate = React.useCallback((dir: number) => {
    setSlide(([i]) => [(i + dir + count) % count, dir])
  }, [count])

  const goTo = (i: number) => setSlide(([current]) => [i, i > current ? 1 : -1])

  React.useEffect(() => setMounted(true), [])

  // Preload neighbours so swiping never shows an empty frame
  React.useEffect(() => {
    if (count < 2) return
    ;[index + 1, index - 1].forEach(i => {
      const img = new Image()
      img.src = src((i + count) % count)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const dir = swipeDirection(info)
    if (dir) paginate(dir)
    // Let the click that follows a drag through only after it has been swallowed
    setTimeout(() => { dragged.current = false }, 0)
  }

  const openLightbox = () => {
    if (dragged.current) return
    setOpen(true)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); paginate(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); paginate(-1) }
    if (e.key === 'Enter') { e.preventDefault(); setOpen(true) }
  }

  if (count === 0) return null
  const multiple = count > 1

  return (
    <div className='w-full flex flex-col items-center gap-3'>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={alt}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className='group relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_4px_14px_rgba(0,0,0,0.12)] ring-1 ring-black/5 outline-none focus-visible:ring-2 focus-visible:ring-neutral-500'
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            drag={multiple ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragStart={() => { dragged.current = true }}
            onDragEnd={handleDragEnd}
            onClick={openLightbox}
            className='absolute inset-0 cursor-zoom-in active:cursor-grabbing touch-pan-y'
          >
            {/* Blurred copy fills the frame so every aspect ratio looks intentional */}
            <img src={src(index)} alt="" aria-hidden draggable={false} className='absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60 select-none' />
            <img src={src(index)} alt={`${alt} ${index + 1}/${count}`} draggable={false} className='relative w-full h-full object-contain select-none' />
          </motion.div>
        </AnimatePresence>

        {multiple && (
          <>
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              className='absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/80 text-neutral-800 shadow-md backdrop-blur transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 focus-visible:opacity-100 hover:bg-white hover:scale-105'
            >
              <ChevronIcon />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next image"
              className='absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/80 text-neutral-800 shadow-md backdrop-blur transition-all duration-200 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 focus-visible:opacity-100 hover:bg-white hover:scale-105'
            >
              <ChevronIcon flip />
            </button>
          </>
        )}

        <div className='absolute top-3 right-3 z-10 flex items-center gap-2 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 group-focus-within:opacity-100'>
          {multiple && (
            <span className='px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-[Lexend] tabular-nums backdrop-blur'>
              {index + 1} / {count}
            </span>
          )}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open fullscreen"
            className='flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70'
          >
            <ExpandIcon />
          </button>
        </div>
      </div>

      {multiple && (
        <div className='flex flex-wrap justify-center items-center gap-1.5 max-w-full'>
          {images.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Show image ${i + 1}`} className='py-2'>
              <span className={`block h-[4px] rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-[#4d4d4d]' : 'w-2 bg-[#b5b5b5] hover:bg-[#8a8a8a]'}`} />
            </button>
          ))}
        </div>
      )}

      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <Lightbox
              images={images}
              alt={alt}
              src={src}
              index={index}
              direction={direction}
              paginate={paginate}
              goTo={goTo}
              onClose={() => setOpen(false)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}

type LightboxProps = {
  images: string[],
  alt: string,
  src: (i: number) => string,
  index: number,
  direction: number,
  paginate: (dir: number) => void,
  goTo: (i: number) => void,
  onClose: () => void
}

function Lightbox({ images, alt, src, index, direction, paginate, goTo, onClose }: LightboxProps) {
  const count = images.length
  const multiple = count > 1
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const thumbsRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [onClose, paginate])

  React.useEffect(() => {
    const active = thumbsRef.current?.children[index] as HTMLElement | undefined
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [index])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className='fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a]/95 backdrop-blur-md text-white font-[Lexend]'
    >
      <div className='flex items-center justify-between px-4 sm:px-6 py-4 shrink-0'>
        <span className='text-sm text-white/70 tabular-nums'>
          <span className='text-white font-[Lexend-medium]'>{alt}</span>
          {multiple && <span className='ml-3'>{index + 1} / {count}</span>}
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className='flex items-center justify-center w-10 h-10 rounded-full bg-white/15 ring-1 ring-white/25 shadow-lg transition hover:bg-white/25 outline-none focus-visible:ring-2 focus-visible:ring-white/60'
        >
          <CloseIcon />
        </button>
      </div>

      <div className='relative flex-1 min-h-0 overflow-hidden' onClick={onClose}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            drag={multiple ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, info) => {
              const dir = swipeDirection(info)
              if (dir) paginate(dir)
            }}
            className='absolute inset-0 flex items-center justify-center px-4 sm:px-20 py-2 touch-pan-y'
          >
            <img
              src={src(index)}
              alt={`${alt} ${index + 1}/${count}`}
              draggable={false}
              onClick={e => e.stopPropagation()}
              className='max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none'
            />
          </motion.div>
        </AnimatePresence>

        {multiple && (
          <>
            <button
              onClick={e => { e.stopPropagation(); paginate(-1) }}
              aria-label="Previous image"
              className='absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-black/40 ring-1 ring-white/25 shadow-lg backdrop-blur transition hover:bg-white/25 hover:scale-105'
            >
              <ChevronIcon />
            </button>
            <button
              onClick={e => { e.stopPropagation(); paginate(1) }}
              aria-label="Next image"
              className='absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-black/40 ring-1 ring-white/25 shadow-lg backdrop-blur transition hover:bg-white/25 hover:scale-105'
            >
              <ChevronIcon flip />
            </button>
          </>
        )}
      </div>

      {multiple && (
        <div ref={thumbsRef} className='flex gap-2 overflow-x-auto px-4 py-4 shrink-0 mx-auto max-w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`relative shrink-0 w-20 h-12 sm:w-24 sm:h-14 overflow-hidden rounded-lg transition-all duration-300 ${i === index ? 'opacity-100 ring-2 ring-white' : 'opacity-40 hover:opacity-80'}`}
            >
              <img src={src(i)} alt="" loading="lazy" draggable={false} className='w-full h-full object-cover' />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
