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
  prettyPrintInOrder(node = this.root) {
    if (node) {
      this.prettyPrintInOrder(node.left);
      console.log(node.data);
      this.prettyPrintInOrder(node.right);
    }
  }

  prettyPrintPreOrder(node = this.root) {
    if (node) {
      console.log(node.data);
      this.prettyPrintPreOrder(node.left);
      this.prettyPrintPreOrder(node.right);
    }
  }

  prettyPrintPostOrder(node = this.root) {
    if (node) {
      this.prettyPrintPostOrder(node.left);
      this.prettyPrintPostOrder(node.right);
      console.log(node.data);
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

  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    return this.caluculateDepth(this.root, node);
  }

  caluculateDepth(currentNode, targetNode, depth = 0) {
    if (currentNode === null) {
      return -1
    }
    if (currentNode === targetNode) {
      return depth;
    }

    const leftDepth = this.caluculateDepth(currentNode.left, targetNode, depth + 1);
    if (leftDepth >= 0) {
      return leftDepth;
    }

    const rightDepth = this.caluculateDepth(currentNode.right, targetNode, depth + 1);
    if (rightDepth >= 0) {
      return rightDepth;
    }
  }

  isBalanced(root = this.root) {
    return this.checkBalanced(root) !== -1;
  }

  checkBalanced(node) {
    if (node === null) {
      return 0; // An empty tree is considered balanced
    }

    const leftHeight = this.checkBalanced(node.left);
    if (leftHeight === -1) {
      return -1; // Left subtree is unbalanced
    }

    const rightHeight = this.checkBalanced(node.right);
    if (rightHeight === -1) {
      return -1; // Right subtree is unbalanced
    }

    const heightDiff = Math.abs(leftHeight - rightHeight);
    if (heightDiff > 1) {
      return -1; // The current node is unbalanced
    }

    return Math.max(leftHeight, rightHeight) + 1; // Return the height of the current node
  }


  rebalance() {
    // Convert the tree to a sorted array using in-order traversal
    const nodesArray = [];
    this.inOrderTraversal(this.root, nodesArray);

    // Build a new balanced tree from the sorted array
    this.root = this.buildTree(nodesArray);
}


  inOrderTraversal(node, resultArray) {
    if (node === null) {
      return;
    }

    this.inOrderTraversal(node.left, resultArray);
    resultArray.push(node.data);
    this.inOrderTraversal(node.right, resultArray);
  }

}

// Function to generate an array of random numbers < 100
function generateRandomNumbers(count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
}


// Function to generate an array of random numbers < 100
function generateRandomNumbers(count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
}

// Driver script
function main() {
  // Step 1: Create a binary search tree from an array of random numbers < 100
  const randomNumbers = generateRandomNumbers(10); // Change 10 to the desired count
  const bst = new Tree(randomNumbers);

  // Step 2: Confirm that the tree is balanced
  console.log("Is the tree balanced?", bst.isBalanced());

  // Step 3: Print out all elements in level, pre, post, and in order
  console.log("Level Order:");
  console.log(bst.levelOrder());

  console.log("Pre Order:");
  console.log(bst.prettyPrintPreOrder(bst.root));

  console.log("Post Order:");
  console.log(bst.prettyPrintPostOrder(bst.root));

  console.log("In Order:");
  console.log(bst.prettyPrintInOrder(bst.root));

  // Step 4: Unbalance the tree by adding several numbers > 100
  bst.insert(101);
  bst.insert(102);
  bst.insert(103);

  // Step 5: Confirm that the tree is unbalanced
  console.log("Is the tree unbalanced?", !bst.isBalanced());

  // Step 6: Balance the tree by calling rebalance
  bst.rebalance();

  // Step 7: Confirm that the tree is balanced after rebalancing
  console.log("Is the tree balanced after rebalancing?", bst.isBalanced());

  // Step 8: Print out all elements in level, pre, post, and in order after rebalancing
  console.log("Level Order (After Rebalance):");
  console.log(bst.levelOrder());

  console.log("Pre Order (After Rebalance):");
  console.log(bst.prettyPrintPreOrder(bst.root));

  console.log("Post Order (After Rebalance):");
  console.log(bst.prettyPrintPostOrder(bst.root));

  console.log("In Order (After Rebalance):");
  console.log(bst.prettyPrintInOrder(bst.root));
}

// Run the driver script
main();

/*
// Example usages:
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
const targetNode = myTree.root.left.left.left; // Choose a target node in the tree
const depthOfNode = myTree.depth(targetNode);
console.log("Depth of the target node:", depthOfNode);


// checking for isBalanced():
const balancedData = [1, 2, 3, 4, 5, 6, 7];
const unbalancedData = [4, 2, 6, 1, 3, 5, 7];


const balancedTree = new Tree(balancedData);
const unbalancedTree = new Tree(unbalancedData);

console.log("Is the balanced tree balanced?", balancedTree.isBalanced()); // true
console.log("Is the unbalanced tree balanced?", unbalancedTree.isBalanced()); // false

*/
//checking for rebalance()

const unbalancedData = [2, 1, 3, 4, null, null, 5, 6, null, 7,1,10,778];
const unbalancedTree = new Tree(unbalancedData);

console.log("Unbalanced Tree:");
unbalancedTree.prettyPrint(unbalancedTree.root);

unbalancedTree.rebalance();

console.log("\nRebalanced Tree:");
unbalancedTree.prettyPrint(unbalancedTree.root);