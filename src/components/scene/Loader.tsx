import { Html, useProgress } from '@react-three/drei'

export function Loader() {
  const { progress } = useProgress()
  return <Html center><p className='font-mondwest text-4xl h-full flex items-center justify-center text-center'>{progress} % loaded </p></Html>
}
