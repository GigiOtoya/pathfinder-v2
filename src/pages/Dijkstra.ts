import { Graph, Vertex } from "../utils/graphUtils";

const dijkstra = (graph: Graph, start: Vertex, end: Vertex) => {
  const visited = new Set();
  const distances = new Map<Vertex, number>();
  const paths = new Map<Vertex, Vertex | null>();
  const heapQ = new MinHeap();

  for (const vertex of graph.vertices) {
    distances.set(vertex, Infinity);
  }

  distances.set(start, 0);
  paths.set(start, null);
  heapQ.heapPush({ val: 0, vertex: start });

  while (heapQ.minHeap.length) {
    const { val, vertex } = heapQ.heapPop();
    if (!visited.has(vertex)) {
      visited.add(vertex);

      const neighbors = graph.adjacencyList.get(vertex);
      for (const [neighbor, edge] of Array.from(neighbors ?? [])) {
        const nextWeight = val + edge.w!;
        if (!visited.has(neighbor) && nextWeight < distances.get(neighbor)!) {
          distances.set(neighbor, nextWeight);
          paths.set(neighbor, vertex);
          heapQ.heapPush({ val: nextWeight, vertex: neighbor });
        }
      }
    }
  }
};

class MinHeap {
  minHeap: heapElement[];

  constructor() {
    this.minHeap = [];
  }

  heapPush(item: heapElement) {
    this.minHeap.push(item);
    this.bubbleUp(this.minHeap.length - 1);
  }

  heapPop() {
    const min = this.minHeap[0];
    const last = this.minHeap[this.minHeap.length - 1];
    this.minHeap[0] = last;
    this.minHeap.length -= 1;
    this.bubbleDown(0);
    return min;
  }

  bubbleUp(index: number) {
    if (!(index > 0)) {
      return;
    }

    const parentIndex = Math.floor((index - 1) / 2);
    const child = this.minHeap[index];
    const parent = this.minHeap[parentIndex];
    if (child.val < parent.val) {
      this.minHeap[parentIndex] = child;
      this.minHeap[index] = parent;
      this.bubbleUp(parentIndex);
    }
  }

  bubbleDown(index: number) {
    let smallest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    const minHeap = this.minHeap;

    if (left < minHeap.length && minHeap[smallest].val > minHeap[left].val) {
      smallest = left;
    }

    if (right < minHeap.length && minHeap[smallest].val > minHeap[right].val) {
      smallest = right;
    }

    if (smallest !== index) {
      const temp = minHeap[index];
      minHeap[index] = minHeap[smallest];
      minHeap[smallest] = temp;

      this.bubbleDown(smallest);
    }
  }
}

type heapElement = {
  val: number;
  vertex: Vertex;
};
