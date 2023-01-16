import { Home, HomeProps } from 'components/pages/home'
import {
  getSerializableRenderablePostSummaries,
  RenderablePostSummary
} from 'lib/pages/posts'
import { deserialize, Serializable } from 'lib/utils'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'

export const getStaticProps: GetStaticProps<
  Serializable<HomeProps>
> = async () => {
  return {
    props: {
      recentPostSummaries: (
        await getSerializableRenderablePostSummaries()
      ).slice(0, 10)
    }
  }
}

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  recentPostSummaries
}) => {
  const deserializedPostSummaries =
    deserialize<RenderablePostSummary[]>(recentPostSummaries)
  return <Home recentPostSummaries={deserializedPostSummaries} />
}

export default Index
