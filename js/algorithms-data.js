// algorithms-data.js - Sorting Algorithm Metadata
// Contains time complexity, C++ code, and pseudocode for each algorithm

const ALGORITHMS = {
  quick: {
    name: "Quick Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)"
    },
    description: "Divide-and-conquer algorithm that selects a pivot element and partitions the array around it.",
    cppCode: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
    pseudocode: `QUICKSORT(A, low, high)
    if low < high then
        pi ← PARTITION(A, low, high)
        QUICKSORT(A, low, pi - 1)
        QUICKSORT(A, pi + 1, high)

PARTITION(A, low, high)
    pivot ← A[high]
    i ← low - 1
    for j ← low to high - 1 do
        if A[j] < pivot then
            i ← i + 1
            swap A[i] with A[j]
    swap A[i + 1] with A[high]
    return i + 1`
  },

  merge: {
    name: "Merge Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)"
    },
    description: "Divide-and-conquer algorithm that divides array into halves, sorts them, and merges back.",
    cppCode: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    pseudocode: `MERGE-SORT(A, l, r)
    if l < r then
        m ← l + (r - l) / 2
        MERGE-SORT(A, l, m)
        MERGE-SORT(A, m + 1, r)
        MERGE(A, l, m, r)

MERGE(A, l, m, r)
    n1 ← m - l + 1
    n2 ← r - m
    create arrays L[n1], R[n2]
    copy A[l..m] to L
    copy A[m+1..r] to R
    i ← 0, j ← 0, k ← l
    while i < n1 and j < n2 do
        if L[i] ≤ R[j] then
            A[k] ← L[i], i++
        else
            A[k] ← R[j], j++
        k++
    copy remaining L to A
    copy remaining R to A`
  },

  heap: {
    name: "Heap Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)"
    },
    description: "Comparison-based sort using a binary heap data structure. Builds max-heap then extracts elements.",
    cppCode: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
    pseudocode: `HEAP-SORT(A, n)
    // Build max heap
    for i ← n/2 - 1 down to 0 do
        HEAPIFY(A, n, i)
    
    // Extract elements one by one
    for i ← n - 1 down to 1 do
        swap A[0] with A[i]
        HEAPIFY(A, i, 0)

HEAPIFY(A, n, i)
    largest ← i
    left ← 2*i + 1
    right ← 2*i + 2
    
    if left < n and A[left] > A[largest] then
        largest ← left
    if right < n and A[right] > A[largest] then
        largest ← right
    
    if largest ≠ i then
        swap A[i] with A[largest]
        HEAPIFY(A, n, largest)`
  },

  shell: {
    name: "Shell Sort",
    complexity: {
      best: "O(n log n)",
      average: "O(n^1.25)",
      worst: "O(n²)",
      space: "O(1)"
    },
    description: "Generalization of insertion sort that allows exchange of far apart elements using gap sequences.",
    cppCode: `void shellSort(int arr[], int n) {
    // Start with a big gap, then reduce
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Gapped insertion sort
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j;
            
            // Shift earlier gap-sorted elements
            // until correct position found
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            
            arr[j] = temp;
        }
    }
}`,
    pseudocode: `SHELL-SORT(A, n)
    gap ← n / 2
    
    while gap > 0 do
        for i ← gap to n - 1 do
            temp ← A[i]
            j ← i
            
            // Shift elements until correct position
            while j ≥ gap and A[j - gap] > temp do
                A[j] ← A[j - gap]
                j ← j - gap
            
            A[j] ← temp
        
        gap ← gap / 2`
  },

  insertion: {
    name: "Insertion Sort",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    description: "Builds sorted array one element at a time by inserting each into its correct position.",
    cppCode: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key
        // one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    pseudocode: `INSERTION-SORT(A, n)
    for i ← 1 to n - 1 do
        key ← A[i]
        j ← i - 1
        
        // Insert A[i] into sorted A[0..i-1]
        while j ≥ 0 and A[j] > key do
            A[j + 1] ← A[j]
            j ← j - 1
        
        A[j + 1] ← key`
  },

  selection: {
    name: "Selection Sort",
    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    description: "Repeatedly finds minimum element from unsorted part and puts it at the beginning.",
    cppCode: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        
        // Find minimum in unsorted part
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        
        // Swap minimum with first unsorted
        if (min_idx != i)
            swap(arr[min_idx], arr[i]);
    }
}`,
    pseudocode: `SELECTION-SORT(A, n)
    for i ← 0 to n - 2 do
        min_idx ← i
        
        // Find index of minimum element
        for j ← i + 1 to n - 1 do
            if A[j] < A[min_idx] then
                min_idx ← j
        
        // Swap with first unsorted position
        if min_idx ≠ i then
            swap A[i] with A[min_idx]`
  },

  bubble: {
    name: "Bubble Sort",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    description: "Repeatedly steps through list, compares adjacent elements and swaps them if in wrong order.",
    cppCode: `void bubbleSort(int arr[], int n) {
    bool swapped;
    
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        
        // Compare adjacent elements
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swaps, array is sorted
        if (!swapped)
            break;
    }
}`,
    pseudocode: `BUBBLE-SORT(A, n)
    for i ← 0 to n - 2 do
        swapped ← false
        
        for j ← 0 to n - i - 2 do
            if A[j] > A[j + 1] then
                swap A[j] with A[j + 1]
                swapped ← true
        
        // Optimization: stop if no swaps
        if not swapped then
            break`
  }
};

