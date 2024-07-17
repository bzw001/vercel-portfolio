---
title: 您需要的前端面试算法(上)
id: math-03
---

## 阅前说明
> 文章将会分成上中下三部分，包含一些常见面试算法题，大部分算法题来自于《剑指offer》,在此对此书的作者及牛客编程网表示感谢,还有一部分来自于本人的收集。题目解法有多种，望大虾多多评论探讨或指正


## 1、数组遍历
>题述： 一个数组中，每一行都按照从左至右递增的顺序排序，每一列按照从上到下递增的顺序排序。完成：输入一个这样的二维数组和一个整数，判断数组是否含有这个整数

> 思路：数组是有序的，可以根据规律减少遍历次数。从右上角开始遍历，如果这个数不等，那么可以根据目标数与这个数的大小可以去掉一些行/列的遍历

```
function findNumInSortedArray(arr, num) {
  if (!Array.isArray(arr) || typeof num != 'number' || isNaN(num)) {
    return;
  }
  let rows = arr.length;
  let columns = arr[0].length;
  let row = 0;
  let column = columns -1;

  while(row < rows && column >=0 ){
    if (arr[row][column] == num) {
      return true;
    } else if (arr[row][column] > num) {
      column --;
    } else {
      row ++ ;
    }
  }
  return false;
}
```

## 2、字符串替换
>题述：实现一个函数,将字符串中的每个空格替换成%20。如输入'we arr happy', 则输出'we%20are%20happy'

>思路：可以使用正则替换与遍历替换两种方式

```
  //使用正则
  function replaceStr(str){
    if (typeof str !== 'string') {
      console.log('str is not string');
      return;
    }
    return str.replace(/\s/g, '%20')
  }

  //使用遍历替换,需要遍历str，识别空格然后替换字符串
  function replaceStr2(str) {
    if (typeof str !== 'string') {
      console.log('str is not string');
      return;
    }
    let strArr = [];
    let len = str.length;
    let i = 0;
    while(i < len) {
      if (str[i] === ' ' ) {
        strArr[i] = '%20';
      } else {
        strArr[i] = str[i];
      }
    }
    return strArr.join('');
  }

```

## 3、链表逆序打印
>题述：输入一个链表的头结点，从尾到头打印每个节点的值

>思路：可以将链表翻转，再打印，但会破坏链表的结构。还可以用栈存储节点，然后打印

```
function displayLinkList(head) {
  let stack = [];
  let node = head;
  while(node) {
    stack.push(node);
    node = node.next;
  }
  for (let len = stack.length - 1; len >=0 ; len--) {
    console.log(stack[i].ele);
  }
}
```

## 4、重建二叉树
> 题述：输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

>思路：在二叉树的前序遍历中，第一个数字总是树的根节点的值，在中序遍历中，根结点的值在序列的中间。找根节点，确定左右子树，然后递归循环，关键是依次挂载'根'节点（确定其在左还是右）。前序确定根节点，中序确定左右节点

```
//节点定义
 function TreeNode(ele) {
   this.ele = ele;
   this.right = null;
   this.left = null;
 }
 
 function constructBinaryTree(preOrders, inOrders) {
  if (!inOrders.length) {
    return null;
  }
  let rootIndex = 0;
  let l_preOrders = [];
  let l_inOrders = [];
  let r_preOrders = [];
  let r_inOrders = [];
  //确定根节点
  let head = new TreeNode(preOrders[0]);
  for (let i = 0; i < inOrders.length; i++ ) {
    if (preOrders[0] === inOrders[i]) {
      rootIndex = i;
    }
  }
  //确定左右子节点树
  for (let i = 0; i < rootIndex; i++) {
    l_preOrders.push(preOrders[ i + 1]);
    l_inOrders.push(inOrders[i]);
  }

  for (let i = rootIndex + 1; i < inOrders.length; i ++ ) {
    r_preOrders.push(preOrders[i]);
    r_inOrders.push(inOrders[i]);
  }

  head.left = constructBinaryTree(l_preOrders, l_inOrders);
  head.right = constructBinaryTree(r_preOrders, r_inOrders);

  return head;
 }

 function getTreeFromPreInOrders(preOrders, inOrders) {
  if (Array.isArray(preOrders) && Array.isArray(inOrders)) {
    return constructBinaryTree(preOrders, inOrders);
  }
  console.error('preOrders or inOrders is no Array');
 }
```

## 5、栈与队列的互相实现
>栈：先进后出， 队列：先进先出
+ > 题述：用两个栈实现队列

  >思路：栈a的数据全部依次放到栈b,那么原先早进入栈a的数据会出现在栈b栈顶的位置， 那么队列的出队，相当于栈b的出栈，队列的入队，相当于栈a的入栈。当栈b为空时，将栈a的数据全部出栈到栈b

