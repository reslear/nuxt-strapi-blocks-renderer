import type { ConcreteComponent } from 'vue';

import type {
    BlockNode,
    CodeBlockNode,
    DefaultInlineNode,
    HeadingBlockNode, ImageBlockNode,
    LinkInlineNode,
    ListBlockNode,
    ListItemInlineNode,
    ParagraphBlockNode,
    QuoteBlockNode,
    TextInlineNode
} from '#strapi-blocks-renderer/types';

export const textInlineNode = (node: TextInlineNode): VNode | string => {
    if (node.bold) return h(resolveComponent('BoldInlineNode'), node.text);
    if (node.italic) return h(resolveComponent('ItalicInlineNode'), node.text);
    if (node.underline) return h(resolveComponent('UnderlineInlineNode'), node.text);
    if (node.strikethrough) return h(resolveComponent('StrikethroughInlineNode'), node.text);
    if (node.code) return h(resolveComponent('CodeInlineNode'), node.text);

    return node.text;
};

export const linkInlineNode = (node: LinkInlineNode): VNode => {
    const linkComponent: string | ConcreteComponent = resolveComponent('LinkInlineNode');

    return h(linkComponent, { url: node.url }, () => node.children.map((childNode: TextInlineNode) => {
        return textInlineNode(childNode);
    }));
};

export const defaultInlineNode = (node: DefaultInlineNode): VNode | string | undefined => {
    if (node.type === 'link') {
        return linkInlineNode(node);
    }
    else if (node.type === 'text') {
        return textInlineNode(node);
    }
};

export const listItemInlineNode = (node: ListItemInlineNode): VNode => {
    const listItemComponent: string | ConcreteComponent = resolveComponent('ListItemInlineNode');

    return h(listItemComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode))
    );
};

export const headingBlockNode = (node: BlockNode): VNode => {
    const level: number = (node as HeadingBlockNode).level;
    const headingComponent: string | ConcreteComponent = resolveComponent('Heading' + level + 'Node');

    return h(headingComponent, () => (node as HeadingBlockNode).children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode))
    );
};

export const paragraphBlockNode = (node: BlockNode): VNode => {
    const paragraphComponent: string | ConcreteComponent = resolveComponent('ParagraphNode');

    return h(paragraphComponent, () => (node as ParagraphBlockNode).children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode))
    );
};

export const codeBlockNode = (node: BlockNode): VNode => {
    const codeComponent: string | ConcreteComponent = resolveComponent('CodeNode');

    return h(codeComponent, () => (node as CodeBlockNode).children.map(
        (childNode: TextInlineNode): VNode | string => textInlineNode(childNode))
    );
};

export const quoteBlockNode = (node: BlockNode): VNode => {
    const quoteComponent: string | ConcreteComponent = resolveComponent('QuoteNode');

    return h(quoteComponent, () => (node as QuoteBlockNode).children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode))
    );
};

export const listBlockNode = (node: BlockNode): VNode => {
    const listType: string = (node as ListBlockNode).format === 'ordered' ? 'OrderedListNode' : 'UnorderedListNode';
    const listComponent: string | ConcreteComponent = resolveComponent(listType);

    return h(listComponent, () => (node as ListBlockNode).children.map(
        (childNode: ListBlockNode | ListItemInlineNode): VNode | undefined => {
            if (childNode.type === 'list') {
                return listBlockNode(childNode);
            }
            else if (childNode.type === 'list-item') {
                return listItemInlineNode(childNode);
            }
        }
    ));
};

export const imageBlockNode = (node: BlockNode): VNode => {
    const imageComponent: string | ConcreteComponent = resolveComponent('ImageNode');

    return h(imageComponent, {
        image: (node as ImageBlockNode),
    });
};

export const blockNodeMap: { [key: string]: (node: BlockNode) => VNode } = {
    'heading': headingBlockNode,
    'paragraph': paragraphBlockNode,
    'code': codeBlockNode,
    'list': listBlockNode,
    'quote': quoteBlockNode,
    'image': imageBlockNode,
};

export const renderBlocks = (blockNodes: BlockNode[]): VNode[] => {
    return blockNodes.map((blockNode: BlockNode) => {
        return blockNodeMap[blockNode.type](blockNode);
    });
};