// Order algorithms by average time complexity (fastest first)
const ALGORITHM_ORDER = ['quick', 'merge', 'heap', 'shell', 'insertion', 'selection', 'bubble'];

function getAlgorithmData(algoKey) {
  return ALGORITHMS[algoKey] || null;
}

function showAlgorithmInfo(algoKey) {
  const data = ALGORITHMS[algoKey];
  if (!data) return;
  
  const panel = document.getElementById('algoInfoPanel');
  if (!panel) return;
  
  // Update panel content
  document.getElementById('algoName').textContent = data.name;
  document.getElementById('algoDescription').textContent = data.description;
  
  // Complexity
  document.getElementById('complexityBest').textContent = data.complexity.best;
  document.getElementById('complexityAvg').textContent = data.complexity.average;
  document.getElementById('complexityWorst').textContent = data.complexity.worst;
  document.getElementById('complexitySpace').textContent = data.complexity.space;
  
  // Code blocks
  document.getElementById('cppCode').textContent = data.cppCode;
  document.getElementById('pseudoCode').textContent = data.pseudocode;
  
  // Show panel
  panel.classList.add('visible');
  
  // Store current algorithm for copy functions
  panel.dataset.currentAlgo = algoKey;
  
  // Show info toggle button
  updateInfoToggle(true);
}

function hideAlgorithmInfo() {
  const panel = document.getElementById('algoInfoPanel');
  if (panel) {
    panel.classList.remove('visible');
  }
}

function toggleInfoPanel() {
  const panel = document.getElementById('algoInfoPanel');
  if (!panel) return;
  
  const currentAlgo = panel.dataset.currentAlgo;
  if (currentAlgo) {
    if (panel.classList.contains('visible')) {
      panel.classList.remove('visible');
    } else {
      panel.classList.add('visible');
    }
  }
}

function updateInfoToggle(hasAlgo) {
  const toggle = document.getElementById('infoToggle');
  if (toggle) {
    if (hasAlgo) {
      toggle.classList.add('visible');
    } else {
      toggle.classList.remove('visible');
    }
  }
}

function copyToClipboard(type) {
  const panel = document.getElementById('algoInfoPanel');
  const algoKey = panel?.dataset.currentAlgo;
  if (!algoKey) return;
  
  const data = ALGORITHMS[algoKey];
  const text = type === 'cpp' ? data.cppCode : data.pseudocode;
  
  navigator.clipboard.writeText(text).then(() => {
    // Show feedback
    const btn = document.getElementById(type === 'cpp' ? 'copyCpp' : 'copyPseudo');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 1500);
  }).catch(err => {
    console.error('Copy failed:', err);
  });
}

function toggleCodeSection(section) {
  const content = document.getElementById(section + 'Content');
  const toggle = document.getElementById(section + 'Toggle');
  
  if (content && toggle) {
    content.classList.toggle('collapsed');
    toggle.classList.toggle('collapsed');
  }
}