```
 let stack_a = [];
 let stack_b = [];

 function push (node ) {
   stack_a.push(node);
 }

 function pop () {
   if (stack_b.length === 0 ) {
     for (let i = 0, len = stack_a.length; i < len; i ++ ) {
       stack_b.push(stack_a.pop());
     }
   } 
   return stack_b.pop();
 }

```

 + >题述：使用两个队列实现栈
   
   >思路：两个队列，拿一个队列做存储区，有数据的队列依次出队数据到缓存队列，那么当有数据的队列出到最后一个数据时，即是需要出栈的数据。入栈的数据入队到有数据的队列,如果两个为空，任取一个入队

```
 let queue_a = [];
 let queue_b = [];

 function push(node) {
  if (queue_a.length && queue_b.length) {
    return console.log('wrong !');
  }
  if (queue_a.length) {
    queue_a.push(node);
  } else if (queue_b.length) {
    queue_b.push(node);
  } else {
    queue_a.push(node);
  }
 }

 function pop() {
  if (queue_a.length && !queue_b.length) {
    for (let i = 0, len = queue_a.length; i < len; i++) {
      if (i == len -1) {
        return queue_a.shift();
      } else {
        queue_b.push(queue_a.shift());
      }
    }
  } else if (!queue_a.length && queue_b.length) {
    for (let i = 0, len = queue_b.length; i < len; i++) {
      if (i == len -1) {
        return queue_b.shift();
      } else {
        queue_a.push(queue_b.shift());
      }
    }
  } else if (queue_a.length && queue_b.length) {
    console.log('wrong!');
  } else {
    return null;
  }
  return null;
 }
```

## 6、旋转数组的最小数字
>题述：把一个数字最开始的若干个元素搬到数组的末尾，称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1

> 思路：递增有序找最值，可以尝试二分法。数组第一个元素肯定会比最后一个元素大，选择中间元素，与末尾元素比较，如果大于末尾元素则表示最小元素在右区间，否则在左区间

```
function findMinFromRotateArr(arr) {
  if (!Array.isArray(arr)) {
    return console.error('wrong!')
  }
  let start = 0;
  let end = arr.length - 1;
  while((end - start) > 1) {
    let mid = Math.floor(((end + start)) / 2) ;
    if (arr[mid] >= arr[end]) {
      start = mid;
    } else {
      end = mid;
    }
  } 
  return arr[end];
}
```

## 7、斐波那契数列
> 题述：当n = 0,f(n) = 0;当n = 1, f(n) = 1;当n > 1, f(n) = f(n-1) + f(n-2)。现在要求输入一个整数n，请你输出斐波那契数列的第n项

> 思路：斐波那契数列是一个经典数学题。可以采用递归与循环方式解决，注意递归下，如果n比较大时，会产生很大内存消耗

```
//递归解法
function fibonacci(n) {
  if (n <= 0) {
    return 0;
  }
  if(n == 1) {
    return 1;
  }
  return fibonacci(n - 2) + fibonacci(n-1);
}

//循环解法
function fabonacci(n) {
  if (n <= 0) {
    return 0;
  }
  if(n == 1) {
    return 1;
  };
  let fn_2 = 0;
  let fn_1 = 1;
  let fn = 0;
  for (let i = 2; i <= n; i++) {
    fn = fn_1 + fn_2;
    fn_2 = fn_1;
    fn_1 = fn;
  }
  return fn;
}
```
+ > 斐波那契变题1
  >题述：一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法。

  >思路：n个台阶跳法-> f(n), 假如其第一次跳一级，那么接下来是跳法是f(n-1),假如第一次跳2级，那么跳法是f(n-2)。那么f(n) = f(n-1) + f(n-2),就是一个斐波那契数列

+ > 斐波那契变题2
  >题述：题述:[] 这是 2x1的矩形，可以横着或者竖着摆放，那么其覆盖 8*2x1这样的小矩形有多少种摆法
  ```
  //大矩形：[][][][][][][][]
  //       [][][][][][][][]                                                        
  ```
  >思路：如果竖着摆，那么会占去1列，如果横着摆，一种摆法会占去2列，那么从8列的矩形，第一次摆放的时候，要么竖着摆，接着覆盖7列矩形，要么横着摆，接着覆盖6列矩形。从而可以抽象成 f(8) = f(7) + f(6)。还是一个斐波那契问题

## 8、位运算
> js中的位运算：&(与), |(或) , ~(非) ,^(异或), <<(左移), >>(右移), >>>(无符号右移)

+ >题述:输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。

  >思路：可以使用右移与位与运算。判断整数的二进制数的最右侧数是不是1(和1与),然后右移，直至为0

