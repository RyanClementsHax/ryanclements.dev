import { Track404 } from 'components/Track404'

// Defining it in a catch all route allows for it to be wrapped by the root layout
export default function NotFound(): JSX.Element {
  return <Track404 />
}
