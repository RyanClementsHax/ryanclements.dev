import { PresetBuilder } from '../presetBuilder'
import { rehypeAddCodeBlockTitle } from './rehypeAddCodeBlockTitle'
import { rehypeGroupCodeBlockLines } from './rehypeGroupCodeBlockLines'
import { rehypeHighlightCodeBlockLines } from './rehypeHighlightCodeBlockLines'
import { rehypeHighlightCodeBlocks } from './rehypeHighlightCodeBlocks'
import { rehypeHighlightInlineCode } from './rehypeHighlightInlineCode'

export const codeTransformer = new PresetBuilder()
  .use(rehypeHighlightCodeBlocks)
  .use(rehypeHighlightInlineCode)
  .use(rehypeGroupCodeBlockLines)
  .use(rehypeHighlightCodeBlockLines)
  .use(rehypeAddCodeBlockTitle)
  .build()