```
//缺陷版：
//缺陷在于不能针对负数情况。因为带符号的数字，其二进制最高位有一个数字为符号标志，负数为1
function numOf1(n) {
  if(n.toString().indexOf('.') != -1) {
    return console.error('n is not a int');
  }
  let num = 0;
  while(n) {
    if (n & 1) {
      num ++ ;
    }
    n = n >> 1;
  }
  return num;
}

//改进：将1进行左移与i比较，这样来判断i二进制各个位是不是1
//如果是32位存储，那么会循环32次
function numOf1(n){
  if(n.toString().indexOf('.') != -1) {
    return console.error('n is not a int');
  }
  let nums = 0;
  let flag = 1;
  while(flag) {
    if(flg & n) {
      nums ++;
    }
    flag = flag << 1;
  }
  return nums;
}

//究极版：这个的原理是 一个二进制与其减去1的二进制进行位与运算后，产生的数与原先的二进制数相比，
//从右边看会少去一个1。问题可以简化到二进制数有多少个1，就会进行以上多少次的循环，这个是效率最高的
function numsOf1(n) {
  if(n.toString().indexOf('.') != -1) {
    return console.error('n is not a int');
  }
  let nums = 0;
  while(n) {
    nums ++ ;
    n = (n - 1) & n;
  }
  return nums;
}
```

## 9、数值的整数次方
>题述：给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。不使用库函数

>思路：解题的第一反应是用for循环累加乘积，但可能忽略一些情况:输入的0值与负整数次幂。还有如何减少遍历次数

```
function power(base, exponent) {
  if (base == 0 && exponent < 0) {
    return console.error('base should not be 0');
  }
  let absExponent = exponent < 0 ? -exponent : exponent;
  let result = 1;
  for (let i = 1; i <= absExponent; i++) {
    result *= base;
  }
  if (exponent < 0) {
    result = 1 / result;
  }
  return result;
}

//使用递归减少乘积次数
//使用位与运算可判断奇偶， 整数右移一位可取数除2的整数
//可以通过互乘减少运算次数，如 数的8次方是数的4次幂的2次幂，数的4次幂是数的2次幂的2次幂 ...
function power (base, exponent) {
  if (exponent == 0) {
    return 1;
  }
  if (exponent == 1) {
    return base;
  }
  let result = power(base, exponent >> 1);
  result *= result;
  //为奇数
  if (exponent & 1 == 1) {
    result *= base;
  }
  return result;
}

```

## 10、删除链表节点
> 题述：定义一个删除节点的函数，传参为头结点与待删除节点，要求时间复杂度为O(1)。

> 思路：常规链表删除，会循环遍历到待删除节点，然后将其前一个节点指向其后一个节点。但是每次删除需要遍历,时间复杂度为O(n)。如果直接将待删除节点的下一个节点的值赋予给待删除节点，然后删除这个下一个节点，不是就相当于删除了么。

```
function deleteNode(headNode, deleteNode) {
  if (!headNode || !deleteNode) {
    return ;
  }
  //删除的节点是头结点
  if (headNode == deleteNode) {
    headNode = null;
  }
  //删除的节点是尾节点
  else if (deleteNode.next == null) {
    let node = headNode;
    while(node.next != deleteNode) {
      node = node.next;
    }
    node.next = null;
    deleteNode = null;
  }
  //删除的节点是中间节点
  else {
    let nextNode = delete.next;
    deleteNode.ele = nextNode.ele;
    deleteNode.next = nextNode.next;
    nextNode = null;
  }
}
//整体时间：[(n-1)O(1) + O(n)]/n -> O(1)
```


## 11、调整数组顺序
> 题述：输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于位于数组的后半部分。

>思路：常规下可以遍历数组，如果数是偶数，可以将数拿出放到数组最后面，其后面的数字前移一位。同时也可以使用两个指针，一个指向数组头p1，一个指向数组尾p2,如果p1指向偶数，p2指向奇数，则双方对调,这样会出现4种情况，依次处理即可。

```
function reOrderArray(arr)
{
    // write code here
    if (!Array.isArray(arr)) {
    return ;
  };
  let start = 0;
  let end = arr.length - 1;
  while(start <= end) {
    let isOddS = arr[start] & 1;
    let isEvenE = !(arr[end] & 1);
   
    if (isOddS && !isEvenE) {
      start ++;
    } else if (isOddS && isEvenE) {
      start ++;
      end --;
    } else if(!isOddS && isEvenE) {
      end --;
    } else {
      let temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start ++ ;
      end --;
    }
  }
  return arr;
}
```

## 12、链表中导数第k个结点
> 题述：输入一个链表，输出该链表中倒数第k个结点。

> 思路：一般想法可以第一次遍历链表得到其长度，然后倒数第k个节点，那么则是第n+1-k个节点，然后第二次遍历链表即可得出，这样的缺点是需要遍历链表两次。遍历一次链表的做法：取两个指针，一个指针指向头节点，另外一个指针指向第k-1个节点，然后两个指针同时遍历，当第二个指针指向链表尾的时候，那么第一个指针会指向导数第k个节点

