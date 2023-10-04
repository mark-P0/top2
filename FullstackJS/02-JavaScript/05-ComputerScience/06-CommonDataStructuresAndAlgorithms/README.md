# Common Data Structures and Algorithms

## Data Structures

- Abstract data types (ADT)

## Linked List

- Objects forming a sequence by reference
- Objects are called _nodes_
- Nodes can hold a value, or several values
- Nodes can have a reference to the node _before_ them
- Nodes can have a reference to the node _after_ them
- Has a _starting_ node, serving as the first element of the list

## Stack

```
  etc.
│ Fifth  │ ← Entrance & Exit
│ Fourth │   (Push)     (Pop)
│ Third  │
│ Second │
│ First  │
└────────┘
```

- **_First in, last out_** (FILO) structure

## Queue

```
               (Enqueue)
               Entrance
               ↓
────────────────
1 2 3 4 5 6 7 8 etc.
────────────────
↑
Exit
(Dequeue)
```

- **_First in, first out_** (FIFO) structure

## Binary Search

> Divide-and-conquer algorithm

Say `value` is searched for in a sequence (e.g. array)

- Find the middle of the sequence
- If `value` is at the middle, stop
  - `value` has been found
  - `value` is in the sequence
- If `value` is "less" than the middle, apply the search to the left half
- If `value` is "greater" than the middle, apply the search to the right half
- If neither are successful, `value` is not in the sequence

## Trees

- Very similar terminology with linked lists
- Also uses nodes, with a _value_ and _left_ & _right_ references
- Starting node is called the _root_
- Has a "hierarchical" top-down appearance, but is "sequenced" from left to right
  - Leftmost element is the first element of the sequence
  - Rightmost element is the last element of the sequence

### Binary Search Tree

- Tree whose nodes are inserted in a sorted manner
- Binary search is especially intuitive in a sorted and balanced tree sequence
  - The root node would be the middle-most element
  - The root left would be the middle-most of the left half of the sequence
  - The root right would be the middle-most of the right half of the sequence
  - ...and so on.

## Tree traversals

- Process of _visiting_ each node in the tree at least once
  - _Visit_ means reading/accessing the value stored in the tree nodes

Different approaches for diving into a tree data structure

|                  |    Breadth    |              Depth               |
| ---------------: | :-----------: | :------------------------------: |
| Also known as... |  Level-order  |    Ordered<br>(Pre, In, Post)    |
|           Manner | Top to bottom |          Left to right           |
|   Data Structure |     Queue     | Stack<br>(Recursion; Call stack) |
|          Exhaust |   Children    |          Grandchildren           |

### Breadth-first

- Leveled
- Exhaust all at the shallow levels

```python
def bft(tree):
  queue = [tree.root]

  while queue != empty:
    current_node = queue.dequeue()
    print(current_node.value)

    if exists(current_node.left): queue.enqueue(current_node.left)
    if exists(current_node.right): queue.enqueue(current_node.right)
```

### Depth-first

- Go as deep as possible
- Variants
  - Pre-order
    - `data` → `left` → `right`
  - In-order
    - `left` → `data` → `right`
  - Post-order
    - `left` → `right` → `data`

<!--
```python
def dft(tree):
  stack = [tree.root]
  while stack != empty:
    current_node = stack.peek()

    print(current_node.pop().value)

    if exists(current_node.right): stack.push(current_node.right)
    if exists(current_node.left): stack.push(current_node.left)
```
-->

```python
def dft(current_node):
  # print(current_node.value) # Pre-order
  if exists(current_node.left): dft(current_node.left)
  # print(current_node.value) # In-order
  if exists(current_node.right): dft(current_node.right)
  # print(current_node.value) # Post-order

# Initialize with tree root
# Recursive calls use [call] stack
dft(tree.root)
```

- Location of `print(current_node.value)` determines variant

## Knowledge Check

- What is the difference between a stack and a queue?

  |           |      Stack      |         Queue          |
  | --------: | :-------------: | :--------------------: |
  |  Approach |      FIFO       |          FILO          |
  |  Entrance |       End       |          End           |
  |      Exit |       End       |         Start          |
  |   Methods | `push`<br>`pop` | `enqueue`<br>`dequeue` |
  | Traversal |   Depth-first   |     Breadth-first      |

- What are the enqueue and dequeue properties?

  - `enqueue` adds an element at the end of a Queue
  - `dequeue` removes an element from the start of a Queue

- What is a linked list? What is a node?

  - A linked list is a sequence of objects which is linked with the objects storing a reference to the objects next [and previous] to them in the sequence
  - A node refers to an object in a linked list (or tree)

- What type of algorithm would you use to perform a binary search?

  - Divide-and-conquer

- What abstract data type would you use to defer/store nodes in a breadth-first tree traversal?

  - Queue

- What abstract data type would you use to defer/store nodes in a depth-first tree traversal?

  - Stack
