// admin.js
(function(){
  const { readRegs, writeRegs } = window.UNHCR || {};
  if(!readRegs) return;

  function formatDate(iso){
    const d = new Date(iso);
    return d.toLocaleString();
  }

  function render(){
    const tableBody = document.querySelector('#regTable tbody');
    const emptyEl = document.querySelector('.empty');
    tableBody.innerHTML = '';
    const rows = readRegs();

    if(!rows.length){
      emptyEl.classList.remove('hidden');
      return;
    } else emptyEl.classList.add('hidden');

    rows.forEach((r, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${i+1}</td>
        <td>${escapeHtml(r.name)}<div class="muted small">Added: ${formatDate(r.createdAt)}</div></td>
        <td>${escapeHtml(r.camp)}</td>
        <td>${r.age ?? ''}</td>
        <td>${r.members}</td>
        <td>${escapeHtml(r.origin)}</td>
        <td>
          <button class="action-btn ghost" data-id="${r.id}" data-action="view">View</button>
          <button class="action-btn danger" data-id="${r.id}" data-action="delete">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  function escapeHtml(s=''){ return String(s).replace(/[&<>"']/g, function(m){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
  });}

  document.addEventListener('DOMContentLoaded', () => {
    render();

    document.getElementById('refreshBtn').addEventListener('click', render);

    document.getElementById('regTable').addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if(!btn) return;
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;
      if(action === 'delete'){
        let arr = readRegs();
        arr = arr.filter(x => x.id !== id);
        writeRegs(arr);
        render();
      } else if(action === 'view'){
        const arr = readRegs();
        const item = arr.find(x => x.id === id);
        alert(`Name: ${item.name}\nCamp: ${item.camp}\nMembers: ${item.members}\nNotes: ${item.notes || '—'}`);
      }
    });

    document.getElementById('clearAll').addEventListener('click', () => {
      if(confirm('Clear all local demo registrations? This cannot be undone.')) {
        writeRegs([]);
        render();
      }
    });

    document.getElementById('exportCsv').addEventListener('click', () => {
      const arr = readRegs();
      if(!arr.length){ alert('No data to export'); return; }
      const csvRows = [
        ['id','name','gender','age','origin','camp','members','notes','createdAt']
      ];
      arr.forEach(r => csvRows.push([r.id, r.name, r.gender, r.age, r.origin, r.camp, r.members, (r.notes||'').replace(/\\n/g,' '), r.createdAt]));
      const csv = csvRows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\\n');
      const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'unhcr_registrations.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  });
})();
