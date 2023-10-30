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
  }
  
  // Example usage:
  const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const myTree = new Tree(data);
  myTree.prettyPrint(myTree.root);
  