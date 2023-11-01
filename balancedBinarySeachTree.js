/*  JS Programm to print BST in a given range
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(data) {
    this.root = this.buildTree(data);
  }

  buildTree(data) {
    // Remove duplicates and sort the data
    const uniqueData = [...new Set(data)].sort((a, b) => a - b);

    // Define a recursive function to build the tree
    function buildTreeRecursive(uniqueData) {
      if (uniqueData.length === 0) {
        return null;
      }

      // Find the middle index of the unique data
      const middle = Math.floor(uniqueData.length / 2);

      // Create a node with the middle value
      const root = new Node(uniqueData[middle]);

      // Recursively build the left and right subtrees
      root.left = buildTreeRecursive(uniqueData.slice(0, middle));
      root.right = buildTreeRecursive(uniqueData.slice(middle + 1));

      return root;
    }

    // Call the recursive function to build the tree
    return buildTreeRecursive(uniqueData);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node) {
      console.log(prefix + (isLeft ? '├── ' : '└── ') + node.data);
      this.prettyPrint(node.left, prefix + (isLeft ? '│   ' : '    '), true);
      this.prettyPrint(node.right, prefix + (isLeft ? '│   ' : '    '), false);
    }
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node == null) {
      return node;
    }

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.data = this.minValueNode(node.right);
      node.right = this.deleteNode(node.right, node.data);
    }
    return node;
  }

  minValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  find(value) {
    return this.findNode(this.root, value);
  }

  findNode(node, value) {
    if (node === null || node.data === value) {
      return node;
    }
    if (value < node.data) {
      return this.findNode(node.left, value);
    } else {
      return this.findNode(node.right, value);
    }
  }

  levelOrder(callback) {
    if (!this.root) {
      return [];
    }

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      if (callback) {
        callback(current.data);
      } else {
        result.push(current.data);
      }

      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }

    return result;
  }

  height(node){
    if(node===null){
      return -1;
    }

    const leftHeight=this.height(node.left);
    const rightHeight=this.height(node.right);

    return Math.max(leftHeight,rightHeight) +1;
  }

  depth(node){
    return this.caluculateDepth(this.root,node);
  }

  caluculateDepth(currentNode,targetNode,depth=0){
    if(currentNode===null){
      return -1
    }
    if (currentNode===targetNode){
      return depth;
    }

    const leftDepth=this.caluculateDepth(currentNode.left,targetNode,depth +1);
    if (leftDepth>=0){
      return leftDepth;
    }
    
    const rightDepth=this.caluculateDepth(currentNode.right,targetNode,depth +1);
    if (rightDepth>=0){
      return rightDepth;
    }
  }
}

// Example usage:
const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(data);

myTree.insert(2); // Insert a value
myTree.prettyPrint(myTree.root);

myTree.delete(7); // Delete a value
myTree.prettyPrint(myTree.root);

const nodeToFind = myTree.find(1); // Find a node with the value 5
console.log(nodeToFind);

// Callback function to print each node's data
function printNodeData(data) {
  console.log(data);
}

// Traverse the tree in level order and print node data
myTree.levelOrder(printNodeData);

// Or, traverse the tree in level order and get an array of node values
const levelOrderArray = myTree.levelOrder();
console.log(levelOrderArray);

//calculting height of root node
const rootNode = myTree.root;
const heightOfRoot = myTree.height(rootNode);
console.log("Height of the root node:", heightOfRoot);

//return depth of node
const targetNode = myTree.root.left.left; // Choose a target node in the tree
const depthOfNode = myTree.depth(targetNode);
console.log("Depth of the target node:", depthOfNode);