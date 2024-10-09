class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    let newNode = new Node(val);
    
    // If the tree is empty, set root to the new node
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (val === current.val) return undefined; // Avoid duplicates

      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, current = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, current.left);
      }
    } else if (val > current.val) {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, current.right);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;

    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, current = this.root) {
    if (current === null) return undefined;

    if (val === current.val) return current;

    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    let visited = [];
    function traverse(node) {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    let visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    let visited = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    }
    if (this.root) traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    let visited = [];
    let queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length) {
      let current = queue.shift();
      visited.push(current.val);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return visited;
  }

  /** remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    const findMin = (node) => {
      while (node.left !== null) {
        node = node.left;
      }
      return node;
    };

    function removeNode(node, val) {
      if (node === null) return null;

      if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else if (val > node.val) {
        node.right = removeNode(node.right, val);
        return node;
      } else {
        // No children
        if (node.left === null && node.right === null) {
          return null;
        }

        // One child
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        // Two children
        let tempNode = findMin(node.right);
        node.val = tempNode.val;
        node.right = removeNode(node.right, tempNode.val);
        return node;
      }
    }

    this.root = removeNode(this.root, val);
    return this.root;
  }

  /** isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    function checkHeight(node) {
      if (node === null) return 0;

      let leftHeight = checkHeight(node.left);
      let rightHeight = checkHeight(node.right);

      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1; // Not balanced
      }

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkHeight(this.root) !== -1;
  }

  /** findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (this.root === null || (this.root.left === null && this.root.right === null)) {
      return undefined;
    }

    let current = this.root;

    while (current) {
      if (current.right === null && current.left !== null) {
        return this.findMax(current.left);
      }
      if (current.right && current.right.left === null && current.right.right === null) {
        return current.val;
      }

      current = current.right;
    }
  }

  findMax(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node.val;
  }
}

module.exports = BinarySearchTree;
