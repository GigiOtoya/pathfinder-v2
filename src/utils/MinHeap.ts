import { Vertex } from "./graphUtils";

export class MinHeap {
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

  minHeapify(arr: heapElement[], index: number) {
    let smallest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < arr.length && arr[left].val < arr[smallest].val) {
      smallest = left;
    }

    if (right < arr.length && arr[right].val < arr[smallest].val) {
      smallest = right;
    }
    if (smallest !== index) {
      const temp = arr[index];
      arr[index] = arr[smallest];
      arr[smallest] = temp;
    }
  }

  buildMinHeap(arr: heapElement[]) {
    arr.forEach((heapElement) => this.minHeap.push(heapElement)); // references??
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
      this.minHeapify(this.minHeap, i);
    }
  }
}

export type heapElement = {
  val: number;
  item: any;
};