```
//注意边界情况：头结点为空，节点数小于k个，k不大于0

function findKthToTial (head, k) {
  if (!head || k <= 0) {
    return null;
  }
  let startNode = head;
  let endNode = head;
  for (let i = 0; i < k - 1; i++) {
    if (!endNode.next) {
      return null;
    }
    endNode = endNode.next;
  }
  while(endNode.next) {
    startNode = startNode.next;
    endNode = endNode.next;
  }
  return startNode;
}
```

## 13、反转链表
> 题述：输入一个链表，反转链表后，输出新链表的表头。

> 思路：遍历链表，将下一个节点指向前一个节点

```
function resverseList(head) {
  if (!head) {
    return null;
  }
  if (head.next == null) {
    return head;
  }
  let node = head;
  let nextNode = null;
  let reservedNode = null;
  let newHead = head;
  while (node.next) {
    nextNode = node.next;
    reservedNode = nextNode.next;
    nextNode.next = newHead;
    node.next = reservedNode;
    newHead = nextNode;
  }
  return newHead;
}
```

## 14、合并两个排序的链表
> 题述：输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则

> 思路：依次去取两个链表的节点进行比较

```
function mergeLinkList(head1, head2) {
  if (head1 == null) {
    return head2;
  }
  if (head2 == null) {
    return head1;
  }
  let mergeHead = null;
  if (head1.ele < head2.ele ) {
    mergeHead = head1;
    mergeHead.next = mergeLinkList(haed1.next, head2);
  } else {
    mergeHead = head2;
    mergeHead.next = mergeLinkList(head1, head2.next);
  }
  return mergeHead;
}
```

## 15、二叉树的包含
> 输入两颗二叉树A和B，判断B是不是A的子结构。

> 思路：先找A包含B的根节点，然后根据该节点比较左右子树

```
//树节点定义
function Node(ele) {
  this.ele = ele;
  this.left = null;
  this.right = null;
}

//判断树A有树B
function hasSubTree(pRootA, pRootB) {
  if(pRootA == null || pRootB == null) {
    return false;
  }
  let result = false;
  if (pRootA.ele === pRootB.ele） {
    result = doesTreeAHaveTreeB(pRootA, pRootB);
  }
  if (!result) {
    result = hasSubTree(pRootA.left, pRootB);
  }
  if (!result) {
    result = hasSubTree(pRootA.right, pRootB)
  }
  return result;
}

function doesTreeAHaveTreeB(pRootA, pRootB) {
   //先要判断 pRootB
  if (pRootB == null) {
    return false;
  }

  if(pRootA == null) {
    return true;
  }
 
  if (pRootA.ele != pRootB.ele) {
    return false;
  }

  return doesTreeAHaveTreeB(pRootA.left, pRootB.left) && doesTreeAHaveTreeB(pRootA.right, pRootB.right)
}

```

## 16、二叉树的镜像
> 题述：完成一个函数，输入一个二叉树，该函数输出它的镜像

> 思路：进行前序遍历，对于非叶子节点，有两个节点，则将其对换

```

function mirror(root) {
  if (root == null) {
    return ;
  }

  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  if (root.left) {
    mirror(root.left);
  }
  if (root.right) {
    mirror(root.right);
  }
}
```

## 17、顺时针打印矩阵
> 题述：/输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字,例如，如果输入如下矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10。

> 思路：关键在于循环打印的条件在于 列数 > 开始打印的列数x2 ，而且 行数 > 开始打印的行数x2

```
function printMatrix (arr) {
  if (!Array.isArray(arr)) {
    return;
  }
  let rows = arr.length;
  let columns = arr[0].length;
  let start = 0;
  while( columns > start * 2 && rows > start * 2) {
    printMatrixInCicle(arr, columns, rows, start);
    start ++ ;
  }
}

function printMatrixInCicle (arr, columns, rows, start) {
  let endX = columns - 1 - start;
  let endY = rows -1 - start;
  //从左到右打印一行
  for (let i = start; i <= endX; ++i) {
    console.log(arr[start][i]);
  }
  //从上到下打印一列
  if (start < endY) {
    for (let i = start + 1; i <= endY; ++ i) {
      console.log(arr[endY][i]);
    }
  }
  //从右向左打印一行
  if (start < endX && start < endY) {
    for (let i = endX -1 ; i >= start; --i) {
      console.log(arr[endY][i]);
    }
  }

  //从下到上打印一行
  if (start < endX && start < endY - 1) {
    for (let i = endY -1 ; i >= start + 1; --i) {
      console.log(arr[i][start]);
    }
  }
}
```

> 各位观众老爷，如果觉得可以的话，[biaozhiwang.github.io](https://github.com/BiaoZhiWang/biaozhiwang.github.io) star下

