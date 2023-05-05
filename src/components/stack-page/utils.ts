interface IStack<T> {
        getStack: () => T[];
        push: (item: T) => void;
        pop: () => void;
        clear: () => void;
        peak: () => void;
        getSize: () => number;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item)
    };
  
    pop = (): void => {
      this.container.pop()
    };
  
    peak = (): T | null => {
      if(this.container.length!==0){
        const n = this.getSize()-1;
        return this.container[n];
      } else {return null;}
    };
  
    getSize = () => this.container.length;

    getStack = () => this.container;

    clear = (): void => {
        this.container.length = 0;
      };
  }