// main.js - shared functions
(function(){
  // key used for demo storage
  const STORAGE_KEY = 'unhcr_registrations_v1';

  // helper to read storage
  function readRegs(){
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch(e){ return [];}
  }

  // helper to write storage
  function writeRegs(list){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  // expose to window so admin.js and other pages can access
  window.UNHCR = {
    STORAGE_KEY,
    readRegs,
    writeRegs
  };

  // REGISTER PAGE: hook up form if it exists
  document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('registerForm');
    if(!form) return;

    const alertEl = document.getElementById('saveAlert');
    const resetBtn = document.getElementById('resetBtn');

    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      const fd = new FormData(form);
      const reg = {
        id: Date.now(),
        name: fd.get('name'),
        gender: fd.get('gender'),
        age: Number(fd.get('age')) || null,
        origin: fd.get('origin'),
        camp: fd.get('camp'),
        members: Number(fd.get('members')) || 1,
        notes: fd.get('notes') || '',
        createdAt: new Date().toISOString()
      };

      const arr = readRegs();
      arr.unshift(reg); // newest first
      writeRegs(arr);

      // show alert + subtle animation
      alertEl.classList.remove('hidden');
      setTimeout(()=> alertEl.classList.add('hidden'), 2500);
      form.reset();
      // keep default camp selected
      form.querySelector('select[name="camp"]').value = 'Makeni';
    });

    resetBtn.addEventListener('click', () => form.reset());
  });
})();
