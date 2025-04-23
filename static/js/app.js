let srNo = 1;

document.getElementById('experimentLabel').addEventListener('input', function () {
  document.getElementById('titleHeader').innerText = this.value || 'Title/Experiment';
});

document.getElementById('addRemarks').addEventListener('change', function () {
  toggleColumn('remarks-col', this.checked);
});

document.getElementById('addDate').addEventListener('change', function () {
  toggleColumn('date-col', this.checked);
});

function toggleColumn(className, show) {
  document.querySelectorAll('.' + className).forEach(cell => {
    cell.style.display = show ? '' : 'none';
  });
}

function addRow() {
  const tbody = document.querySelector('#indexTable tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `        
    <td contenteditable="true">${srNo++}</td>
    <td contenteditable="true"></td>
    <td contenteditable="true" class="remarks-col"></td>
    <td contenteditable="true" class="date-col"></td>
  `;
  tbody.appendChild(tr);
  toggleColumn('remarks-col', document.getElementById('addRemarks').checked);
  toggleColumn('date-col', document.getElementById('addDate').checked);
}

function removeLastRow() {
  const tbody = document.querySelector('#indexTable tbody');
  if (tbody.lastChild) {
    tbody.removeChild(tbody.lastChild);
    srNo--;
  }
}

function generateImage() {
  const a4area = document.getElementById('a4-area');
  html2canvas(a4area).then(canvas => {
    document.getElementById('previewCanvas').replaceWith(canvas);
    canvas.id = 'previewCanvas';
    canvas.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('downloadBtn').onclick = function () {
      const link = document.createElement('a');
      link.download = 'index_page.png';
      link.href = canvas.toDataURL();
      link.click();
    };
  });
}

document.getElementById('indexTable').addEventListener('click', function (e) {
  const target = e.target;
  if (target.tagName === 'TD' || target.tagName === 'TH') {
    const selected = document.querySelector('input[name="alignment"]:checked');
    if (selected) {
      target.style.textAlign = selected.value;
    }
  }
});

let isDarkMode = true;

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('themeIcon');
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    body.style.backgroundColor = '#1b1f2a';
    body.style.color = '#fff';
    icon.innerText = 'dark_mode';
    icon.style.color = 'white';
    document.querySelectorAll('.form-label, .form-check-label').forEach(label => label.style.color = '#fff');
    document.querySelector('h2').style.color = '#fff';
    document.querySelector('.underline-slide').style.color = '#fff';
    body.classList.remove('light-mode');
  } else {
    body.style.backgroundColor = '#f9f9f9';
    body.style.color = '#1c1f29';
    icon.innerText = 'light_mode';
    icon.style.color = '#1c1f29';
    document.querySelectorAll('.form-label, .form-check-label').forEach(label => label.style.color = '#1c1f29');
    document.querySelector('h2').style.color = '#1c1f29';
    document.querySelector('.underline-slide').style.color = '#1c1f29';
    body.classList.add('light-mode');
  }
}
