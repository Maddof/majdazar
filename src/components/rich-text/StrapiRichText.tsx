import type { ReactNode } from 'react'
import { RICH_TEXT_COPY } from '~/content/copy'
import { cn } from '~/lib/utils'
import type { StrapiBlockNode, StrapiInlineNode } from '~/utils/strapi/projects'

function renderInlineNode(node: StrapiInlineNode, key: string): ReactNode {
  if (node.type === 'link') {
    return (
      <a
        key={key}
        href={node.url}
        target={node.target || '_blank'}
        rel="noreferrer"
        className="underline underline-offset-4"
      >
        {node.children.map((child, index) =>
          renderInlineNode(child, `${key}-${index}`),
        )}
      </a>
    )
  }

  let content: ReactNode = node.text

  if (node.code) {
    content = <code>{content}</code>
  }
  if (node.bold) {
    content = <strong>{content}</strong>
  }
  if (node.italic) {
    content = <em>{content}</em>
  }
  if (node.underline) {
    content = <span className="underline">{content}</span>
  }
  if (node.strikethrough) {
    content = <span className="line-through">{content}</span>
  }

  return <span key={key}>{content}</span>
}

function renderBlock(block: StrapiBlockNode, index: number): ReactNode {
  const content = block.children.map((child, childIndex) =>
    renderInlineNode(child, `${index}-${childIndex}`),
  )

  if (block.type === 'heading') {
    const HeadingTag =
      block.level === 1
        ? 'h1'
        : block.level === 2
          ? 'h2'
          : block.level === 4
            ? 'h4'
            : block.level === 5
              ? 'h5'
              : block.level === 6
                ? 'h6'
                : 'h3'

    return <HeadingTag key={index}>{content}</HeadingTag>
  }

  return <p key={index}>{content}</p>
}

type StrapiRichTextProps = {
  blocks: StrapiBlockNode[]
  className?: string
  emptyText?: string
}

function StrapiRichText({
  blocks,
  className,
  emptyText = RICH_TEXT_COPY.emptyContentLabel,
}: StrapiRichTextProps) {
  if (blocks.length === 0) {
    return <p>{emptyText}</p>
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {blocks.map(renderBlock)}
    </div>
  )
}

export { StrapiRichText }
