let currentEvent = '';

function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("active");
}

function toggleDetalhes(button) {
    const detalhes = button.nextElementSibling;
    const isVisible = detalhes.style.display === "block";

    document.querySelectorAll('.detalhes').forEach(d => {
        d.style.display = "none";
        d.parentElement.classList.remove("destaque");
    });
    document.querySelectorAll('.ver-detalhes').forEach(btn => {
        btn.textContent = "Ver detalhes";
    });

    if (!isVisible) {
        detalhes.style.display = "block";
        button.textContent = "Ocultar detalhes";
        button.parentElement.classList.add("destaque");
    }
}

function setupMobileMenu() {
  const navLinks = document.querySelectorAll('#nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById("nav-menu");
      menu.classList.remove("active");
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
});

function openModal(evento) {
  currentEvent = evento; 
  document.getElementById('emailModal').style.display = 'block';
  document.getElementById('eventTitle').innerText = "Inscrição no evento: " + evento;
}

function closeModal() {
  document.getElementById('emailModal').style.display = 'none';
}


function submitEmail() {
  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value.trim();
  const evento = encodeURIComponent(currentEvent); 

  if (!email) {
    alert('Por favor, digite um e-mail válido.');
    return;
  }

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxgFbCfc48CkEgnh8kDa-tx67Q710klLgU_VrZA8InLv2UeCpj9VmhGAU9i7-HXQKu4Qw/exec';

  const params = `email=${encodeURIComponent(email)}&evento=${evento}&data=${encodeURIComponent(new Date().toISOString())}`;

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params
  })
  .then(response => response.text())
  .then(text => {
    try {
      const data = JSON.parse(text);
      if (data.result === "success") {
        alert('Inscrição realizada com sucesso!');
        emailInput.value = '';
        closeModal();
      } else {
        throw new Error(data.message || "Erro no servidor");
      }
    } catch {
      alert('Inscrição registrada com sucesso!'); 
      emailInput.value = '';
      closeModal();
    }
  })
  .catch(error => {
    console.error('Erro:', error);
    alert('Erro ao enviar. Por favor, tente novamente mais tarde.');
  });
}