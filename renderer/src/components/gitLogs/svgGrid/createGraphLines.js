import { BLOCK_HEIGHT, BLOCK_WIDTH } from '../useGitLogPositionGrid'

const HALF_HEIGHT = (BLOCK_HEIGHT * 0.75) / 2
const HALF_WIDTH = BLOCK_WIDTH / 2

const getColor = () => '#d1d5da'

const getPoint = (lines, line, index, minIndex, pos) => {
    const center = [lines.get(line), (index - minIndex) * BLOCK_HEIGHT + BLOCK_HEIGHT / 2]

    switch (pos) {
        case 'top':
            return [center[0], center[1] - HALF_HEIGHT]
        case 'right':
            return [center[0] + HALF_WIDTH, center[1]]
        case 'bottom':
            return [center[0], center[1] + HALF_HEIGHT]
        case 'left':
            return [center[0] - HALF_WIDTH, center[1]]
    }

    return center
}

const getPath = ([x1, y1], [x2, y2], pos) => {
    if (pos === 'bottom')
        return [x1, y2 - HALF_HEIGHT, x1, y2, x1 > x2 ? x1 - HALF_HEIGHT : x1 + HALF_HEIGHT, y2]

    return [x1 > x2 ? x2 + HALF_HEIGHT : x2 - HALF_HEIGHT, y1, x2, y1, x2, y1 + HALF_HEIGHT]
}

export default (finalArr, lines, minIndex, maxIndex, height) => item => {
    if (!lines.has(item.line)) return

    if (item.children && item.children.length) {
        const isCh = item.children.find(ch => ch.index < minIndex)
        if (isCh) {
            finalArr.push({
                key: `CH_${item.hash}`,
                from: getPoint(lines, item.line, item.index, minIndex, 'top'),
                to: [lines.get(item.line), 0],
                color: getColor(item.line),
            })
        }
    }

    if (!item.parents) return

    item.parents.forEach((parent, index) => {
        if (!lines.has(parent.line)) return

        if (parent.index > maxIndex) {
            finalArr.push({
                key: `PR_${item.index}_${parent.hash}`,
                from: getPoint(lines, item.line, item.index, minIndex, 'bottom'),
                to: [lines.get(item.line), height],
                color: getColor(item.line),
            })
        } else if (parent.line === item.line) {
            finalArr.push({
                key: `${item.index}_${parent.index}`,
                from: getPoint(lines, item.line, item.index, minIndex, 'bottom'),
                to: getPoint(lines, item.line, parent.index, minIndex, 'top'),
                color: getColor(item.line),
            })
        } else if (!index) {
            const bLine = {
                key: `BRANCH_${parent.hash}_${item.hash}`,
                from: getPoint(lines, item.line, item.index, minIndex, 'bottom'),
                to: getPoint(
                    lines,
                    parent.line,
                    parent.index,
                    minIndex,
                    parent.line > item.line ? 'left' : 'right',
                ),
                color: getColor(item.line),
            }

            bLine.path = [getPath(bLine.from, bLine.to, 'bottom')]

            finalArr.push(bLine)
        } else {
            const bLine = {
                key: `MERGE_${parent.hash}_${item.hash}`,
                from: getPoint(
                    lines,
                    item.line,
                    item.index,
                    minIndex,
                    item.line > parent.line ? 'left' : 'right',
                ),
                to: getPoint(lines, parent.line, parent.index, minIndex, 'top'),
                color: getColor(parent.line),
            }

            bLine.path = [getPath(bLine.from, bLine.to, 'top')]

            finalArr.push(bLine)
        }
    })
}
