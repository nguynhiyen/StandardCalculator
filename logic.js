let currentExpression = ''; // Lưu trữ biểu thức hiện tại
let history = []; // Lưu lịch sử phép tính

// Thêm số vào biểu thức
function appendNumber(number) {
  currentExpression += number;
  updateDisplay(currentExpression);
}

// Thêm toán tử vào biểu thức
function appendOperator(operator) {
  if (/[\+\-\*\/]$/.test(currentExpression)) {
    currentExpression = currentExpression.slice(0, -1) + operator; // Thay thế toán tử cuối cùng
  } else if (currentExpression === '') {
    return; // Không cho phép bắt đầu bằng toán tử
  } else {
    currentExpression += operator; // Thêm toán tử
  }
  updateDisplay(currentExpression);
}


// Thêm dấu chấm (.)
function appendDot() {
  // Kiểm tra nếu số hiện tại đã chứa dấu chấm
  const lastNumber = currentExpression.split(/[\+\-\*\/]/).pop();
  if (!lastNumber.includes('.')) {
    currentExpression += '.';
    updateDisplay(currentExpression);
  }
}

// Xóa toàn bộ biểu thức
function clearDisplay() {
  currentExpression = '';
  updateDisplay('');
}

// Xóa ký tự cuối cùng
function deleteLast() {
  currentExpression = currentExpression.slice(0, -1);
  updateDisplay(currentExpression);
}

// Tính toán biểu thức
function calculate() {
  try {
    if (currentExpression.trim() === '') {
      updateDisplay('0'); // Nếu không có biểu thức, hiển thị 0
      return;
    }
    if (!/^[\d+\-*/.()]+$/.test(currentExpression)) {
        updateDisplay('Error'); // Hiển thị lỗi nếu biểu thức không hợp lệ
        currentExpression = '';
        return;
      }
    const sanitizedExpression = currentExpression.replace(/\b0+(\d)/g, '$1');
    const result = eval(sanitizedExpression);
    if (result !== undefined) {
      addToHistory(`${currentExpression} = ${result}`);
      currentExpression = result.toString();
      updateDisplay(currentExpression);
    }
  } catch (error) {
    updateDisplay('Error');
    currentExpression = '';
  }
}

// Cập nhật màn hình hiển thị
function updateDisplay(value) {
  document.getElementById('calc-display').value = value;
}

// Lưu vào lịch sử
function addToHistory(entry) {
  history.push(entry);
  updateHistoryDisplay();
}

// Hiển thị lịch sử
function updateHistoryDisplay() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = ''; // Xóa lịch sử cũ trên giao diện
  history.forEach((entry, index) => {
    const listItem = document.createElement('li');

    const entryText = document.createElement('span');
    entryText.textContent = entry;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteHistoryItem(index);

    listItem.appendChild(entryText);
    listItem.appendChild(deleteButton);

    historyList.appendChild(listItem);
  });
}

// Xóa một mục lịch sử
function deleteHistoryItem(index) {
  history.splice(index, 1); // Xóa mục theo chỉ số
  updateHistoryDisplay();
}

function clearHistory() {
  history = []; // Đặt lại mảng lịch sử
  updateHistoryDisplay(); // Cập nhật lại giao diện
}

