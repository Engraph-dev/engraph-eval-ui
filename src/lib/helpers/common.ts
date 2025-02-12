import { ENode, TNode } from "@/lib/types/requests"

export function areEqual(node1: TNode, node2: TNode) {
	return (
		node1.nodeType === node2.nodeType && getLabel(node1) === getLabel(node2)
	)
}

export function getLabel(node: TNode | undefined) {
	if (!node) return ""
	if (node.nodeType === ENode.MODULE) {
		return node.nodeData.modulePath
	} else if (node.nodeType === ENode.SYMBOL) {
		return node.nodeData.symbolPath + ":" + node.nodeData.symbolIdentifier
	}
	return ""
}

export function randomSort<T>(elem: T[]): T[] {
	return elem.sort(() => Math.random() - 0.5)
}
