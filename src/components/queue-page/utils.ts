interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    getSize: () => number;
    getQueue: () => (T | null)[];
    getLength: () => number;
  }
  
  export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head: number|null = null;
    private tail: number|null = null;
    private readonly size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }

    getSize = () => {
        return this.size
    }

    getLength = () => {
        return this.length
    }

    getQueue = () => this.container;
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      } else {
      this.container[this.tail!%this.size]=item;
        this.tail!++;
        this.length++;
        this.head = this.head?this.head:0;
      }
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      } else {
       delete this.container[this.head!%this.size]
        this.head!++;
        this.length--;
      }
  
     
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
        return null;
      } else {
        return this.container[this.head!%this.size]
      }
      
    };
  
    isEmpty = () => this.length === 0;

    getHead = (): number | null => {
        return this.head;
    };

    getTail = (): number | null => {
        return this.tail;
    };

    clear = () => {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
  }