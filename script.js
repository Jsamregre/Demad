// Variables globales
let isAdmin = false;  // Para saber si el usuario está logueado como administrador
const ministerData = JSON.parse(localStorage.getItem('ministerData')) || [];

// Función de login para administrador
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Verificar las credenciales del administrador
  if (email === "jsamregre@gmail.com" && password === "M@teo.1709") {
    isAdmin = true;
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("appContainer").style.display = "block";
    renderMinistriesList();
  } else {
    alert("Credenciales incorrectas");
  }
});

// Función para agregar participaciones
document.getElementById("ministerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  if (!isAdmin) return alert("Solo el administrador puede agregar participaciones");

  const ministerName = document.getElementById("ministerName").value;
  const supportMinisters = document.getElementById("supportMinisters").value;
  const serviceDate = document.getElementById("serviceDate").value;

  // Agregar los datos al localStorage
  const participation = { ministerName, supportMinisters, serviceDate };
  ministerData.push(participation);
  localStorage.setItem('ministerData', JSON.stringify(ministerData));

  // Limpiar el formulario
  document.getElementById("ministerForm").reset();

  renderMinistriesList();
  alert(`Participación agregada: ${ministerName} el ${serviceDate} con apoyo de ${supportMinisters}`);
});

// Función para renderizar la lista de participaciones
function renderMinistriesList() {
  const resultDiv = document.getElementById("ministriesListAdmin");
  resultDiv.innerHTML = '';

  ministerData.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.ministerName} - ${item.serviceDate} (Apoyo: ${item.supportMinisters})</p>`;
    resultDiv.appendChild(div);
  });
}

// Función de búsqueda para invitados
function searchParticipationGuest() {
  const searchDate = document.getElementById("searchDateGuest").value;
  const resultDiv = document.getElementById("ministriesListGuest");
  const filtered = ministerData.filter(item => item.serviceDate === searchDate);

  resultDiv.innerHTML = `<p>Participación de ministros para el día ${searchDate}:</p>`;
  filtered.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.ministerName} (Apoyo: ${item.supportMinisters})</p>`;
    resultDiv.appendChild(div);
  });
}

// Función de búsqueda para el administrador
function searchParticipationAdmin() {
  const searchDate = document.getElementById("searchDateAdmin").value;
  const resultDiv = document.getElementById("ministriesListAdmin");
  const filtered = ministerData.filter(item => item.serviceDate === searchDate);

  resultDiv.innerHTML = `<p>Participaciones encontradas para el día ${searchDate}:</p>`;
  filtered.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.ministerName} (Apoyo: ${item.supportMinisters})</p>`;
    resultDiv.appendChild(div);
  });
}

// Función para generar la imagen de las participaciones
document.getElementById("generateImageBtn").addEventListener("click", function() {
  const content = document.getElementById("ministriesListAdmin");

  html2canvas(content).then(canvas => {
    const img = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = img;
    link.download = 'ministries.png';
    link.click();
  });
});

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", function() {
  isAdmin = false;
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("appContainer").style.display = "none";
});

